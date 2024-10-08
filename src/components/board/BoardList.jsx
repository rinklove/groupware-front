import React from 'react'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: ${({width}) => ( width || '100%')};
  
  & > h4 {
    background-color: #66d9f4;
    margin: 0 0.5em;
    margin-bottom: 0.5em;
    padding: 0.3em 0.5em;
  }
`;

const ItemDiv = styled.div`
  & > span {
    margin: 0 0.3em;
  }
`;

const BoardList = ({data, width, title}) => {
  return (
    <StyledDiv width={width}>
      <h4>{title}</h4>
      <ListGroup>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-center"
          action variant="light"
        >
          <div className="ms-2 me-auto fw-bold">
            제목제목제목
          </div>
          <ItemDiv>
            <span className='fw-bolde'>작성자</span>
            <span>2024년 10월 8일 14:33</span>
            <Badge bg="primary" className='mx-3' pill>
              조회수 14
            </Badge>
          </ItemDiv>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
          action variant="light"
        >
          <div className="ms-2 me-auto fw-bold">
            제목제목제목
          </div>
          <ItemDiv>
            <span className='fw-bolde'>작성자</span>
            <span>2024년 10월 8일 14:33</span>
            <Badge bg="primary" className='mx-3' pill>
              조회수 14
            </Badge>
          </ItemDiv>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
          action variant="light"
        >
          <div className="ms-2 me-auto fw-bold">
            제목제목제목
          </div>
          <ItemDiv>
            <span className='fw-bolde'>작성자</span>
            <span>2024년 10월 8일 14:33</span>
            <Badge bg="primary" className='mx-3' pill>
              조회수 14
            </Badge>
          </ItemDiv>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
          action variant="light"
        >
          <div className="ms-2 me-auto fw-bold">
            제목제목제목
          </div>
          <ItemDiv>
            <span className='fw-bolde'>작성자</span>
            <span>2024년 10월 8일 14:33</span>
            <Badge bg="primary" className='mx-3' pill>
              조회수 14
            </Badge>
          </ItemDiv>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
          action variant="light"
        >
          <div className="ms-2 me-auto fw-bold">
            제목제목제목
          </div>
          <ItemDiv>
            <span className='fw-bolde'>작성자</span>
            <span>2024년 10월 8일 14:33</span>
            <Badge bg="primary" className='mx-3' pill>
              조회수 14
            </Badge>
          </ItemDiv>
        </ListGroup.Item>
      </ListGroup>
    </StyledDiv>
  )
}

export default BoardList
