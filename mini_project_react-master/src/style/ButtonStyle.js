import styled, { css } from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const TransBtn = styled.button`
  width: 100%;
  height: 48px;
  background-color: #ff5a5f; /* 기본 레드 */
  border: none;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;

  /* 1. props에 따른 조건부 스타일 (css 활용) */
  ${(props) =>
    props.disabled &&
    css`
      background-color: #ffb8ba;
      cursor: not-allowed;
      &:hover {
        background-color: #ffb8ba; /* 비활성화 시 호버 방지 */
      }
    `}

  /* 2. 일반 호버 상태 */
  &:hover:not(:disabled) {
    background-color: #e54d52;
  }
`;
