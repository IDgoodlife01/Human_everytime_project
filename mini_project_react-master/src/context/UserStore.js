import { createContext, useEffect, useState } from "react";
export const UserContext = createContext(null);

/**
 * 전역 상태 관리 Context
 *
 * [로그인 정보] localStorage "loginUser" 키로 저장
 *   { userId, email, name, isAdmin }
 *
 * [테마 색상] localStorage "bgcolor" 키로 저장
 */
const UserStore = (props) => {
  // 테마 색상
  const [color, setColor] = useState(
    localStorage.getItem("bgcolor") || "orange"
  );

  // 로그인 유저 정보 (로그인 성공 시 서버 응답 data를 그대로 저장)
  const [loginUser, setLoginUser] = useState(() => {
    const saved = localStorage.getItem("loginUser");
    return saved ? JSON.parse(saved) : null;
  });

  // 색상 변경 시 localStorage 동기화
  useEffect(() => {
    localStorage.setItem("bgcolor", color);
  }, [color]);

  // 로그인 유저 변경 시 localStorage 동기화
  useEffect(() => {
    if (loginUser) {
      localStorage.setItem("loginUser", JSON.stringify(loginUser));
    } else {
      localStorage.removeItem("loginUser");
      localStorage.removeItem("isLogin");
    }
  }, [loginUser]);

  // 로그인 처리 (서버 응답 data 전체를 저장)
  const handleLogin = (userData) => {
    setLoginUser(userData);
    localStorage.setItem("isLogin", "TRUE");
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setLoginUser(null);
    localStorage.removeItem("loginUser");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("email"); // 기존 호환성 유지
  };

  return (
    <UserContext.Provider
      value={{
        color,
        setColor,
        loginUser,
        setLoginUser,
        handleLogin,
        handleLogout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
