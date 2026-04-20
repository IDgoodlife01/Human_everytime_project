import React, { useContext } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
// 1. [추가] 로고 이미지 파일을 import 합니다. 파일 경로를 본인의 프로젝트에 맞게 수정하세요.
import logoImg from "../images/logo.png"; // 예: src/assets/logo.png

import {
  Header,
  LogoContainer,
  UserInfoArea,
  Wrapper,
  Sidebar,
  UniversityName,
  MenuList,
  MainContent,
  ContentCard,
} from "../style/LayoutStyle";
import { UserContext } from "../context/UserStore";

const Layout = () => {
  const navigate = useNavigate();

  // Context에서 로그인 유저 정보와 로그아웃 함수를 가져옵니다.
  const { loginUser, handleLogout } = useContext(UserContext);

  // 로그아웃 핸들러
  const onClickLogout = (e) => {
    e.preventDefault(); // 링크의 기본 이동을 막고
    handleLogout(); // Context 상태와 localStorage를 동시에 비웁니다.
    navigate("/"); // 그 다음 로그인 페이지로 이동합니다.
  };

  return (
    <>
      <Header>
        <LogoContainer>
          {/* 2. [추가] 글자 왼쪽에 img 태그를 넣습니다. 크기와 간격을 조절했습니다. */}
          <img
            src={logoImg}
            alt="로고"
            style={{
              height: "24px", // 헤더 높이에 맞춰 적절히 조절 (로그인 페이지보다 작게)
              marginRight: "8px", // 글자와의 간격
              verticalAlign: "middle", // 글자와 수직 맞춤
            }}
          />
          <span style={{ verticalAlign: "middle" }}>에브리휴먼타임</span>
        </LogoContainer>
        <UserInfoArea>
          <Link to="/member" className="user-name-link">
            {/* loginUser가 있으면 이름을 보여줍니다. */}
            {loginUser ? `${loginUser.name}님` : "Guest님"}
          </Link>
          <span> / </span>
          {/* onClickLogout 함수를 연결합니다. */}
          <Link to="/" onClick={onClickLogout}>
            로그아웃
          </Link>
        </UserInfoArea>
      </Header>

      <Wrapper>
        <Sidebar>
          <UniversityName>휴먼 대학교</UniversityName>
          <MenuList>
            <li>
              <NavLink to="/timetable">시간표</NavLink>
            </li>
            <li>
              <NavLink to="/boards/">게시판</NavLink>
            </li>
            <li>
              <NavLink to="/calculator">학점계산기</NavLink>
            </li>
            <li>
              <NavLink to="/studyroom">열람실 예약</NavLink>
            </li>
            <li>
              <NavLink to="/bookmarket">책방</NavLink>
            </li>
            <li>
              <NavLink to="/sudoku">스도쿠</NavLink>
            </li>
          </MenuList>
        </Sidebar>

        <MainContent>
          <ContentCard>
            <Outlet />
          </ContentCard>
        </MainContent>
      </Wrapper>
    </>
  );
};

export default Layout;
