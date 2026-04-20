import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

// 마이페이지의 ProfileCard 스타일 계승
export const GameCard = styled.div`
  background: white;
  width: 100%;
  max-width: 480px;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

export const DifficultyArea = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

export const DiffBtn = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${(props) => (props.active ? "#333" : "#ddd")};
  background: ${(props) => (props.active ? "#333" : "white")};
  color: ${(props) => (props.active ? "white" : "#666")};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${(props) => (props.active ? "#333" : "#f0f0f0")};
  }
`;

export const SudokuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  width: 100%;
  aspect-ratio: 1 / 1;
  border: 2px solid #333;
  background: #333;
  gap: 1px;
  margin-bottom: 25px;
`;

export const Cell = styled.div`
  background: ${(props) =>
    props.isSelected ? "#e3f2fd" : props.isFixed ? "#f1f3f5" : "white"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(14px, 4vw, 20px);
  font-weight: ${(props) => (props.isFixed ? "800" : "500")};
  color: ${(props) => (props.isFixed ? "#333" : "#007bff")};
  cursor: pointer;

  // 3x3 구분을 위한 두꺼운 선 처리
  border-bottom: ${(props) =>
    props.isBottomHeavy ? "2px solid #333" : "none"};
  border-right: ${(props) => (props.isRightHeavy ? "2px solid #333" : "none")};

  &:hover {
    background: ${(props) => (props.isFixed ? "#f1f3f5" : "#f0f7ff")};
  }
`;

export const ActionArea = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

// 마이페이지의 EditProfileBtn 스타일
export const Button = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ddd;
  background: white;
  font-size: 15px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #f8f9fa;
    border-color: #bbb;
  }
`;
