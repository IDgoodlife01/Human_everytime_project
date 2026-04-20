import React, { useState, useContext } from "react"; // useContext 추가
import { useLocation, useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore"; // UserContext 임포트

const MessageWrite = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Context에서 loginUser 가져오기
  const { loginUser } = useContext(UserContext);

  // navigate로 넘어온 데이터가 있으면 자동 세팅, 없으면 비워둠
  const replyReceiverId = location.state?.receiverId || "";
  const replyReceiverName = location.state?.receiverName || "";

  const [content, setContent] = useState("");

  const handleSend = async () => {
    // 1. 유저 정보가 있는지 먼저 확인 (안전장치)
    if (!loginUser || !loginUser.userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      // 2. localStorage 대신 loginUser.userId 사용
      const rsp = await AxiosApi.sendMessage(loginUser.userId, {
        receiverId: replyReceiverId,
        content: content,
      });

      if (rsp.status === 200) {
        alert("쪽지를 보냈습니다.");
        navigate(-1); // 여기서는 navigate를 쓰니까 지우면 안 돼요!
      }
    } catch (e) {
      console.error("전송 에러:", e);
      alert("전송 실패");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>쪽지 보내기</h2>
      <p>
        받는 사람: <strong>{replyReceiverName || "선택되지 않음"}</strong>
      </p>
      <textarea
        style={{ width: "100%", height: "150px", marginBottom: "10px" }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleSend}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          전송
        </button>
        <button
          onClick={() => navigate(-1)}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default MessageWrite;
