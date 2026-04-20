import api from "./axios";

// 로그인
export const login = async (email, password) => {
  const response = await api.post("/api/auth/login", { email, password });
  if (response.data.success) {
    localStorage.setItem("loginUser", JSON.stringify(response.data.data));
    return response.data.data;
  }
  throw new Error(response.data.message);
};

// 로그인 유저 가져오기
export const getLoginUser = () => {
  const user = localStorage.getItem("loginUser");
  return user ? JSON.parse(user) : null;
};

// 로그아웃
export const logout = () => {
  localStorage.removeItem("loginUser");
};
