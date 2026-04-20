import styled from "styled-components";
import CateListItem from "./CateListItem";

const CateListItemContainer = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto; // 지정한 높이를 초과할 때 수직 스크롤바 생김
`;

const CateList = ({ cates, onRemove }) => {
  return (
    <CateListItemContainer>
      {cates &&
        cates.map((cate) => (
          <CateListItem cate={cate} key={cate.id} onRemove={onRemove} />
        ))}
    </CateListItemContainer>
  );
};
export default CateList;
