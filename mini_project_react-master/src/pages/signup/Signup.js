import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import Input from "../../component/Input";
import Button from "../../component/Button";
import logoImg from "../../images/logo.png";

import {
  Container,
  LoginBox,
  LogoArea,
  TabMenu,
  Items,
} from "../../style/LoginStyle";
import Modal from "../../component/Modal";

const Signup = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [inputPw, setInputPw] = useState("");
  const [inputConPw, setInputConPw] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputMajor, setInputMajor] = useState("");
  const [inputYear, setInputYear] = useState("");

  // 유효성 상태
  const [pwMessage, setPwMessage] = useState("");
  const [conPwMessage, setConPwMessage] = useState("");
  const [mailMessage, setMailMessage] = useState("");
  const [isMail, setIsMail] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isConPw, setIsConPw] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const closeModal = () => setModalOpen(false);

  // 이메일 유효성 및 중복 체크
  const onChangeMail = (e) => {
    const currentEmail = e.target.value;
    setInputEmail(currentEmail);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(currentEmail)) {
      setMailMessage("이메일 형식이 올바르지 않습니다.");
      setIsMail(false);
    } else {
      checkEmailDuplicate(currentEmail);
    }
  };

  const checkEmailDuplicate = async (email) => {
    try {
      const rsp = await AxiosApi.checkEmail(email);
      if (rsp.data.success && rsp.data.data) {
        setMailMessage("사용 가능한 이메일 입니다.");
        setIsMail(true);
      } else {
        setMailMessage("중복된 이메일 입니다.");
        setIsMail(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangePw = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,25}$/;
    setInputPw(e.target.value);
    if (!passwordRegex.test(e.target.value)) {
      setPwMessage("숫자+영문자 조합으로 4자리 이상 입력해주세요!");
      setIsPw(false);
    } else {
      setPwMessage("안전한 비밀번호에요 : )");
      setIsPw(true);
    }
  };

  const onChangeConPw = (e) => {
    setInputConPw(e.target.value);
    if (e.target.value !== inputPw) {
      setConPwMessage("비밀번호가 일치하지 않습니다.");
      setIsConPw(false);
    } else {
      setConPwMessage("비밀번호가 일치합니다. :)");
      setIsConPw(true);
    }
  };

  const isAllValid =
    isMail &&
    isPw &&
    isConPw &&
    inputName.length > 0 &&
    inputMajor.length > 0 &&
    inputYear.length > 0;

  const onClickSignUp = async () => {
       if (!isAllValid) {
            setModalOpen(true);
            setModalText("모든 항목을 정확히 입력해야 가입이 가능합니다.");
            return;
          }
    try {
      const rsp = await AxiosApi.signUp(
        inputEmail,
        inputPw,
        inputName,
        inputMajor,
        inputYear,
      );
      if (rsp.data.success) {
        navigate("/");
      } else {
        setModalOpen(true);
        setModalText(rsp.data.message || "회원 가입에 실패 했습니다.");
      }
    } catch (e) {
      setModalOpen(true);
      setModalText("서버 연결 실패.");
    }
  };

  return (
    <Container>
      <LoginBox>
        <LogoArea>
          {/* 2. [수정] 파란색 S 대신 이미지를 넣었습니다. */}
          <img
            src={logoImg}
            alt="로고"
            style={{
              height: "40px",
              marginRight: "10px",
              verticalAlign: "middle",
            }}
          />
          <span style={{ color: "#ff5a5f", verticalAlign: "middle" }}>
            에브리휴먼타임
          </span>
        </LogoArea>

        <TabMenu>
          <Link to="/">
            <div>로그인</div>
          </Link>
          <div className="active">회원가입</div>
        </TabMenu>

        <Items>
          <Input
            placeholder="이메일"
            value={inputEmail}
            onChange={onChangeMail}
          />
          {inputEmail.length > 0 && (
            <span
              style={{
                fontSize: "11px",
                marginTop: "5px",
                color: isMail ? "royalblue" : "red",
              }}
            >
              {mailMessage}
            </span>
          )}
        </Items>

        <Items>
          <Input
            type="password"
            placeholder="비밀번호"
            value={inputPw}
            onChange={onChangePw}
          />
          {inputPw.length > 0 && (
            <span
              style={{
                fontSize: "11px",
                marginTop: "5px",
                color: isPw ? "royalblue" : "red",
              }}
            >
              {pwMessage}
            </span>
          )}
        </Items>

        <Items>
          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={inputConPw}
            onChange={onChangeConPw}
          />
          {inputConPw.length > 0 && (
            <span
              style={{
                fontSize: "11px",
                marginTop: "5px",
                color: isConPw ? "royalblue" : "red",
              }}
            >
              {conPwMessage}
            </span>
          )}
        </Items>

        <Items>
          <Input
            placeholder="이름"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
        </Items>

        <Items>
          <Input
            placeholder="전공"
            value={inputMajor}
            onChange={(e) => setInputMajor(e.target.value)}
          />
        </Items>

        <Items>
          <Input
            placeholder="학번 (예: 20260413)"
            value={inputYear}
            onChange={(e) => setInputYear(e.target.value)}
          />
        </Items>

        <Items style={{ marginTop: "20px" }}>
          <Button disabled={!isAllValid} onClick={onClickSignUp}>
            회원가입 하기
          </Button>
        </Items>
      </LoginBox>

      <Modal open={modalOpen} close={closeModal} header="알림">
        {modalText}
      </Modal>
    </Container>
  );
};

export default Signup;
