import styled, { css } from "styled-components";
import React from "react";

const StyledButton = styled.button`
  margin: 100px 30px 0;
  font-weight: bold;
  width: 100%;
  height: 50px;
  color: white;
  background-color: #999;
  font-size: 15px;
  border-radius: 18px;
  border: orange;
  font-weight: 700;

  ${(props) =>
    props.enabled &&
    css`
      background-color: orange;
    `};

  &:active {
    border: #999;
    font-weight: 700;
    background-color: #999;
  }
`;
// props로 3개의 값을 전달 받음,
const Button = ({ enabled, onClick, children }) => {
  return (
    <StyledButton enabled={enabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
