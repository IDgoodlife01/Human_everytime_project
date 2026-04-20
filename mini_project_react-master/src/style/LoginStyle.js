import styled from "styled-components";

// 1. 배경 (전체 화면 중앙 정렬)
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f2f2f2;
  margin: 0;
  padding: 0;
`;

// 2. 흰색 로그인 박스 (이미지의 핵심)
export const LoginBox = styled.div`
  background-color: white;
  padding: 50px 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px; /* 박스 너비 고정 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

// 3. 로고 영역
export const LogoArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -1px;
`;

// 4. 탭 메뉴 (반반씩 정확히 정렬)
export const TabMenu = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 2px solid #eee;
  margin-bottom: 25px;

  div,
  a {
    flex: 1; /* 50%씩 차지 */
    text-align: center;
    padding: 12px 0;
    text-decoration: none;
    font-size: 14px;
    font-weight: bold;
    color: #ccc;
    cursor: pointer;
  }

  .active {
    color: #333;
    border-bottom: 2px solid #ff5a5f; /* 이미지의 빨간색 밑줄 */
    margin-bottom: -2px; /* 밑줄 위치 조정 */
  }
`;

// 5. 입력창 및 버튼 감싸는 컨테이너
export const Items = styled.div`
  width: 100%;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 내부 요소를 가로축 중앙으로 정렬 */

  /* Input 컴포넌트 자체가 styled-component일 경우를 대비 */
  & > div,
  & > input,
  & > border {
    width: 100% !important;
    box-sizing: border-box;
  }

  /* Input 컴포넌트 내부의 실제 input 태그 강제 확장 */
  input {
    width: 100% !important;
    max-width: 100%;
    box-sizing: border-box;
  }
`;
