import React, { useEffect, useState, useContext, useCallback } from "react"; // useCallback 추가
import AxiosApi from "../api/AxiosApi";
import * as S from "../style/Timetable";
import { UserContext } from "../context/UserStore"; // UserContext 임포트

const DAYS = ["월", "화", "수", "목", "금"];
const TIME_OPTIONS = [];
for (let i = 9; i <= 20; i++) {
  const hour = i < 10 ? `0${i}` : `${i}`;
  TIME_OPTIONS.push(`${hour}:00`);
  if (i !== 20) TIME_OPTIONS.push(`${hour}:30`);
}
const COLOR_PALETTE = [
  "#FFE3E3",
  "#FFEDD5",
  "#FEF9C3",
  "#DCFCE7",
  "#E0F2FE",
  "#E0E7FF",
  "#FAE8FF",
];

const HOURS = Array.from({ length: 12 }, (_, i) => i + 9);
const UNIT_HEIGHT = 25;
const HEADER_HEIGHT = 40;
const TIME_WIDTH = 50;

const Timetable = () => {
  // Context에서 유저 정보 가져오기
  const { loginUser } = useContext(UserContext);

  const [schedules, setSchedules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    className: "",
    professor: "",
    day: "월",
    startTime: "09:00",
    endTime: "10:00",
    classRoom: "",
    color: COLOR_PALETTE[0],
  });

  // [기능] 시간표 목록 불러오기 (useCallback으로 노란 줄 방지)
  const fetchSchedules = useCallback(async () => {
    if (!loginUser || !loginUser.userId) return;

    try {
      const response = await AxiosApi.getSchedules(loginUser.userId);
      if (response.data.success) {
        setSchedules(response.data.data);
      }
    } catch (e) {
      console.error("데이터 로딩 실패", e);
    }
  }, [loginUser]); // loginUser가 바뀔 때만 함수 재생성

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]); // 의존성 배열에 fetchSchedules를 넣어 노란 줄 해결

  // 시간 형식 변환 함수
  const formatTime = (time) => {
    if (!time) return "00:00";
    if (Array.isArray(time)) {
      return `${String(time[0]).padStart(2, "0")}:${String(time[1]).padStart(2, "0")}`;
    }
    return time.substring(0, 5);
  };

  // 위치 계산 함수
  const getPosition = (start, end) => {
    const sTime = formatTime(start);
    const eTime = formatTime(end);
    const [sH, sM] = sTime.split(":").map(Number);
    const [eH, eM] = eTime.split(":").map(Number);
    const top =
      ((sH - 9) * 2 + (sM >= 30 ? 1 : 0)) * UNIT_HEIGHT + HEADER_HEIGHT;
    const duration = eH * 60 + eM - (sH * 60 + sM);
    const height = (duration / 30) * UNIT_HEIGHT;
    return { top, height };
  };

  // [기능] 강의 저장
  const handleSave = async (e) => {
   const start = formData.startTime; // 예: "09:00"
    const end = formData.endTime;     // 예: "10:30"

    if (start >= end) {
      alert("종료 시간은 시작 시간보다 나중이어야 합니다. 시간을 다시 확인해주세요.");
      return; // 함수 종료 (API 호출 방지)
    }
    e.preventDefault();
    if (!loginUser || !loginUser.userId) {
      alert("로그인 정보가 없습니다.");
      return;
    }

    try {
      const payload = {
        ...formData,
        startTime: `${formData.startTime}:00`,
        endTime: `${formData.endTime}:00`,
      };

      const response = await AxiosApi.writeSchedule(loginUser.userId, payload);
      if (response.data.success) {
        alert("저장 성공!");
        setIsModalOpen(false);
        fetchSchedules();
        // 폼 초기화
        setFormData({
          className: "",
          professor: "",
          day: "월",
          startTime: "09:00",
          endTime: "10:00",
          classRoom: "",
          color: COLOR_PALETTE[0],
        });
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "네트워크 연결을 확인하세요.";
      alert("저장 실패: " + msg);
    }
  };

  // [기능] 강의 삭제
  const handleDelete = async (scheduleId) => {
    if (!window.confirm("이 강의를 삭제하시겠습니까?")) return;
    if (!loginUser || !loginUser.userId) return;

    try {
      const response = await AxiosApi.deleteSchedule(
        scheduleId,
        loginUser.userId,
      );
      if (response.data.success) {
        alert("삭제되었습니다.");
        fetchSchedules();
      }
    } catch (e) {
      console.error("삭제 실패", e);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <S.PageWrapper>
      <S.HeaderSection>
        <S.Title>2026년 1학기</S.Title>
        <S.AddButton onClick={() => setIsModalOpen(true)}>
          + 강의 추가
        </S.AddButton>
      </S.HeaderSection>

      <S.Grid>
        <div />
        {DAYS.map((day) => (
          <S.DayHeader key={day}>{day}</S.DayHeader>
        ))}
        {HOURS.map((hour) => (
          <React.Fragment key={hour}>
            <S.TimeLabel>{hour}</S.TimeLabel>
            {DAYS.map((day) => (
              <S.GridCell key={`${day}-${hour}`}>
                <S.HalfCell />
                <S.HalfCell />
              </S.GridCell>
            ))}
          </React.Fragment>
        ))}

        {schedules &&
          schedules.map((sch) => {
            const { top, height } = getPosition(sch.startTime, sch.endTime);
            const dayIdx = DAYS.indexOf(sch.day);
            return (
              <S.ScheduleCard
                key={sch.scheduleId}
                $top={top}
                $height={height}
                $bgColor={sch.color}
                $left={`calc(${TIME_WIDTH}px + (100% - ${TIME_WIDTH}px) / 5 * ${dayIdx})`}
                $width={`calc((100% - ${TIME_WIDTH}px) / 5)`}
                onClick={() => handleDelete(sch.scheduleId)}
                style={{ cursor: "pointer" }}
              >
                <div className="name">{sch.className}</div>
                <div className="room">{sch.classRoom}</div>
                <div
                  className="professor"
                  style={{ fontSize: "10px", opacity: 0.6 }}
                >
                  {sch.professor}
                </div>
              </S.ScheduleCard>
            );
          })}
      </S.Grid>

      {isModalOpen && (
        <S.ModalOverlay onClick={() => setIsModalOpen(false)}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>강의 추가</h3>
            <form onSubmit={handleSave}>
              <label>강의명</label>
              <input
                required
                value={formData.className}
                onChange={(e) =>
                  setFormData({ ...formData, className: e.target.value })
                }
              />

              <label>교수명</label>
              <input
                required
                value={formData.professor}
                onChange={(e) =>
                  setFormData({ ...formData, professor: e.target.value })
                }
              />

              <label>요일</label>
              <select
                value={formData.day}
                onChange={(e) =>
                  setFormData({ ...formData, day: e.target.value })
                }
              >
                {DAYS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <label>시작 시간</label>
              <select
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
              >
                {TIME_OPTIONS.map((time) => (
                  <option key={`start-${time}`} value={time}>
                    {time}
                  </option>
                ))}
              </select>

              <label>종료 시간</label>
              <select
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
              >
                {TIME_OPTIONS.map((time) => (
                  <option key={`end-${time}`} value={time}>
                    {time}
                  </option>
                ))}
              </select>

              <label>강의실</label>
              <input
                value={formData.classRoom}
                onChange={(e) =>
                  setFormData({ ...formData, classRoom: e.target.value })
                }
              />

              <label>색상</label>
              <S.PaletteContainer>
                {COLOR_PALETTE.map((color) => (
                  <S.PaletteColor
                    key={color}
                    $color={color}
                    $isSelected={formData.color === color}
                    onClick={() => setFormData({ ...formData, color: color })}
                  />
                ))}
              </S.PaletteContainer>

              <div className="btn-group">
                <button type="submit" className="save-btn">
                  저장
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  취소
                </button>
              </div>
            </form>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.PageWrapper>
  );
};

export default Timetable;
