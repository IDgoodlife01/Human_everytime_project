import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  PageWrapper,
  Card,
  LogoArea,
  TabBar,
  Tab,
  Field,
  StyledInput,
  SubmitButton,
} from "../../style/LoginStyle";

import Modal from "../../component/Modal";
import AxiosApi from "../../api/AxiosApi";
import { UserContext } from "../../context/UserStore";

import { FaEye, FaEyeSlash } from "react-icons/fa";

// 로고
import logoImg from "../../images/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, handleLogin } = useContext(UserContext);

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  // 🔥 eye toggle
  const [showPw, setShowPw] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (loginUser) {
      navigate("/timetable");
    }
  }, [loginUser, navigate]);

  const canSubmit = inputId.length > 0 && inputPw.length >= 4;

  const onClickLogin = async () => {
    try {
      const rsp = await AxiosApi.login(inputId, inputPw);

      if (rsp.data.success) {
        handleLogin(rsp.data.data);
        navigate("/timetable");
      } else {
        setModalContent(
          rsp.data.message || "아이디 또는 비밀번호를 확인해주세요.",
        );
        setModalOpen(true);
      }
    } catch (e) {
      setModalOpen(true);

      if (e.response) {
        setModalContent(
          e.response.data.message ||
            "아이디 또는 비밀번호가 일치하지 않습니다.",
        );
      } else if (e.request) {
        setModalContent("서버 응답이 없습니다. 관리자에게 문의하세요.");
      } else {
        setModalContent("로그인 처리 중 오류가 발생했습니다.");
      }

      console.log("Login Error:", e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && canSubmit) {
      onClickLogin();
    }
  };

  return (
    <PageWrapper>
      <Card>
        {/* Logo */}
        <LogoArea>
          <img src={logoImg} alt="logo" />
          <span>에브리휴먼타임</span>
        </LogoArea>

        {/* Tabs */}
        <TabBar>
          <Tab $active>로그인</Tab>
          <Tab as={Link} to="/signup">
            회원가입
          </Tab>
        </TabBar>

        {/* ID */}
        <Field>
          <StyledInput
            placeholder="아이디(이메일)"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Field>

        {/* PASSWORD + EYE */}
        <Field>
          <div style={{ position: "relative" }}>
            <StyledInput
              type={showPw ? "text" : "password"}
              placeholder="비밀번호"
              value={inputPw}
              onChange={(e) => setInputPw(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              type="button"
              onClick={() => setShowPw((prev) => !prev)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#888",
                fontSize: "18px",
              }}
            >
              {showPw ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </Field>

        {/* LOGIN BUTTON */}
        <SubmitButton
          disabled={!canSubmit}
          onClick={canSubmit ? onClickLogin : undefined}
        >
          로그인
        </SubmitButton>
      </Card>

      {/* MODAL */}
      <Modal open={modalOpen} close={closeModal} header="알림">
        {modalContent}
      </Modal>
    </PageWrapper>
  );
};

export default Login;
