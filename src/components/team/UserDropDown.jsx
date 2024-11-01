import React, { useState, forwardRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const ButtonDiv = styled.div`
  & > * {
    margin: 0.3em;
  }
`;

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <a
    href="#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick?.(e);
    }}
  >
    {children} &#x25bc;
  </a>
));

const CustomMenu = forwardRef(({ children, style, className, 'aria-labelledby': labeledBy, value, onSearchChange }, ref) => (
  <div 
    ref={ref} 
    style={{ 
      ...style, 
      overflow: 'auto', 
      maxHeight: '200px', 
    }} 
    className={className} 
    aria-labelledby={labeledBy}
  >
    <Form.Control
      autoFocus
      className="mx-3 my-2 w-75"
      placeholder="이름을 입력하새요."
      onChange={(e) => onSearchChange(e.target.value)} // handleSearchChange 호출
      value={value}
    />
    <ul className="list-unstyled">
      {React.Children.toArray(children).filter((child) => 
        child.props.children[0].includes(value) // 한글 포함 여부 체크
      )}
    </ul>
  </div>
));

const UserDropdown = ({ users, selectLeader, selectMember }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const filteredUsers = searchTerm === ''
    ? users // 검색어가 없으면 전체 사용자 목록 표시
    : users.filter(user => user.name.includes(searchTerm)); // 검색어로 필터링

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        수강생 검색하기
      </Dropdown.Toggle>
      <Dropdown.Menu 
        as={CustomMenu} 
        onSearchChange={handleSearchChange} 
        value={searchTerm}
        className='w-100'
      >
        {filteredUsers.length > 0 ? 
          filteredUsers.map(user => (
            <Dropdown.Item
              key={user.id}
              eventKey={user.id}
              className="d-flex justify-content-between align-items-center"
            >
              {user.name}
              <ButtonDiv>
                <Button 
                  variant="primary"
                  size="sm"
                  onClick={() => selectLeader(user)}
                >
                  팀장칸으로 이동
                </Button>
                <Button 
                  variant="success"
                  size="sm"
                  onClick={() => selectMember(user)}
                >
                  팀원칸으로 이동
                </Button>
              </ButtonDiv>
            </Dropdown.Item>
          ))
        :
          <Dropdown.Item disabled>
            수강생이 없습니다.
          </Dropdown.Item>
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;
