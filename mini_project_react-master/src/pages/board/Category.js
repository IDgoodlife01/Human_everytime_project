import styled from "styled-components";

const Container = styled.div`
  padding: 40px;
  text-align: center;
  color: #555;
`;

const Title = styled.h2`
  margin-bottom: 16px;
`;

const Notice = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  background: rgba(255, 255, 255, 0.7);
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  margin: 0 auto;
`;

/**
 * 카테고리 페이지
 *
 * mini_project_base에는 별도 카테고리 API가 없습니다.
 * 게시글 카테고리는 BoardWrite에서 직접 선택하는 방식을 사용합니다.
 *
 * 조별 커스텀이 필요한 경우:
 * - 백엔드에 카테고리 Entity/API 추가
 * - AxiosApi.js에 카테고리 관련 함수 추가
 * - 이 컴포넌트에 CateTemplate, CateList, CateInsert 활용
 */
const Category = () => {
  return (
    <Container>
      <Title>📂 카테고리 관리</Title>
      <Notice>
        mini_project_base에서는 게시글 작성 시<br />
        카테고리를 직접 선택하는 방식을 사용합니다.
        <br />
        <br />
        별도 카테고리 관리가 필요한 경우
        <br />
        백엔드에 Category Entity/API를 추가하고
        <br />이 페이지를 수정하세요.
      </Notice>
    </Container>
  );
};

export default Category;
