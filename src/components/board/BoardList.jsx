import React from 'react'
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const TitleDiv = styled.div`
  margin: auto;
`;

const StyledTitle = styled.span`
  width: 100%;
  font-size: 1.5em;
  font-weight: 700;
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const StyledDiv = styled.div`
  width: ${({ width }) => (width || '100%')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: auto;

  & > * {
    margin: 0.3em 0;
  }


  & > h5 {
    font-size: 1rem; /* 제목 크기 줄임 */
    font-weight: 600;
    margin: 0 0.5em;
    margin-bottom: 0.5em;
    padding: 0.3em 0.5em;
  }

  & tr:hover {
    cursor: pointer;
  }

  & th {
    font-size: 0.92rem; /* 테이블 셀 글자 크기 줄임 */
    text-align: center;
    padding: 1em;
    border-bottom: 2px solid #dee2e6; /* 하단 보더 */
  }

  & td {
    font-size: 0.92rem; /* 테이블 셀 글자 크기 줄임 */
    padding: 1em;
    border: none; /* 세로 보더 제거 */
    text-align: center;
  }

  & tr {
    border-bottom: 1px solid #dee2e6; /* 각 행의 하단 보더 */
  }

  /* 제목 셀에 대한 스타일 */
  .title-cell {
    max-width: 200px; /* 필요한 너비로 조정 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const BoardList = ({ data, width, title, children, isCourseBoard = false}) => {
  const navigate = useNavigate();

  const moveToInfoPage = (id) => {
    console.log(id);
    
    isCourseBoard ?
    //코스 board로 이동 
    navigate(`${ROUTES.COURSE}${ROUTES.BOARD}${ROUTES.INFO}`, { state: { id } })
    : 
    //팀 board로 이동
    console.log("팀 board로 이동")
  }

  return (
    <StyledDiv width={width}>
      <TitleDiv>
        <StyledTitle>{title}</StyledTitle>
      </TitleDiv>
      <ButtonDiv>
        {children}
      </ButtonDiv>
      <Table bordered hover size="sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
            <th>댓글 수</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} onClick={() => moveToInfoPage(item.id)}>
                  <td className="title-cell">{item.title}</td>
                  <td>{item.writer}</td>
                  <td>{item.createdAt}</td>
                  <td>
                    <Badge bg="primary" pill style={{ fontSize: '0.8rem' }}>
                      {item.readCount}
                    </Badge>
                  </td>
                  <td>
                    {item.commentCount ? (
                      <Badge bg="primary" pill style={{ fontSize: '0.8rem' }}>
                        {item.commentCount}개
                      </Badge>
                    ) : '0'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">게시글이 없습니다</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </StyledDiv>
  )
}

export default BoardList;
