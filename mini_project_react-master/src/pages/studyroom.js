import React, { useState, useEffect, useCallback } from "react";
//import { useNavigate } from "react-router-dom";
import * as S from "../style/StudyRoomStyle";
import AxiosApi from "../api/AxiosApi";

const Block = ({ seats, config, onSeatClick }) => {
  if (!config) return <></>;
  return (
    <S.Grid cols={config.c}>
      {seats.map((seat) => (
        <S.Seat
          key={seat.seatNum}
          $is_occupied={seat.is_occupied}
          onClick={() => onSeatClick(seat)}
        >
          {seat.seatNum}
        </S.Seat>
      ))}
    </S.Grid>
  );
};

const StudyRoom = () => {
  //const navigate = useNavigate();

  const [allSeats, setAllSeats] = useState(
    Array.from({ length: 224 }, (_, i) => ({
      roomId: i < 112 ? 1 : 2,
      seatNum: i + 1,
      is_occupied: false,
    })),
  );

  const [currentRoom, setCurrentRoom] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("assign"); // 모달 종류: "assign"(배정), "info"(사용중 정보), "success"(성공)
  const [selectedSeat, setSelectedSeat] = useState(null); // 좌석 객체 통째로 저장
  const [selectedTime, setSelectedTime] = useState(1);
  const [remainingTimeText, setRemainingTimeText] = useState("");

  const fetchSeatStatus = useCallback(async () => {
    try {
      const response = await AxiosApi.getStudyRoomStatus(currentRoom);
      const resData = response.data;

      const isSuccess =
        resData.status === "SUCCESS" ||
        resData.code === 200 ||
        Array.isArray(resData.data);

      if (isSuccess && Array.isArray(resData.data)) {
        const dbData = resData.data;
        setAllSeats((prev) =>
          prev.map((seat) => {
            const found = dbData.find(
              (d) => Number(d.seatNum) === Number(seat.seatNum),
            );
            // 찾으면 정보(시간 포함) 업데이트, 없으면 초기화
            if (found) return { ...seat, ...found, is_occupied: true };
            if (seat.roomId === currentRoom)
              return {
                ...seat,
                is_occupied: false,
                startTime: null,
                endTime: null,
              };
            return seat;
          }),
        );
      }
    } catch (e) {
      console.error("데이터 로드 실패", e);
    }
  }, [currentRoom]);

  // 1. 서버 데이터 갱신 및 자동 퇴실 감지 로직
  useEffect(() => {
    fetchSeatStatus(); // 페이지 진입 시 최초 실행

    const interval = setInterval(() => {
      fetchSeatStatus(); // 1분마다 서버 API 호출 (백엔드에서 시간 지난 좌석 삭제 처리)

      // 모달이 열려있을 때 실시간으로 종료 시간을 체크하여 자동으로 닫음
      if (isModalOpen && modalType === "info" && selectedSeat) {
        const now = new Date();
        const end = new Date(selectedSeat.endTime);

        if (now > end) {
          alert("이용 시간이 만료되어 자동 퇴실 처리되었습니다.");
          setIsModalOpen(false);
          fetchSeatStatus(); // 주황색으로 즉시 반영하기 위해 다시 불러옴
        } else {
          // 아직 시간이 남았다면 화면의 "XX분 남음" 텍스트 갱신
          setRemainingTimeText(calculateRemainingTime(selectedSeat.endTime));
        }
      }
    }, 60000); // 60초 주기

    return () => clearInterval(interval);
  }, [fetchSeatStatus, isModalOpen, modalType, selectedSeat]);

  // 2. 남은 시간 계산 로직 (기존 유지 + 경과 메시지 강화)
  const calculateRemainingTime = (endTimeStr) => {
    if (!endTimeStr) return "정보 없음";
    const now = new Date();
    const end = new Date(endTimeStr);
    const diffMs = end - now;

    if (diffMs <= 0) return "종료 예정 시간 경과";

    const diffMin = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMin / 60);
    const mins = diffMin % 60;
    return hours > 0 ? `${hours}시간 ${mins}분 남음` : `${mins}분 남음`;
  };

  // 3. 시간 포맷 (기존 유지)
  const formatTime = (isoStr) => {
    if (!isoStr) return "정보 없음";
    const date = new Date(isoStr);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };
  const totalUsed = allSeats.filter((s) => s.is_occupied === true).length;
  const totalEmpty = 224 - totalUsed;
  const currentSeats =
    currentRoom === 1 ? allSeats.slice(0, 112) : allSeats.slice(112, 224);

  const handleConfirm = async () => {
    // 1. "loginUser" 덩어리를 통째로 가져옵니다.
    const storedUser = localStorage.getItem("loginUser");

    // 2. 글자로 된 덩어리를 자바스크립트 객체로 변환(parse)합니다.
    const loginUser = storedUser ? JSON.parse(storedUser) : null;

    // 3. 객체 안에서 실제 userId(숫자 3 등)를 꺼냅니다.
    const userId = loginUser?.userId;

    // 4. 확인 절차
    if (!userId) {
      alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // 한국 시간 오차 보정
    const localISOTime = new Date(now.getTime() - offset)
      .toISOString()
      .split(".")[0];
    // ------------------------------------

    const seatData = {
      roomId: currentRoom,
      seatNum: selectedSeat.seatNum,
      usageTime: parseInt(selectedTime),
      startTime: localISOTime, // 보정된 한국 시간이 들어갑니다.
    };

    try {
      const res = await AxiosApi.assignSeat(userId, seatData);
      const resData = res.data;
if (resData.status === "SUCCESS" || resData.code === 200) {
        // 성공 시 화면 즉각 반영
        setAllSeats((prev) =>
          prev.map((s) =>
            Number(s.seatNum) === Number(selectedSeat.seatNum)
              ? { ...s, is_occupied: true, userId: userId } // 본인 ID를 상태에 저장
              : s
          )
        );
        setModalType("success");
      } else {
        alert(resData.message || "예약에 실패했습니다.");
      }
    } catch (e) {
      alert("서버 통신 에러가 발생했습니다.");
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    fetchSeatStatus();
  };

  // 클릭 시 모달창 열기 로직 분기
  const openModal = (seat) => {
    setSelectedSeat(seat); // 좌석 번호가 아닌 좌석 객체 전체를 저장 (시간 추출용)
    if (seat.is_occupied) {
      // 사용 중이면 정보 모달 띄우기
      setRemainingTimeText(calculateRemainingTime(seat.endTime));
      setModalType("info");
    } else {
      // 빈 자리면 배정 모달 띄우기
      setSelectedTime(1);
      setModalType("assign");
    }
    setIsModalOpen(true);
  };

  // [추가] 직접 퇴실(배정취소) 처리 함수
  const handleLeaveSeat = async () => {
    // 선택된 좌석이나 예약 번호(assignId)가 없으면 중단
    if (!selectedSeat || !selectedSeat.assignId) {
      alert("예약 정보를 찾을 수 없습니다.");
      return;
    }

    const storedUser = localStorage.getItem("loginUser");
    const loginUser = storedUser ? JSON.parse(storedUser) : null;
    const userId = loginUser?.userId;

    // 본인 확인 로직 추가 (선택사항이지만 권장)
    // 서버에서 준 데이터의 userId와 현재 로그인한 userId가 같은지 확인
    if (Number(selectedSeat.userId) !== Number(userId)) {
      alert("본인이 예약한 좌석만 퇴실 처리할 수 있습니다.");
      return;
    }

    if (
      window.confirm(
        `${selectedSeat.seatNum}번 좌석을 퇴실(배정취소) 하시겠습니까?`,
      )
    ) {
      try {
        // 백엔드 API 호출: 좌석 반납
        await AxiosApi.releaseSeat(selectedSeat.assignId, userId);

        if (!userId) {
          alert("로그인 세션이 만료되었습니다.");
          return;
        }

        alert("퇴실 처리가 완료되었습니다.");
        setIsModalOpen(false); // 모달 닫기
        fetchSeatStatus(); // 주황색으로 바뀐 최신 현황 불러오기
      } catch (e) {
        console.error("퇴실 처리 에러:", e);
        alert("퇴실 처리 중 오류가 발생했습니다.");
      }
    }
  };

  // ★ 기존 레이아웃 구조 100% 원상복구
  const layout = [
    { left: { r: 2, c: 5 }, right: { r: 2, c: 4 } },
    { left: { r: 2, c: 6 }, right: { r: 2, c: 4 } },
    { left: { r: 2, c: 5 }, right: null },
    { left: { r: 2, c: 6 }, right: { r: 2, c: 5 } },
    { left: { r: 2, c: 5 }, right: { r: 2, c: 5 } },
    { left: { r: 2, c: 6 }, right: { r: 2, c: 5 } },
  ];

  let blockPointer = 0;

  return (
    <S.PageWrapper>
      <S.StatusBoard>
        <S.BoardTitle>전체 좌석현황</S.BoardTitle>
        <S.StatusItem color="#389e0d">
          {totalEmpty}
          <small>전체 빈 좌석</small>
        </S.StatusItem>
        <S.StatusItem color="#cf1322">
          {totalUsed}
          <small>전체 이용 중</small>
        </S.StatusItem>
        <S.StatusItem color="#333">
          224<small>전체 좌석 수</small>
        </S.StatusItem>
      </S.StatusBoard>

      <S.ContentCard>
        <S.TabGroup>
          <S.Tab active={currentRoom === 1} onClick={() => setCurrentRoom(1)}>
            제1 열람실
          </S.Tab>
          <S.Tab active={currentRoom === 2} onClick={() => setCurrentRoom(2)}>
            제2 열람실
          </S.Tab>
        </S.TabGroup>

        <S.SeatLayout>
          {layout.map((row, idx) => {
            const leftCount = row.left ? row.left.r * row.left.c : 0;
            const rightCount = row.right ? row.right.r * row.right.c : 0;

            const leftSeats = currentSeats.slice(
              blockPointer,
              blockPointer + leftCount,
            );
            blockPointer += leftCount;

            const rightSeats = currentSeats.slice(
              blockPointer,
              blockPointer + rightCount,
            );
            blockPointer += rightCount;

            return (
              <S.Row key={idx}>
                <Block
                  seats={leftSeats}
                  config={row.left}
                  onSeatClick={openModal}
                />
                <Block
                  seats={rightSeats}
                  config={row.right}
                  onSeatClick={openModal}
                />
              </S.Row>
            );
          })}
        </S.SeatLayout>
      </S.ContentCard>

      {isModalOpen && (
        <S.ModalOverlay>
          <S.ModalContent>
            {/* 1. 배정 모달 */}
            {modalType === "assign" && (
              <>
                <h3 style={{ marginTop: 0 }}>좌석 배정</h3>
                <p>
                  선택하신 좌석: <strong>{selectedSeat?.seatNum}번</strong>
                </p>
                <S.Select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value={1}>1시간</option>
                  <option value={2}>2시간</option>
                  <option value={3}>3시간</option>
                </S.Select>
                <S.ButtonGroup>
                  <S.Button onClick={closeModal}>취소</S.Button>
                  <S.Button primary onClick={handleConfirm}>
                    배정 확인
                  </S.Button>
                </S.ButtonGroup>
              </>
            )}

            {/* 2. 사용 중 정보 모달 */}
            {modalType === "info" && (
              <>
                <h3 style={{ marginTop: 0 }}>좌석 정보</h3>
                <p>
                  <strong>{selectedSeat?.seatNum}번</strong> 좌석은 현재 사용
                  중입니다.
                </p>

                {/* 시간 정보 표시 박스 */}
                <div
                  style={{
                    backgroundColor: "#f5f5f5",
                    padding: "15px",
                    borderRadius: "8px",
                    margin: "15px 0",
                  }}
                >
                  <p
                    style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}
                  >
                    입실 시간:{" "}
                    <strong>{formatTime(selectedSeat?.startTime)}</strong>
                  </p>
                  <p
                    style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}
                  >
                    종료 예정:{" "}
                    <strong>{formatTime(selectedSeat?.endTime)}</strong>
                  </p>
                  <p
                    style={{
                      margin: "10px 0 0 0",
                      color: "#FF4D4F",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    {remainingTimeText}
                  </p>
                </div>

                {/* 버튼 그룹: 퇴실하기 버튼 추가 */}
                <S.ButtonGroup style={{ flexDirection: "column", gap: "10px" }}>
                  <S.Button
                    primary
                    onClick={handleLeaveSeat} // 아까 만든 퇴실 함수 연결
                    style={{
                      width: "100%",
                      backgroundColor: "#FF4D4F", // 강조를 위한 빨간색
                      borderColor: "#FF4D4F",
                    }}
                  >
                    퇴실하기 (배정취소)
                  </S.Button>
                  <S.Button onClick={closeModal} style={{ width: "100%" }}>
                    닫기
                  </S.Button>
                </S.ButtonGroup>
              </>
            )}

            {/* 3. 성공 모달 */}
            {modalType === "success" && (
              <div style={{ textAlign: "center" }}>
                <h3 style={{ marginTop: 0 }}>배정 완료</h3>
                <p>
                  <strong>{selectedSeat?.seatNum}번</strong> 좌석 예약이
                  <br />
                  성공적으로 완료되었습니다.
                </p>
                <S.ButtonGroup style={{ justifyContent: "center" }}>
                  <S.Button
                    primary
                    onClick={closeModal}
                    style={{ width: "100%" }}
                  >
                    확인
                  </S.Button>
                </S.ButtonGroup>
              </div>
            )}
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.PageWrapper>
  );
};

export default StudyRoom;
