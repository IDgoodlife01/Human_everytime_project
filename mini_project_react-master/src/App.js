import "./App.css";
import GlobalStyle from "./style/GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/signup/Login";
import Signup from "./pages/signup/Signup";
import Layout from "./pages/Layout";
import UserStore from "./context/UserStore";
import Boards from "./pages/board/Boards";
import BoardUpdate from "./pages/board/BoardUpdate";
import BoardWrite from "./pages/board/BoardWrite";
import BoardDetail from "./pages/board/BoardDetail";
import Timetable from "./pages/timetable";
import BookMarket from "./pages/bookmarket";
import MyPage from "./pages/MyPage";
import CalculatorPage from "./pages/calculator";
import Sudoku from "./pages/sudoku";
import StudyRoom from "./pages/studyroom";

function App() {
  return (
    <>
      <GlobalStyle />
      <UserStore>
        <Router>
          <Routes>
            {/* 인증 화면 (레이아웃 없음) */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* 로그인 이후 화면 (레이아웃 포함) */}
            <Route element={<Layout />}>
              <Route path="/boards" element={<Boards />} />
              <Route path="/boardWrite" element={<BoardWrite />} />
              <Route path="/boardDetail/:postId" element={<BoardDetail />} />
              <Route path="/timetable" element={<Timetable />} />
              <Route path="/boardUpdate/:postId" element={<BoardUpdate />} />
              <Route path="/bookmarket" element={<BookMarket />} />
              <Route path="/member" element={<MyPage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/sudoku" element={<Sudoku />} />
              <Route path="/studyroom" element={<StudyRoom />} />
            </Route>
          </Routes>
        </Router>
      </UserStore>
    </>
  );
}

export default App;
