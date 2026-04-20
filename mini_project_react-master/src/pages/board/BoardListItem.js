import React from "react";
import styled from "styled-components";

const BoardLi = styled.li`
  list-style: none;
  padding: 15px;
  border-bottom: 1px solid #f1f1f1;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const ItemTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #292929;
  margin-bottom: 4px;
`;

const ItemContent = styled.div`
  font-size: 13px;
  color: #737373;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const BoardListItem = ({ board, handleDetailClick }) => {
  return (
    <BoardLi onClick={() => handleDetailClick(board.postId)}>
      <ItemTitle>{board.title}</ItemTitle>
      <ItemContent>{board.content}</ItemContent>
    </BoardLi>
  );
};

export default BoardListItem;
