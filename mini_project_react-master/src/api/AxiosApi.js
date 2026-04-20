import axios from "axios";

// ===== 서버 주소 설정 =====
// 로컬 개발 시
//const BASE_URL = "http://localhost:8112"; //기존 자기만 볼 때
const BASE_URL = "http://192.168.0.160:8112";
// 외부 서버 사용 시 아래 주석 해제
// const BASE_URL = "http://서버IP:8111";

const AxiosApi = {
  // ==========================================
  //  Auth - 회원가입 / 로그인
  // ==========================================

  // 이메일 중복 확인 (true: 사용 가능, false: 중복)
  checkEmail: async (email) => {
    return await axios.get(`${BASE_URL}/api/auth/check-email?email=${email}`);
  },

  // 회원가입
  // 요청: { email, password, name }
  // 응답: { success, message, data: null }
  signUp: async (email, password, name, major, year) => {
    return await axios.post(`${BASE_URL}/api/auth/signup`, {
      email,
      password,
      name,
      major,
      year,
    });
  },

  // 로그인
  // 요청: { email, password }
  // 응답: { success, message, data: { userId, email, name, isAdmin } }
  login: async (email, password) => {
    return await axios.post(`${BASE_URL}/api/auth/login`, {
      email,
      password,
    });
  },

  // ==========================================
  //  User - 회원 정보 조회 / 수정
  // ==========================================

  // 회원 정보 조회
  // 응답: { success, message, data: { userId, email, name, isAdmin, createdAt } }
  getUser: async (userId) => {
    return await axios.get(`${BASE_URL}/api/users/${userId}`);
  },

  // 회원 정보 수정 (변경할 항목만 전달, 빈값이면 변경 안 함)
  // 요청: { name, password }
  updateUser: async (userId, name, password, major, year) => {
    return await axios.put(`${BASE_URL}/api/users/${userId}`, {
      name,
      password,
      major, // 추가
      year, // 추가
    });
  },

  // 책: 전체 목록을 가져와서 리액트에서 필터링 예정
  getAllBooks: async () => {
    return await axios.get(`${BASE_URL}/api/books`);
  },

  // 4. 받은 쪽지함
  getReceivedMessages: async (userId) => {
    return await axios.get(`${BASE_URL}/api/messages/received/${userId}`);
  },

  // 쪽지 읽음 처리 (PUT 방식)
  // 백엔드 컨트롤러: @PutMapping("/{msgId}/read") @RequestParam Long userId
  readMessage: async (msgId, userId) => {
    return await axios.put(`${BASE_URL}/api/messages/${msgId}/read`, null, {
      params: { userId: userId },
    });
  },

  // 쪽지 보내기 (필요할 경우 사용)
  sendMessage: async (senderId, messageData) => {
    // messageData 예시: { receiverId: 2, content: "안녕하세요" }
    return await axios.post(
      `${BASE_URL}/api/messages/${senderId}`,
      messageData,
    );
  },

  // ==========================================
  //  Post - 게시글 CRUD
  // ==========================================

  // 게시글 전체 목록 조회 (최신순)
  // 응답: { success, message, data: [ { postId, userId, userName, title, content, category, createdAt }, ... ] }
  getPostList: async () => {
    return await axios.get(`${BASE_URL}/api/posts`);
  },

  // 게시글 단건 조회
  getPost: async (postId) => {
    return await axios.get(`${BASE_URL}/api/posts/${postId}`);
  },

  // 내 게시글 목록
  getMyPostList: async (userId) => {
    return await axios.get(`${BASE_URL}/api/posts/my/${userId}`);
  },

  // 게시글 제목 검색
  searchPost: async (keyword) => {
    return await axios.get(`${BASE_URL}/api/posts/search?keyword=${keyword}`);
  },

  // 카테고리별 게시글 목록
  getPostListByCategory: async (category) => {
    return await axios.get(`${BASE_URL}/api/posts/category/${category}`);
  },

  // 게시글 등록
  // 요청: { userId, title, content, category }
  // category: 생략 가능 (기본값: null)
  writePost: async (userId, title, content, category) => {
    return await axios.post(`${BASE_URL}/api/posts`, {
      userId,
      title,
      content,
      category: category || null,
    });
  },

  // 게시글 수정
  // 요청: { userId, title, content, category }
  updatePost: async (postId, userId, title, content, category) => {
    return await axios.put(`${BASE_URL}/api/posts/${postId}`, {
      userId,
      title,
      content,
      category: category || null,
    });
  },

  // 게시글 삭제
  deletePost: async (postId, userId) => {
    return await axios.delete(
      `${BASE_URL}/api/posts/${postId}?userId=${userId}`,
    );
  },

  // ==========================================
  //  Comment - 댓글 CRUD
  // ==========================================

  // 특정 게시글 댓글 목록 조회
  // 응답: { success, message, data: [ { commentId, postId, userId, userName, content, createdAt }, ... ] }
  getCommentList: async (postId) => {
    return await axios.get(`${BASE_URL}/api/posts/${postId}/comments`);
  },

  // 댓글 등록
  // 요청: { userId, content }
  writeComment: async (postId, userId, content) => {
    return await axios.post(`${BASE_URL}/api/posts/${postId}/comments`, {
      userId,
      content,
    });
  },

  // 댓글 수정
  updateComment: async (postId, commentId, userId, content) => {
    return await axios.put(
      `${BASE_URL}/api/posts/${postId}/comments/${commentId}`,
      { userId, content },
    );
  },

  // 댓글 삭제
  deleteComment: async (postId, commentId, userId) => {
    return await axios.delete(
      `${BASE_URL}/api/posts/${postId}/comments/${commentId}?userId=${userId}`,
    );
  },

  // ==========================================
  //  Schedule - 시간표 CRUD (기존 객체 내부에 추가)
  // ==========================================

  // 시간표 추가 (POST /api/schedules/{userId})
  writeSchedule: async (userId, payload) => {
    return await axios.post(`${BASE_URL}/api/schedules/${userId}`, payload);
  },

  // 시간표 조회 (GET /api/schedules/{userId})
  getSchedules: async (userId) => {
    return await axios.get(`${BASE_URL}/api/schedules/${userId}`);
  },

  // 시간표 삭제 (DELETE /api/schedules/{scheduleId}?userId={userId})
  deleteSchedule: async (scheduleId, userId) => {
    return await axios.delete(
      `${BASE_URL}/api/schedules/${scheduleId}?userId=${userId}`,
    );
  },
  // ==========================================
  //  StudyRoom - 열람실/좌석 CRUD (수정 완료)
  // ==========================================

  // [GET] 열람실 좌석 현황 조회
  getStudyRoomStatus: async (roomId) => {
    // 따옴표 대신 백틱(`) 사용
    return await axios.get(`${BASE_URL}/api/study-rooms/${roomId}/status`);
  },

  // [POST] 좌석 배정/예약
  assignSeat: async (userId, seatData) => {
    return await axios.post(`${BASE_URL}/api/study-rooms/${userId}`, seatData);
  },

  // [PUT] 좌석 반납 (퇴실)
  releaseSeat: async (assignId, userId) => {
    return await axios.put(
      `${BASE_URL}/api/study-rooms/${assignId}/leave`,
      null, // PUT 요청에서 body가 없을 때는 null을 명시해주는 것이 좋습니다.
      {
        params: { userId },
      },
    );
  },

  // 컨트롤러에 updateBook 없음 — 백엔드에 추가 필요
  updateBook: async (bookId, userId, body) => {
    return await axios.put(
      `${BASE_URL}/api/books/${bookId}?userId=${userId}`,
      body,
    );
  },

  deleteBook: async (bookId, userId) => {
    return await axios.delete(
      `${BASE_URL}/api/books/${bookId}?userId=${userId}`,
    );
  },

  // PATCH → PUT
  completeBook: async (bookId, userId) => {
    return await axios.put(
      `${BASE_URL}/api/books/${bookId}/complete?userId=${userId}`,
    );
  },
  // 1. 목록 조회를 위한 함수 추가
  getBookList: async () => {
    return await axios.get(`${BASE_URL}/api/books`);
  },

  // 2. 신규 등록을 위한 함수 추가
  writeBook: async (userId, body) => {
    return await axios.post(`${BASE_URL}/api/books/${userId}`, body);
  },
};

export default AxiosApi;
