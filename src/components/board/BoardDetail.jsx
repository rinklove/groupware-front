import { Button } from "react-bootstrap";
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

  & img {
    width: 100%;
    height: auto; /* 비율 유지 */
    object-fit: contain; /* 비율을 유지하며 이미지가 잘리지 않도록 설정 */
  }
`;

const BoardDetail = ({ data }) => {
  return (
    <ContentWrapper>
      <div>
        <h3>{data?.title}</h3>
        <span>{data?.createdAt}</span>
        <span>작성자 {data?.writer}</span>
        <div>
          조회수 {data?.readCount}
        </div>
        {
          (data?.isAdmin || data?.isMine) && 
          <>
            <Button
              variant='link'
            >
              게시글 수정
            </Button>
            <Button
              variant='link'
            >
              게시글 삭제
            </Button> 
          </>
        }
      </div>
      <hr/>
      <ContentDiv dangerouslySetInnerHTML={{ __html: data?.content }} />
    </ContentWrapper>
  );
};

export default BoardDetail;