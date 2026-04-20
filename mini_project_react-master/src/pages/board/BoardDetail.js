import { useState, useEffect, useContext } from "react";
import AxiosApi from "../../api/AxiosApi";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../context/UserStore";
import Comment from "./Comment";

const Container = styled.div`
  max-width: 1000px; /* 1. 박스 너비를 1000px 정도로 확 키웁니다 */
  margin: 50px auto;
  background: white;
  border-radius: 15px;
  padding: 50px; /* 2. 내부 여백도 늘려 가독성을 높입니다 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); /* 3. 그림자를 부드럽게 */
`;

const BackButton = styled.div`
  cursor: pointer;
  color: #666;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
  margin-bottom: 20px;
  h1 {
    font-size: 22px;
    margin: 0;
  }
  .author {
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
`;

const Content = styled.div`
  min-height: 250px;
  line-height: 1.6;
  font-size: 16px;
  color: #444;
  white-space: pre-wrap;
`;

const ActionArea = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

const RoundButton = styled.button`
  background: white;
  border: 1px solid #ddd;
  color: ${(props) => (props.del ? "#ff5a5f" : "#999")};
  padding: 6px 18px;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  &:hover {
    border-color: #ff5a5f;
    color: #ff5a5f;
  }
`;

const BoardDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const rsp = await AxiosApi.getPost(postId);
        // ★ 중요: 보내주신 JSON 구조에 맞춰 rsp.data.data를 가져옵니다.
        if (rsp.data && rsp.data.success) {
          setPost(rsp.data.data);
        }
      } catch (e) {
        console.log("데이터 로드 에러:", e);
      }
    };
    getPost();
  }, [postId]);

  const handleUpdate = () => {
    if (loginUser && post && String(loginUser.userId) === String(post.userId)) {
      navigate(`/boardUpdate/${postId}`);
    } else {
      alert("수정 권한이 없습니다.");
    }
  };

  const handleDelete = async () => {
    if (String(loginUser.userId) !== String(post.userId)) {
      alert("본인의 게시글만 삭제할 수 있습니다.");
      return;
    }

    if (window.confirm("정말 삭제하시겠습니까? (댓글도 함께 삭제됩니다)")) {
      try {
        // ★ 수정: AxiosApi 정의에 맞춰 loginUser.userId를 함께 전달
        const rsp = await AxiosApi.deletePost(postId, loginUser.userId);

        if (rsp.data === true || rsp.status === 200) {
          alert("삭제되었습니다.");
          navigate("/boards");
        }
      } catch (e) {
        // 만약 여전히 실패한다면 Java Entity 수정 후 '서버 재시작'을 안 했을 확률이 높음
        alert("삭제 실패! 백엔드에서 cascade 설정이 반영되었는지 확인하세요.");
      }
    }
  };

  if (!post)
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>로딩 중...</div>
    );

  console.log(
    "로그인유저 ID:",
    loginUser?.userId,
    "타입:",
    typeof loginUser?.userId,
  );
  console.log("게시글작성자 ID:", post?.userId, "타입:", typeof post?.userId);

  return (
    <Container>
      {/* 1. "자유게시판 > 님의 게시글" 등 파란 박스 영역을 지우고 시안처럼 "목록으로"만 남김 */}
      <BackButton onClick={() => navigate(-1)}>← 목록으로</BackButton>

      <Header>
        {/* 2. 글 제목과 작성자 아이디를 한 줄에 배치 */}
        <h1>{post.title}</h1>
        <span className="author">{post.userName || post.userId}</span>
      </Header>

      {/* 3. 본문 영역 확대 체감 */}
      <Content>{post.content}</Content>

      <div
        style={{
          color: "#bbb",
          fontSize: "13px",
          textAlign: "right",
          marginBottom: "30px",
        }}
      >
        작성일: {new Date(post.createdAt).toLocaleDateString()}
      </div>

      {/* 본인 확인 조건 (String으로 타입 강제 통일) */}
      {loginUser &&
        post &&
        String(loginUser.userId) === String(post.userId) && (
          <ActionArea>
            <RoundButton onClick={handleUpdate}>수정</RoundButton>
            <RoundButton del onClick={handleDelete}>
              삭제
            </RoundButton>
          </ActionArea>
        )}

      <Comment postId={postId} />
    </Container>
  );
};

export default BoardDetail;
