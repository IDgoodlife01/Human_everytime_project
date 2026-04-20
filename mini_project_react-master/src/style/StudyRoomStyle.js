import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

export const StatusBoard = styled.div`
  width: 100%;
  max-width: 850px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 25px;
  background-color: #fff;
  border-radius: 15px;
  margin-bottom: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
`;

export const BoardTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  color: ${(props) => props.color};
  small {
    font-size: 12px;
    color: #888;
    margin-top: 4px;
    font-weight: normal;
  }
`;

export const ContentCard = styled.div`
  width: 100%;
  max-width: 850px;
  background-color: #fff;
  padding: 35px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 50px;
  box-sizing: border-box;
`;

export const SeatLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin-bottom: 30px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.cols}, 38px);
  gap: 6px;
`;

export const Seat = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  /* 빈좌석 주황색, 사용중 빨간색 기존 규칙 복구 */
  background-color: ${(props) => (props.$is_occupied ? "#FF4D4F" : "#FFD591")};
  border: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  cursor: pointer;
  border-radius: 3px;
  color: ${(props) => (props.$is_occupied ? "#fff" : "#333")};
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.1);
    z-index: 10;
  }
`;

export const TabGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
`;

export const Tab = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.active ? "#FFE7BA" : "#fff")};
  border: 1px solid ${(props) => (props.active ? "#FFA940" : "#d9d9d9")};
  border-radius: 6px;
  cursor: pointer;
`;

export const RoomTitle = styled.h4`
  margin-bottom: 25px;
  color: #333;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 350px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 25px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  min-width: 90px;
  height: 40px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.primary ? "#FF4D4F" : "#e0e0e0")};
  color: ${(props) => (props.primary ? "#fff" : "#333")};

  &:hover {
    opacity: 0.9;
  }
`;
