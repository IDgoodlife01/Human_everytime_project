import React, { useState } from "react";
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
  Hint,
} from "../../style/LoginStyle";

import Modal from "../../component/Modal";
import AxiosApi from "../../api/AxiosApi";
import imgLogo from "../../images/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

/* ========================= */
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const PW_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,25}$/;

/* ========================= */
const Signup = () => {
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputNick, setInputNick] = useState("");

  const [dept, setDept] = useState(""); // 학과 직접입력
  const [year, setYear] = useState(""); // 학번 직접입력

  const [showPw, setShowPw] = useState(false);

  const [emailMsg, setEmailMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [isMail, setIsMail] = useState(false);
  const [isPw, setIsPw] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const closeModal = () => setModalOpen(false);

  const canSubmit =
    isMail && isPw && dept.trim() && year.trim() && inputNick.trim();

  /* =========================
     EMAIL CHECK
  ========================= */
  const onChangeEmail = async (e) => {
    const val = e.target.value;
    setInputEmail(val);

    if (!EMAIL_REGEX.test(val)) {
      setEmailMsg("이메일 형식이 올바르지 않습니다.");
      setIsMail(false);
      return;
    }

    try {
      const rsp = await AxiosApi.checkEmail(val);

      if (rsp.data.success && rsp.data.data) {
        setEmailMsg("사용 가능한 이메일입니다.");
        setIsMail(true);
      } else {
        setEmailMsg("중복된 이메일입니다.");
        setIsMail(false);
      }
    } catch {
      setEmailMsg("이메일 확인 실패");
      setIsMail(false);
    }
  };

  /* =========================
     PASSWORD CHECK
  ========================= */
  const onChangePw = (e) => {
    const val = e.target.value;
    setInputPw(val);

    if (!PW_REGEX.test(val)) {
      setPwMsg("숫자+영문자 조합 4자 이상");
      setIsPw(false);
    } else {
      setPwMsg("사용 가능한 비밀번호입니다.");
      setIsPw(true);
    }
  };

  /* =========================
     SIGN UP
  ========================= */
  const onClickSignUp = async () => {
    try {
      const rsp = await AxiosApi.signUp(
        inputEmail,
        inputPw,
        inputNick,
        dept,
        year,
      );

      if (rsp.data.success) {
        navigate("/");
      } else {
        setModalText(rsp.data.message || "회원가입 실패");
        setModalOpen(true);
      }
    } catch {
      setModalText("서버 오류 발생");
      setModalOpen(true);
    }
  };

  return (
    <PageWrapper>
      <Card>
        {/* LOGO */}
        <LogoArea>
          <img src={imgLogo} alt="logo" />
          <span>에브리휴먼타임</span>
        </LogoArea>

        {/* TAB */}
        <TabBar>
          <Tab as={Link} to="/">
            로그인
          </Tab>
          <Tab $active>회원가입</Tab>
        </TabBar>

        {/* EMAIL */}
        <Field>
          <StyledInput
            type="email"
            placeholder="이메일"
            value={inputEmail}
            onChange={onChangeEmail}
          />
          {inputEmail && <Hint $ok={isMail}>{emailMsg}</Hint>}
        </Field>

        {/* PASSWORD */}
        <Field>
          <div style={{ position: "relative" }}>
            <StyledInput
              type={showPw ? "text" : "password"}
              placeholder="비밀번호"
              value={inputPw}
              onChange={onChangePw}
            />

            <button
              type="button"
              onClick={() => setShowPw((p) => !p)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={showPw ? faEyeSlash : faEye} />
            </button>
          </div>

          {inputPw && <Hint $ok={isPw}>{pwMsg}</Hint>}
        </Field>

        {/* NICKNAME */}
        <Field>
          <StyledInput
            type="text"
            placeholder="닉네임"
            value={inputNick}
            onChange={(e) => setInputNick(e.target.value)}
          />
        </Field>

        {/* DEPARTMENT (직접 입력) */}
        <Field>
          <StyledInput
            type="text"
            placeholder="학과 입력"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
          />
        </Field>

        {/* YEAR (직접 입력) */}
        <Field>
          <StyledInput
            type="text"
            placeholder="학번 입력"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </Field>

        {/* SUBMIT */}
        <SubmitButton disabled={!canSubmit} onClick={onClickSignUp}>
          NEXT
        </SubmitButton>
      </Card>

      {/* MODAL */}
      <Modal open={modalOpen} close={closeModal} header="알림">
        {modalText}
      </Modal>
    </PageWrapper>
  );
};

export default Signup;
