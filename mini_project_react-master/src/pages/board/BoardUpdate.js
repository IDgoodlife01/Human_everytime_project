import { useState, useEffect, useContext } from "react";
import AxiosApi from "../../api/AxiosApi";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../context/UserStore";

const Container = styled.div`
  max-width: 600px;
  margin: 60px auto;
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 30px;
  font-weight: bold;
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  color: #888;
  margin-bottom: 8px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 25px;
  font-size: 15px;
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 250px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 30px;
  font-size: 15px;
  line-height: 1.6;
  resize: none; /* 크기 조절 금지 */
  box-sizing: border-box;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ColorButton = styled.button`
  background: ${(props) => (props.cancel ? "#e0e0e0" : "#ff5a5f")};
  color: ${(props) => (props.cancel ? "#333" : "white")};
  border: none;
  border-radius: 8px;
  padding: 10px 25px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    opacity: 0.9;
  }
`;

const BoardUpdate = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext); // 본인 확인용
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState(null); // 권한 체크용

  // 1. 기존 게시글 정보 불러오기
  useEffect(() => {
    const getPost = async () => {
      try {
        const rsp = await AxiosApi.getPost(postId);
        const data = rsp.data.data ? rsp.data.data : rsp.data;
        if (data) {
          setTitle(data.title);
          setContent(data.content);
          setPost(data);

          // ★ 중요: 본인 확인 (로딩 전 에러 방지를 위해 String() 사용)
          if (
            loginUser &&
            data.userId &&
            String(loginUser.userId) !== String(data.userId)
          ) {
            alert("본인의 게시글만 수정할 수 있습니다.");
            navigate("/boards");
          }
        }
      } catch (e) {
        alert("게시글 정보를 불러오는 데 실패했습니다.");
        navigate(-1);
      }
    };
    getPost();
  }, [postId]);

  // 2. 수정 완료 함수
  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해 주세요.");
      return;
    }

    try {
      // AxiosApi 정의에 맞춰 순서대로 (postId, userId, title, content, category) 전달
      // 카테고리는 기존 값을 유지하거나 상수로 설정
      const rsp = await AxiosApi.updatePost(
        postId,
        loginUser.userId,
        title,
        content,
        post?.category || "FREE",
      );

      if (rsp.data === true || rsp.status === 200) {
        alert("게시글이 수정되었습니다.");
        navigate(`/boardDetail/${postId}`); // 수정 후 상세 페이지로 이동
      }
    } catch (e) {
      alert("수정 실패 (서버 오류)");
    }
  };

  if (!post)
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>로딩 중...</div>
    );

  return (
    <Container>
      <Title>게시글 수정</Title>

      <Label>제목</Label>
      <StyledInput
        type="text"
        placeholder="기존 게시물 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Label>내용</Label>
      <StyledTextarea
        placeholder="기존 게시물 내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <ButtonArea>
        <ColorButton cancel onClick={() => navigate(-1)}>
          취소
        </ColorButton>
        <ColorButton onClick={handleUpdate}>수정</ColorButton>
      </ButtonArea>
    </Container>
  );
};

export default BoardUpdate;
