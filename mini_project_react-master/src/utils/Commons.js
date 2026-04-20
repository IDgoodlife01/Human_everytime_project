import moment from "moment";
import "moment/locale/ko";
moment.locale("ko");

const Commons = {
  // 경과 시간 표시 (예: 3분 전, 2시간 전)
  timeFromNow: (timestamp) => {
    return moment(timestamp).fromNow();
  },

  // 날짜 포맷 (예: 2026년 04월 13일 15시 30분)
  formatDate: (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  },

  // 로그인 여부 확인
  isLogin: () => {
    return localStorage.getItem("isLogin") === "TRUE";
  },

  // 로그인 유저 정보 가져오기
  getLoginUser: () => {
    const saved = localStorage.getItem("loginUser");
    return saved ? JSON.parse(saved) : null;
  },
};

export default Commons;
