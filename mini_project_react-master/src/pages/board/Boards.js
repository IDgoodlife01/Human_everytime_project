import React, { useState, useEffect, useContext } from "react";
import AxiosApi from "../../api/AxiosApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BoardList from "./BoardList";
import { UserContext } from "../../context/UserStore";

const BoardContainer = styled.div`
  padding: 10px 20px;
  background-color: white;
  border-radius: 15px;
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 2px solid #f1f1f1;
  margin-bottom: 10px;
  border-radius: 15px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #333;
`;

const WriteButton = styled.button`
  background-color: #ff5a5f; /* 에브리타임 레드 */
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #ef4a4f;
  }
`;

const Boards = () => {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);

  useEffect(() => {
    if (!loginUser) {
      navigate("/");
      return;
    }
    const loadBoardList = async () => {
      try {
        const rsp = await AxiosApi.getPostList();
        console.log("백엔드 응답 데이터:", rsp.data); // 데이터 구조 확인용

        // 1. 데이터가 아예 없을 때 예외처리
        if (!rsp.data) return;

        // 2. 데이터 구조에 따라 적절하게 setBoardList 호출
        if (Array.isArray(rsp.data)) {
          // 백엔드가 배열을 바로 줄 때: [{}, {}]
          setBoardList(rsp.data);
        } else if (rsp.data.data && Array.isArray(rsp.data.data)) {
          // 백엔드가 객체 안에 data 배열을 담아줄 때: { data: [...] }
          setBoardList(rsp.data.data);
        } else if (rsp.data.success && Array.isArray(rsp.data.data)) {
          // 백엔드가 { success: true, data: [...] } 구조일 때
          setBoardList(rsp.data.data);
        }
      } catch (e) {
        console.log("게시글 로딩 실패:", e);
      }
    };
    loadBoardList();
  }, [loginUser, navigate]);

  const handleDetailClick = (postId) => navigate(`/boardDetail/${postId}`);

  return (
    <BoardContainer>
      <BoardHeader>
        <Title>자유게시판</Title>
        <WriteButton onClick={() => navigate("/boardWrite")}>
          + 글쓰기
        </WriteButton>
      </BoardHeader>

      <BoardList boardList={boardList} handleDetailClick={handleDetailClick} />
    </BoardContainer>
  );
};

export default Boards;
