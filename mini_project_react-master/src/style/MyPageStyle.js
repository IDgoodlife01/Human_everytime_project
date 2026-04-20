import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 30px;
  padding: 10px;
  background-color: #f8f9fa;
  min-height: 80vh;
`;

// 좌측 프로필 카드
export const ProfileCard = styled.div`
  flex: 1;
  background: white;
  border-radius: 15px;
  padding: 50px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: fit-content;
`;

export const IdTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 50px;
  color: #333;
`;

export const StatsArea = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-bottom: 30px;
  border-top: 1px solid #eee;
  padding-top: 20px;
`;

export const StatBox = styled.div`
  text-align: center;
`;

export const Count = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #ff4d4f;
`;

export const Label = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 5px;
`;

export const EditProfileBtn = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #e04345;
  }
`;

// 우측 영역
export const InfoZone = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const CommonCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const InfoTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #ff4d4f;
  margin-bottom: 25px;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  row-gap: 20px;
  align-items: center;
`;

export const InfoLabel = styled.div`
  font-size: 14px;
  color: #555;
  font-weight: 500;
`;

export const InfoValue = styled.div`
  font-size: 14px;
  color: #333;
  text-align: right;
`;

export const ValueWithBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #333;
`;

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 18px 0;
  border-bottom: 1px solid #f1f1f1;
  font-size: 15px;
  color: #444;
  &:last-child {
    border-bottom: none;
  }
`;

export const CountArrow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #999;
  .cnt {
    font-size: 14px;
  }
  .arrow {
    font-size: 16px;
    font-weight: 300;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검정 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 요소 위에 뜨도록 */
`;

// 모달 창 (Content)
export const ModalContent = styled.div`
  background-color: white;
  width: 400px;
  max-width: 90%;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 테두리 밖 내용 숨김 */
`;

export const ModalHeader = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #333;
  }
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #333;
  }
`;

export const ModalBody = styled.div`
  padding: 20px;
`;

export const InputGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
    font-size: 0.9rem;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box; /* padding 포함 크기 계산 */

    &:disabled {
      background-color: #f5f5f5;
      color: #999;
      cursor: not-allowed;
    }
  }
`;

export const ErrorMessage = styled.p`
  color: #d9534f; /* 에러 빨간색 */
  font-size: 0.85rem;
  margin-top: -10px;
  margin-bottom: 10px;
`;

export const ModalFooter = styled.div`
  padding: 15px 20px;
  background-color: #f9f9f9;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const ModalBtn = styled.button`
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-weight: bold;
`;

export const CancelBtn = styled(ModalBtn)`
  background-color: #e0e0e0;
  color: #333;
  &:hover {
    background-color: #d0d0d0;
  }
`;

export const SaveBtn = styled(ModalBtn)`
  background-color: #ff4d4f; /* 기존 앱 테마 색상 */
  color: white;
  &:hover {
    background-color: #ff7875;
  }
`;
export const LabelWithBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RedDot = styled.div`
  width: 7px;
  height: 7px;
  background-color: #ff4d4f;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
`;

export const MessageBox = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  background-color: ${(props) =>
    props.$isRead ? "#ffffff" : "#fff9f9"}; // 안 읽으면 붉은 기 도는 배경
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  .msg-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    .sender {
      font-weight: 700;
      font-size: 14px;
      color: #333;
    }
    .date {
      font-size: 12px;
      color: #999;
    }
  }

  .content {
    font-size: 13px;
    color: #666;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; // 길면 ... 처리
  }
`;
export const MsgDetailContainer = styled.div`
  padding: 10px;
  .msg-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 15px;
    strong {
      font-size: 16px;
    }
    span {
      font-size: 12px;
      color: #999;
    }
  }
  .msg-content {
    min-height: 150px;
    line-height: 1.6;
    font-size: 14px;
    color: #333;
    white-space: pre-wrap; // 줄바꿈 허용
  }
`;
// 답장 영역 전체 컨테이너
export const ReplySection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

// 세련된 텍스트박스
export const ReplyTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  resize: none;
  font-family: inherit;
  font-size: 0.9rem;
  background-color: #fcfcfc;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #ff4d4f; /* 프로젝트 메인 컬러가 있다면 변경하세요 */
    background-color: #fff;
    box-shadow: 0 0 8px rgba(255, 77, 79, 0.1);
  }

  &::placeholder {
    color: #ccc;
  }
`;
