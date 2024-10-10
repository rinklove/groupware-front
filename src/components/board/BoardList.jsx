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

  const moveToDetailPage = (id) => {

  }
  return (
    <StyledDiv width={width}>
      <h4>{title}</h4>
      <ListGroup>
        {
          data.length > 0 ?
          data.map((item) => 
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-center"
              action variant="light"
              key={item.id}
              onClick={() => moveToDetailPage(item.id)}
            >
              <div className="ms-2 me-auto fw-bold">
                {item.title}
              </div>
              <ItemDiv>
                <span className='fw-bolde'>{item.writer}</span>
                <span>{item.createdAt}</span>
                <Badge bg="primary" className='mx-3' pill>
                  조회수 {item.readCount}
                </Badge>
                {
                  item.commentCount ? 
                  <Badge bg="primary" className='mx-3' pill>
                    댓글 {item.commentCount}개
                  </Badge>
                  : null
                }
              </ItemDiv>
            </ListGroup.Item>
          ) :
          <ListGroup.Item
            className="d-flex justify-content-between align-items-center"
          >
            <span>{title}이 없습니다</span>
          </ListGroup.Item> 
        }
      </ListGroup>
    </StyledDiv>
  )
}

export default BoardList
