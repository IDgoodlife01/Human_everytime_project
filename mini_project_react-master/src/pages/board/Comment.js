import React, { useState, useEffect, useContext } from "react";
import AxiosApi from "../../api/AxiosApi";
import { UserContext } from "../../context/UserStore";
import styled from "styled-components";

const CommentSection = styled.div`
  margin-top: 20px;
`;
const CommentCount = styled.div`
  font-weight: bold;
  margin-bottom: 15px;
  font-size: 14px;
`;
const CommentList = styled.div`
  margin-bottom: 30px;
`;

const CommentItem = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .comment-content {
    flex: 1;
  }
  .author {
    font-weight: bold;
    font-size: 13px;
    margin-bottom: 5px;
  }
  .text {
    font-size: 14px;
    color: #555;
  }
  .delete-btn {
    font-size: 12px;
    color: #ff5a5f;
    cursor: pointer;
    margin-left: 10px;
    background: none;
    border: none;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8f8f8;
  padding: 10px;
  border-radius: 30px;
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  padding: 10px 15px;
  outline: none;
`;

const SubmitBtn = styled.button`
  background: #ff5a5f;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  font-weight: bold;
  cursor: pointer;
`;

const Comment = ({ postId }) => {
  const { loginUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  const loadComments = async () => {
    try {
      const rsp = await AxiosApi.getCommentList(postId);
      const data = Array.isArray(rsp.data) ? rsp.data : rsp.data.data || [];
      setComments(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  // 댓글 삭제 함수 (파라미터 확인 필수)
  const handleDeleteComment = async (cId) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        // ★ 수정: 정의된 순서 (postId, commentId, userId)에 맞춰서 호출
        const rsp = await AxiosApi.deleteComment(postId, cId, loginUser.userId);

        if (rsp.data === true || rsp.data.success === true) {
          alert("댓글이 삭제되었습니다.");
          loadComments();
        } else {
          alert("삭제 실패 (권한이 없거나 서버 오류)");
        }
      } catch (e) {
        console.error("댓글 삭제 에러:", e);
        alert("댓글 삭제 요청 중 오류 발생");
      }
    }
  };

  const handleWrite = async () => {
    if (!input.trim()) return;
    try {
      await AxiosApi.writeComment(postId, loginUser.userId, input);
      setInput("");
      loadComments();
    } catch (e) {
      alert("작성 실패");
    }
  };

  return (
    <CommentSection>
      <CommentCount>전체 댓글 {comments.length}개</CommentCount>
      <CommentList>
        {comments.map((c, index) => (
          <CommentItem key={c.commentId || index}>
            <div className="comment-content">
              <div className="author">
                {index + 1}. {c.userName || c.userId}
              </div>
              <div className="text">{c.content}</div>
            </div>
            {/* 본인 확인: 반드시 String으로 형변환하여 비교 */}
            {loginUser && String(loginUser.userId) === String(c.userId) && (
              <button
                className="delete-btn"
                onClick={() => handleDeleteComment(c.commentId)}
              >
                삭제
              </button>
            )}
          </CommentItem>
        ))}
      </CommentList>

      <InputWrapper>
        <StyledInput
          placeholder="댓글을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <SubmitBtn onClick={handleWrite}>등록</SubmitBtn>
      </InputWrapper>
    </CommentSection>
  );
};

export default Comment;
