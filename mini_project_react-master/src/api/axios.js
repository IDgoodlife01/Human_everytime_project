import axios from "axios";

const api = axios.create({
  baseURL: "<http://localhost:8112>", // 본인 조 포트로 변경
  headers: { "Content-Type": "application/json" },
});

export default api;
