import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// 1. [추가] 로고 이미지 파일을 import 합니다. 파일 경로를 본인의 프로젝트에 맞게 수정하세요.
import logoImg from "../../images/logo.png"; // 예: src/assets/logo.png

import {
  Container,
  LoginBox,
  LogoArea,
  TabMenu,
  Items,
} from "../../style/LoginStyle";
import Input from "../../component/Input";
import Button from "../../component/Button";
import AxiosApi from "../../api/AxiosApi";
import Modal from "../../component/Modal";
import { UserContext } from "../../context/UserStore";

const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);

  const navigate = useNavigate();
  const { loginUser, handleLogin } = useContext(UserContext);

  useEffect(() => {
    if (loginUser) {
      navigate("/timetable");
    }
  }, [loginUser, navigate]);

  const isEnabled = inputEmail.length > 5 && inputPw.length >= 4;

  const onClickLogin = async () => {
    try {
      const rsp = await AxiosApi.login(inputEmail, inputPw);

      // 서버 응답이 성공(200 OK)이고 데이터 상으로도 success인 경우
      if (rsp.data.success) {
        handleLogin(rsp.data.data);
        navigate("/timetable");
      } else {
        // 성공 응답 내에서 논리적 에러(비번 틀림 등)가 있는 경우
        setModalOpen(true);
        setModalContent(
          rsp.data.message || "아이디 또는 비밀번호를 확인해주세요.",
        );
      }
    } catch (e) {
      // 서버가 4xx, 5xx 에러를 보낸 경우 catch로 들어옴
      setModalOpen(true);

      if (e.response) {
        // 1. 서버가 응답을 줬으나 에러인 경우 (비번 틀림, 없는 아이디 등)
        // 백엔드에서 보내주는 에러 메시지가 있다면 그걸 보여줍니다.
        const errorMessage =
          e.response.data.message ||
          "아이디 또는 비밀번호가 일치하지 않습니다.";
        setModalContent(errorMessage);
      } else if (e.request) {
        // 2. 서버에 요청은 보냈으나 응답이 아예 없는 경우 (서버 꺼짐)
        setModalContent("서버 응답이 없습니다. 관리자에게 문의하세요.");
      } else {
        // 3. 요청 설정 중 에러 발생
        setModalContent("로그인 처리 중 오류가 발생했습니다.");
      }
      console.log("Login Error:", e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isEnabled) {
      onClickLogin();
    }
  };

  return (
    <Container>
      <LoginBox>
        <LogoArea>
          {/* 2. [수정] 기존의 span 태그들을 지우고 img 태그를 넣습니다. */}
          <img
            src={logoImg}
            alt="에브리휴먼타임 로고"
            style={{
              height: "40px", // 로고 높이를 적절히 조절하세요.
              marginRight: "10px", // 글자와의 간격
              verticalAlign: "middle", // 글자와 수직 맞춤
            }}
          />
          <span style={{ color: "#ff5a5f", verticalAlign: "middle" }}>
            에브리휴먼타임
          </span>
        </LogoArea>

        <TabMenu>
          <div className="active">로그인</div>
          <Link to="/signup">
            <div>회원가입</div>
          </Link>
        </TabMenu>

        <Items>
          <Input
            placeholder="이메일(아이디)"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Items>

        <Items>
          <Input
            type="password"
            placeholder="비밀번호"
            value={inputPw}
            onChange={(e) => setInputPw(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Items>

        <Items style={{ marginTop: "20px" }}>
          <Button disabled={!isEnabled} onClick={onClickLogin}>
            로그인
          </Button>
        </Items>
      </LoginBox>

      <Modal open={modalOpen} close={closeModal} header="알림">
        {modalContent}
      </Modal>
    </Container>
  );
};

export default Login;
