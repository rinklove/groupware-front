import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Badge, Form } from 'react-bootstrap';
import CustomButton from '../../common/CustomButton';
import styled from 'styled-components';
import { EMAIL_REGEX } from '../../../constants/auth';
import CourseSelect from './\bCourseSelect';
import { useCourseApi } from '../../hook/UseCourseApi';

const StyledContainer = styled(Container)`
  width: 80%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2em;

  & > form {
    min-height: 60vh;
  }
`;

const StyledRow = styled(Row)`
  margin: 1.5em 0;

  & > div {
    @media(max-width: 767px) {
      margin: 0.3em 0.3em;  
    }
  }

  &.emails-container {
    max-height: 30vh;
    overflow-y: auto;
    box-sizing: border-box;

    & > div {
      height: fit-content;
    }
  }
`;

const InviteForm = () => {
  const [course, setCourse] = useState([
    { id: 0, name: "코스를 선택해주세요" },
    { id: 1, name: "데브코스 백엔드 1기" },
    { id: 2, name: "데브코스 백엔드 2기" },
    { id: 3, name: "데브코스 프론트엔드 1기" },
    { id: 4, name: "데브코스 프론트엔드 2기" },
  ]);

  const [email, setEmail] = useState('');
  const [courseId, setCourseId] = useState(0);
  const [emails, setEmails] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true); // 첫 로드 여부
  const [isFetching, setFetching] = useState(false);
	
	const { fetchAllCourse, sendSignupForm } = useCourseApi();
	
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetchAllCourse();
        console.log(res);
        setCourse(res);
      } catch (e) {
        console.error(e);
      }
    };

  	fetchCourses();
  }, []);

	const changeCourse = (value) => {
    const selectedCourseId = parseInt(value, 10); // 문자열을 숫자로 변환
    if (!initialLoad && emails.length > 0 && courseId !== selectedCourseId) {
      const shouldClearEmails = window.confirm(
        '코스명을 바꾸면 기존에 추가했던 이메일은 사라집니다. 계속하시겠습니까?'
      );
      if (shouldClearEmails) {
        setEmails([]);
        setCourseId(selectedCourseId);
      }
    } else {
      setCourseId(selectedCourseId);
      setInitialLoad(false);
    }
  };

  const addEmails = () => {
    if (!isEmailRegex(email)) {
      alert('이메일 형식이 아닙니다.');
      return;
    }

    if (email && !emails.includes(email)) {
      setEmails([...emails, email]);
      setEmail('');
    }
  };

  const isEmailRegex = (email) => {
    return EMAIL_REGEX.test(email);
  };

  const deleteEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (courseId === 0) {
      alert('코스를 선택해주세요');
      return false;
    }
    if (isFetching) {
      alert('잠시만 기다려주세요.');
      return;
    }

    try {
      setFetching(true);
      const res = await sendSignupForm({courseId, emails});
      alert('회원가입 폼 전송 되었습니다.');
    } catch (e) {
      alert('회원가입 폼 전송 실패');
      console.error(e);
    } finally {
      setFetching(false);
    }
  };

  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit}>
        <StyledRow>
          <h5 className="fw-bold">이메일 추가</h5>
          <Col md={5} xl={4}>
						<CourseSelect
							courseId={courseId}
							course={course}
							onChange={changeCourse}
						/>
          </Col>
          <Col md={5} xl={5}>
            <Form.Control
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col md={2} xl={3}>
            <CustomButton
              variant="success"
              type="button"
              innerText="추가"
              color="#ffffff"
              onClick={addEmails}
              width="100%"
            />
          </Col>
        </StyledRow>
        <StyledRow className="mt-3 emails-container">
          <h5 className="fw-bold">추가한 이메일 목록</h5>
          {emails.map((e, index) => (
            <Col xs={12} md={6} xl={3} key={index} className="my-1">
              <span>
                {e}
                <Badge
                  bg="danger"
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => deleteEmail(index)}
                >
                  X
                </Badge>
              </span>
            </Col>
          ))}
        </StyledRow>
        <StyledRow>
          <Col xs={0} md={6} xl={9}></Col>
          <Col xs={12} md={6} xl={3}>
            <CustomButton
              variant="primary"
              type="submit"
              innerText="회원가입 폼 전송"
              color="#ffffff"
              width="100%"
            />
          </Col>
        </StyledRow>
      </Form>
    </StyledContainer>
  );
};

export default InviteForm;
