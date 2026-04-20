# 🚀 Mini Project Base - React

> Spring Boot `mini_project_base` 백엔드와 연동되는 React 프론트엔드 샘플

---

## 📦 설치 및 실행

```bash
npm install
npm start
```

브라우저에서 `http://localhost:3000` 접속

---

## ⚙️ 백엔드 서버 주소 설정

`src/api/AxiosApi.js` 파일에서 서버 주소를 변경하세요.

```js
// 로컬 개발 시
const BASE_URL = "http://localhost:8111";

// 외부 서버 사용 시
// const BASE_URL = "http://서버IP:8111";
```

---

## 📁 프로젝트 구조

```
src/
├── api/
│   └── AxiosApi.js         ← 모든 API 호출 (mini_project_base 연동)
├── component/
│   ├── Button.js
│   ├── Input.js
│   └── Modal.js
├── context/
│   └── UserStore.js        ← 로그인 유저 전역 상태 (Context API)
├── pages/
│   ├── signup/
│   │   ├── Login.js        ← 로그인
│   │   └── Signup.js       ← 회원가입
│   ├── member/
│   │   ├── Members.js      ← 회원 목록
│   │   └── MemberInfo.js   ← 회원 상세 / 정보 수정
│   ├── board/
│   │   ├── Boards.js       ← 게시글 목록 + 검색
│   │   ├── BoardList.js
│   │   ├── BoardListItem.js
│   │   ├── BoardWrite.js   ← 게시글 작성
│   │   ├── BoardDetail.js  ← 게시글 상세 + 댓글 CRUD
│   │   └── Category.js
│   ├── setting/
│   │   └── ThemeSetting.js ← 테마 색상 설정
│   ├── Home.js
│   └── Layout.js           ← 사이드메뉴 레이아웃
├── style/
│   ├── GlobalStyle.js
│   ├── LayoutStyle.js
│   ├── LoginStyle.js
│   └── ButtonStyle.js
└── utils/
    └── Commons.js          ← 날짜 포맷, 로그인 유틸
```

---

## 🔗 API 연동 구조

### 공통 응답 형식
모든 API 응답은 아래 구조입니다.
```json
{
    "success": true,
    "message": "성공 메시지",
    "data": { ... }
}
```
→ React에서는 `rsp.data.data`로 실제 데이터에 접근합니다.

### 로그인 상태 관리
로그인 성공 시 `localStorage["loginUser"]`에 아래 정보가 저장됩니다.
```json
{
    "userId": 1,
    "email": "hong@test.com",
    "name": "홍길동",
    "isAdmin": false
}
```

### 구현된 API 목록

| 기능 | 메서드 | 경로 |
|---|---|---|
| 이메일 중복 확인 | GET | `/api/auth/check-email?email=` |
| 회원가입 | POST | `/api/auth/signup` |
| 로그인 | POST | `/api/auth/login` |
| 회원 정보 조회 | GET | `/api/users/{userId}` |
| 회원 정보 수정 | PUT | `/api/users/{userId}` |
| 게시글 전체 목록 | GET | `/api/posts` |
| 게시글 단건 조회 | GET | `/api/posts/{postId}` |
| 게시글 검색 | GET | `/api/posts/search?keyword=` |
| 게시글 등록 | POST | `/api/posts` |
| 게시글 삭제 | DELETE | `/api/posts/{postId}?userId=` |
| 댓글 목록 조회 | GET | `/api/posts/{postId}/comments` |
| 댓글 등록 | POST | `/api/posts/{postId}/comments` |
| 댓글 수정 | PUT | `/api/posts/{postId}/comments/{commentId}` |
| 댓글 삭제 | DELETE | `/api/posts/{postId}/comments/{commentId}?userId=` |

---

## 🆚 원본 대비 변경 사항

| 항목 | 원본 | 변경 후 |
|---|---|---|
| 인증 방식 | email + pwd (boolean 응답) | email + password (LoginResDto 응답) |
| 로그인 상태 저장 | `localStorage.email` | `localStorage.loginUser` (JSON) |
| 회원 식별자 | email | userId (Long) |
| 게시글 식별자 | boardId | postId |
| 댓글 작성자 | email | userId + userName |
| 날짜 필드 | regDate | createdAt |
| 이미지 업로드 | Firebase Storage | 제거 (URL 직접 입력으로 대체 가능) |
| 채팅 기능 | Firebase Realtime DB | 제거 |
| 카카오맵 | 포함 | 제거 (각 조 필요 시 추가) |
| 카테고리 | 서버 DB 관리 | 프론트 고정 목록 (각 조 커스텀) |
| 댓글 | 등록만 | 등록 + 수정 + 삭제 |
