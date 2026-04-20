import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f2f2f2;
  min-height: 100vh;
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto 10px auto;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 1.2rem;
  color: #333;
`;

export const AddButton = styled.button`
  background-color: #f63d44;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #d32f2f;
  }
`;

export const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 50px repeat(5, 1fr);
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background-color: #ffffff;
  border: 1px solid #e3e3e3;
  border-radius: 8px;
`;

export const DayHeader = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 13px;
  color: #777;
  border-bottom: 1px solid #f0f0f0;
  border-left: 1px solid #f0f0f0;
`;

export const TimeLabel = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  padding-top: 5px;
  font-size: 11px;
  color: #999;
  border-bottom: 1px solid #f0f0f0;
`;

export const GridCell = styled.div`
  height: 50px;
  border-left: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
`;

export const HalfCell = styled.div`
  flex: 1;
  &:first-child {
    border-bottom: 1px dotted #f9f9f9;
  }
`;

export const ScheduleCard = styled.div`
  position: absolute;
  padding: 5px;
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 5;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left};
  width: ${(props) => props.$width};
  height: ${(props) => props.$height}px;
  background-color: ${(props) => props.$bgColor || "#e3f2fd"};

  .name {
    font-weight: bold;
    font-size: 11px;
    color: #333;
  }
  .room {
    font-size: 10px;
    color: #777;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  h3 {
    margin: 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-size: 12px;
      color: #666;
      font-weight: bold;
    }
  }

  input,
  select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }

  .btn-group {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  .save-btn {
    flex: 2;
    background: #f63d44;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }
  .cancel-btn {
    flex: 1;
    background: #eee;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
  }
`;

// --- 색상 팔레트 스타일 추가 ---
export const PaletteContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr); // 7가지 색상을 가로로 배치
  gap: 8px;
  margin-top: 5px;
`;

export const PaletteColor = styled.div`
  width: 100%;
  aspect-ratio: 1; // 정사각형 형태
  background-color: ${(props) => props.$color};
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.2s;

  /* 선택되었을 때 강조 효과 (테두리 + 약간 크기 키움) */
  ${(props) =>
    props.$isSelected &&
    `
    border: 2px solid #333;
    transform: scale(1.1);
  `}

  &:hover {
    transform: scale(1.05);
  }
`;
