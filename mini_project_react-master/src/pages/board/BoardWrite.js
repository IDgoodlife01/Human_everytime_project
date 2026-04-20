import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import styled from "styled-components";
import { UserContext } from "../../context/UserStore";

const WriteContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  min-height: 500px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 0;
  border: none;
  border-bottom: 1px solid #eee;
  font-size: 18px;
  font-weight: bold;
  outline: none;
  margin-bottom: 10px;
  &::placeholder {
    color: #ccc;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 350px;
  padding: 10px 0;
  border: none;
  font-size: 16px;
  outline: none;
  resize: none;
  line-height: 1.5;
  &::placeholder {
    color: #ccc;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
`;

const BaseButton = styled.button`
  flex: 1;
  padding: 15px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s;
`;

const SubmitButton = styled(BaseButton)`
  background-color: #ff5a5f; /* 에브리타임 레드 */
  color: white;
  &:hover {
    background-color: #ef4a4f;
  }
`;

const CancelButton = styled(BaseButton)`
  background-color: #eee;
  color: #333;
  &:hover {
    background-color: #ddd;
  }
`;

const BoardWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      // 카테고리는 기본값 "FREE"로 설정 (백엔드 요구사항에 맞춰 수정 가능)
      const rsp = await AxiosApi.writePost(
        loginUser.userId,
        title,
        content,
        "FREE",
      );
      if (rsp.data) {
        alert("글이 등록되었습니다.");
        navigate("/boards");
      }
    } catch (e) {
      console.log("글 등록 실패:", e);
      alert("글 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <WriteContainer>
      <Input
        placeholder="글 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="내용을 입력하세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <ButtonContainer>
        <CancelButton onClick={() => navigate("/boards")}>취소</CancelButton>
        <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
      </ButtonContainer>
    </WriteContainer>
  );
};

export default BoardWrite;
