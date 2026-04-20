import React from "react";
import styled from "styled-components";
import BoardListItem from "./BoardListItem";

const BoardUl = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #999;
  padding: 40px 0;
  font-size: 1.1rem;
`;

const BoardList = ({ boardList, handleDetailClick }) => {
  if (!boardList || boardList.length === 0) {
    return <EmptyMessage>게시글이 없습니다.</EmptyMessage>;
  }

  return (
    <BoardUl>
      {boardList.map((board) => (
        <BoardListItem
          key={board.postId}
          board={board}
          handleDetailClick={handleDetailClick}
        />
      ))}
    </BoardUl>
  );
};

export default BoardList;
