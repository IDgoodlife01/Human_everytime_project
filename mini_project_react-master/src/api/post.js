import api from "./axios";

// 게시글 등록
export const createPost = async (title, content, category) => {
  const user = JSON.parse(localStorage.getItem("loginUser"));
  const response = await api.post("/api/posts", {
    userId: user.userId,
    title,
    content,
    category,
  });
  return response.data.data;
};

// 게시글 목록
export const getPostList = async () => {
  const response = await api.get("/api/posts");
  return response.data.data;
};
