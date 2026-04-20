// src/style/LayoutStyle.js
import styled from "styled-components";

// 색상 정의 (이미지 기반)
const colors = {
  primary: "#ff5a5f", // 헤더 배경, 포인트 컬러
  sidebarBg: "#f7f9fc", // 사이드바 배경
  contentBg: "#f0f2f5", // 중앙 전체 배경
  textMain: "#333", // 메인 텍스트
  textSub: "#777", // 보조 텍스트
  border: "#eee", // 테두리 색상
};

// 1. 전체 상단 헤더
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed; /* 상단 고정 */
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: ${colors.primary};
  color: white;
  padding: 0 30px;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    height: 35px; /* 로고 크기 조절 */
  }
  span {
    font-size: 20px;
    font-weight: bold;
  }
`;

export const UserInfoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  a {
    color: white;
    text-decoration: none;
    cursor: pointer;
  }
  .user-name-link {
    text-decoration: none;
    color: inherit; /* 부모 색상 따름 */
    font-weight: bold;
    cursor: pointer;

    &:hover {
      text-decoration: underline; /* 마우스 올리면 밑줄 */
    }
  }
`;

// 2. 헤더 아래 전체 영역 Wrapper (Sidebar + Main)
export const Wrapper = styled.div`
  display: flex;
  margin-top: 60px; /* 헤더 높이만큼 띄움 */
  min-height: calc(100vh - 60px); /* 화면 꽉 차게 */
`;

// 3. 좌측 사이드바
export const Sidebar = styled.nav`
  width: 260px; /* 사이드바 너비 */
  background-color: ${colors.sidebarBg};
  border-right: 1px solid ${colors.border};
  padding: 40px 0;
  position: fixed; /* 스크롤 시 고정 */
  top: 60px;
  bottom: 0;
  overflow-y: auto; /* 내용이 많으면 자체 스크롤 */
  z-index: 900;
`;

export const UniversityName = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: ${colors.textMain};
  padding: 0 30px;
  margin-bottom: 30px;
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    a {
      display: block;
      padding: 18px 30px;
      font-size: 16px;
      color: ${colors.textMain};
      text-decoration: none;
      transition: all 0.2s ease;

      /* ★ 현재 위치(Active)일 때 스타일 */
      &.active {
        color: ${colors.primary}; /* 붉은색 글자 */
        background-color: #fff1f1; /* 매우 연한 빨간 배경 */
        font-weight: bold; /* 글자 굵게 */
      }

      /* 호버 상태 */
      &:hover:not(.active) {
        background-color: ${colors.border};
      }
    }
  }
`;

// 4. 중앙 콘텐츠 영역
export const MainContent = styled.main`
  flex: 1; /* 남은 공간 모두 차지 */
  background-color: ${colors.contentBg};
  margin-left: 260px; /* 사이드바 너비만큼 왼쪽 마진 */
  padding: 40px;
  box-sizing: border-box;
`;

// 이미지 속 "하얀색 카드" (실제 Outlet 내용이 들어갈 곳)
export const ContentCard = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  min-height: 500px; /* 최소 높이 */
`;
