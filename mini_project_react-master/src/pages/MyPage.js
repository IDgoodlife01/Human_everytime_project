import React, { useEffect, useState, useContext } from "react"; // useContext 추가
import * as S from "../style/MyPageStyle";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore"; // UserContext 임포트

const MyPage = () => {
  // Context에서 loginUser 가져오기
  const { loginUser } = useContext(UserContext);

  // 1. 유저 및 활동 정보 상태
  const [userInfo, setUserInfo] = useState({
    userId: "",
    email: "",
    name: "",
    university: "휴먼 대학교",
    department: "",
    studentId: "",
    postCount: 0,
    marketCount: 0,
    messageCount: 0,
    unreadCount: 0,
  });

  // 2. 쪽지 및 모달 제어 상태
  const [messageList, setMessageList] = useState([]);
  const [selectedMsg, setSelectedMsg] = useState(null); // 상세보기용 쪽지
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 프로필 수정 모달
  const [isMsgModalOpen, setIsMsgModalOpen] = useState(false); // 쪽지함 모달
  const [replyContent, setReplyContent] = useState(""); // 답장 입력 내용

  // 3. 프로필 수정 입력 상태
  const [editName, setEditName] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // [핵심 로직] 데이터 로드 함수
  const fetchMemberData = async () => {
    // loginUser가 없으면 실행하지 않음
    if (!loginUser || !loginUser.userId) return;
    const userId = loginUser.userId;

    // 1. 유저 기본 정보 가져오기
    try {
      const userRsp = await AxiosApi.getUser(userId);
      if (userRsp.status === 200) {
        const u = userRsp.data.data || userRsp.data;
        setUserInfo((prev) => ({
          ...prev,
          userId: u.userId,
          email: u.email,
          name: u.name,
          department: u.major || "미설정",
          studentId: u.year || "미설정",
        }));
      }
    } catch (e) {
      console.error("유저정보 로드 실패", e);
    }

    // 2. 받은 쪽지함 가져오기
    try {
      const msgRsp = await AxiosApi.getReceivedMessages(userId);
      const msgs = msgRsp.data.data || msgRsp.data || [];
      console.log("받은 쪽지 목록:", msgs);

      setMessageList(msgs);
      setUserInfo((prev) => ({
        ...prev,
        messageCount: msgs.length,
        unreadCount: msgs.filter((m) => !m.isRead).length,
      }));
    } catch (e) {
      console.error("쪽지함 로드 실패", e);
    }

    // 3. 기타 활동 정보 (게시글, 판매글)
    try {
      const [postRsp, bookRsp] = await Promise.all([
        AxiosApi.getMyPostList(userId),
        AxiosApi.getAllBooks(),
      ]);

      const posts = postRsp.data.data || postRsp.data || [];
      const books = bookRsp.data.data || bookRsp.data || [];
      const myBooks = books.filter((b) => Number(b.userId) === Number(userId));

      setUserInfo((prev) => ({
        ...prev,
        postCount: posts.length,
        marketCount: myBooks.length,
      }));
    } catch (e) {
      console.error("활동 정보 로드 실패", e);
    }
  };

  // loginUser 정보가 들어오면 데이터를 호출하도록 설정
  useEffect(() => {
    if (loginUser && loginUser.userId) {
      fetchMemberData();
    }
  }, [loginUser]);

  // [기능] 프로필 수정 모달 열기
  const openEditModal = () => {
    setEditName(userInfo.name);
    setEditPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setIsEditModalOpen(true);
  };

  // [기능] 프로필 수정 실행
  const handleUpdate = async () => {
    if (editPassword && editPassword !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const rsp = await AxiosApi.updateUser(
        userInfo.userId,
        editName,
        editPassword || null,
      );
      if (rsp.status === 200) {
        alert("정보가 수정되었습니다.");
        setIsEditModalOpen(false);
        fetchMemberData();
      }
    } catch (e) {
      alert("수정 실패");
    }
  };

  // [기능] 답장 보내기
  const handleReply = async () => {
    if (!replyContent.trim()) return alert("내용을 입력해주세요.");
    if (!loginUser || !loginUser.userId)
      return alert("로그인 정보가 없습니다.");

    try {
      const response = await AxiosApi.sendMessage(loginUser.userId, {
        receiverId: selectedMsg.senderId,
        content: replyContent,
      });

      if (response.data === true || response.data.success) {
        alert("답장을 보냈습니다!");
        setReplyContent("");
        setSelectedMsg(null);
      }
    } catch (e) {
      alert("발송 실패");
    }
  };

  // [기능] 쪽지 클릭 시 읽음 처리 및 상세 보기
  const handleReadMessage = async (msg) => {
    setSelectedMsg(msg); // 상세 모드로 전환

    if (msg.isRead === false && loginUser && loginUser.userId) {
      try {
        await AxiosApi.readMessage(msg.msgId, loginUser.userId);
        fetchMemberData(); // UI 갱신 (빨간 점 제거)
      } catch (e) {
        console.error("읽음 처리 에러:", e);
      }
    }
  };

  return (
    <S.Container>
      {/* 상단 프로필 카드 */}
      <S.ProfileCard>
        <S.IdTitle>{userInfo.name}</S.IdTitle>
        <S.StatsArea>
          <S.StatBox>
            <S.Count>{userInfo.postCount}</S.Count>
            <S.Label>게시글</S.Label>
          </S.StatBox>
          <S.StatBox>
            <S.Count>{userInfo.marketCount}</S.Count>
            <S.Label>판매글</S.Label>
          </S.StatBox>
        </S.StatsArea>
        <S.EditProfileBtn onClick={openEditModal}>프로필 수정</S.EditProfileBtn>
      </S.ProfileCard>

      <S.InfoZone>
        {/* 내 정보 섹션 */}
        <S.CommonCard>
          <S.InfoTitle>내 정보</S.InfoTitle>
          <S.InfoGrid>
            <S.InfoLabel>이메일</S.InfoLabel>
            <S.InfoValue>{userInfo.email}</S.InfoValue>
            <S.InfoLabel>이름</S.InfoLabel>
            <S.InfoValue>{userInfo.name}</S.InfoValue>
            <S.InfoLabel>학과</S.InfoLabel>
            <S.InfoValue>{userInfo.department}</S.InfoValue>
            <S.InfoLabel>학번</S.InfoLabel>
            <S.InfoValue>{userInfo.studentId}</S.InfoValue>
          </S.InfoGrid>
        </S.CommonCard>

        {/* 활동 섹션 */}
        <S.CommonCard>
          <S.InfoTitle>내 활동</S.InfoTitle>
          <S.ActivityList>
            <S.ActivityItem>
              <span>내가 쓴 글</span>
              <S.CountArrow>
                <span className="cnt">{userInfo.postCount}개</span>
                <span className="arrow">＞</span>
              </S.CountArrow>
            </S.ActivityItem>
            <S.ActivityItem
              onClick={() => setIsMsgModalOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <S.LabelWithBadge>
                <span>받은 쪽지</span>
                {userInfo.unreadCount > 0 && <S.RedDot />}
              </S.LabelWithBadge>
              <S.CountArrow>
                <span className="cnt">{userInfo.messageCount}개</span>
                <span className="arrow">＞</span>
              </S.CountArrow>
            </S.ActivityItem>
          </S.ActivityList>
        </S.CommonCard>
      </S.InfoZone>

      {/* 모달 1: 프로필 수정 */}
      {isEditModalOpen && (
        <S.ModalOverlay onClick={() => setIsEditModalOpen(false)}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <h3>프로필 수정</h3>
              <S.CloseBtn onClick={() => setIsEditModalOpen(false)}>
                &times;
              </S.CloseBtn>
            </S.ModalHeader>
            <S.ModalBody>
              <S.InputGroup>
                <label>이름</label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </S.InputGroup>
              <S.InputGroup>
                <label>새 비밀번호</label>
                <input
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                />
              </S.InputGroup>
              <S.InputGroup>
                <label>비밀번호 확인</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </S.InputGroup>
              {passwordError && (
                <S.ErrorMessage>{passwordError}</S.ErrorMessage>
              )}
            </S.ModalBody>
            <S.ModalFooter>
              <S.CancelBtn onClick={() => setIsEditModalOpen(false)}>
                취소
              </S.CancelBtn>
              <S.SaveBtn onClick={handleUpdate}>저장</S.SaveBtn>
            </S.ModalFooter>
          </S.ModalContent>
        </S.ModalOverlay>
      )}

      {/* 모달 2: 쪽지함 (리스트 및 상세 보기 통합) */}
      {isMsgModalOpen && (
        <S.ModalOverlay
          onClick={() => {
            setIsMsgModalOpen(false);
            setSelectedMsg(null);
          }}
        >
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <h3>{selectedMsg ? "쪽지 읽기" : "받은 쪽지함"}</h3>
              <S.CloseBtn
                onClick={() => {
                  setIsMsgModalOpen(false);
                  setSelectedMsg(null);
                }}
              >
                &times;
              </S.CloseBtn>
            </S.ModalHeader>
            <S.ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
              {selectedMsg ? (
                /* 쪽지 상세 내용 */
                <S.MsgDetailContainer>
                  <div className="msg-header">
                    <strong>{selectedMsg.senderName}</strong>
                    <span>{selectedMsg.sentAt?.replace("T", " ")}</span>
                  </div>
                  <div className="msg-content">{selectedMsg.content}</div>

                  {/* 업그레이드된 답장 영역 */}
                  <S.ReplySection>
                    <S.ReplyTextArea
                      placeholder="답장 입력"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                    />
                  </S.ReplySection>

                  <S.ModalFooter>
                    <S.CancelBtn
                      onClick={() => {
                        setSelectedMsg(null);
                        setReplyContent("");
                      }}
                    >
                      닫기
                    </S.CancelBtn>
                    <S.SaveBtn onClick={handleReply}>답장 보내기</S.SaveBtn>
                  </S.ModalFooter>
                </S.MsgDetailContainer>
              ) : /* 쪽지 리스트 */
              messageList.length > 0 ? (
                messageList.map((msg) => (
                  <S.MessageBox
                    key={msg.msgId}
                    $isRead={msg.isRead}
                    onClick={() => handleReadMessage(msg)}
                  >
                    <div className="msg-info">
                      <span className="sender">{msg.senderName}</span>
                      <span className="date">{msg.sentAt?.split("T")[0]}</span>
                    </div>
                    <p className="content">{msg.content}</p>
                  </S.MessageBox>
                ))
              ) : (
                <p
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#999",
                  }}
                >
                  쪽지가 없습니다.
                </p>
              )}
            </S.ModalBody>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default MyPage;
