import styled from "styled-components";

const ContentWrapper = styled.div`
  margin-top: 3em;
  box-sizing: border-box;


  & > hr {
    margin-bottom: 5em;
  }
  & > div {
    margin: 0.5em;

    &:first-child {

      & > h3 {
        font-weight: 600;
      }
      & > span {
        margin-right: 1.5em;
      }
    }
  }
`;

const ContentDiv = styled.div`
  margin-bottom: 5em;
`;

const BoardDetail = ({ data }) => {
  return (
    <ContentWrapper>
      <div>
        <h3>{data.title}</h3>
        <span>{data.createdAt}</span>
        <span>작성자 {data.writer}</span>
      </div>
      <hr/>
      <ContentDiv dangerouslySetInnerHTML={{ __html: data.content }} />
    </ContentWrapper>
  );
};

export default BoardDetail;