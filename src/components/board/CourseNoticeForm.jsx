import React, { useState } from 'react';
import { BoardContentEditor } from '../common/BoardContentEditor';
import CustomInput from '../common/CustomInput';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import CustomButton from '../common/CustomButton';
import useBoardApi from '../hook/UseBoardApi';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useCourse } from '../hook/UseCourse';

// 스타일 수정
const StyledForm = styled(Form)`
  margin: auto;
  width: 70%;
  padding: 2em;
  box-sizing: border-box;

  & label {
    font-size: 1.1em;
    font-weight: 700;
  }

  & input[type=text] {
    width: 100%;
    min-width: 500px;
    max-width: 100vw; /* 또는 적절한 % 값으로 설정 */
  }

  & > div:nth-child(4) {
    width: 100%;
    min-width: 500px;
    display: flex;
    justify-content: flex-end;

    & > button {
      padding: 0.5em;
      box-sizing: border-box;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 500px; /* 너비를 픽셀로 설정 */
  height: auto; /* 높이는 자동으로 설정 */
  margin: 0 auto; /* 가운데 정렬 */
  overflow: hidden; /* 이미지가 넘치는 경우 숨김 처리 */

  img {
    width: 100%; /* 부모 요소에 맞춰 너비 조정 */
    height: auto; /* 비율 유지 */
    object-fit: contain; /* 비율을 유지하며 이미지가 잘리지 않도록 설정 */
  }
`;

const CourseNoticeForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageStyles, setImageStyles] = useState({});
  const { writeCourseStudyBoard } = useBoardApi();
  const { courseId } = useCourse();
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  const handleEditorChange = (data) => {
    setContent(data);

    const imgMatches = [...data.matchAll(/<img[^>]+src="([^">]+)"[^>]*style="([^"]*)"/g)];
    const newImageStyles = {};

    imgMatches.forEach((match) => {
      const imgSrc = match[1];
      newImageStyles[imgSrc] = true; // 단순히 존재만 체크
    });

    setImageStyles(newImageStyles);
  };

  const uploadBStudyBoard = async (e) => {
    e.preventDefault();

    if (isFetching) {
      alert('잠시만 기다려주세요');
      return;
    }

    setIsFetching(true);

    try {
      const data = {
        courseId,
        title,
        content,
        isNotice: true,
      };

      const { value } = await writeCourseStudyBoard(data);

      alert(value);
      navigate(`${ROUTES.COURSE}${ROUTES.NOTICE}${ROUTES.LIST}`);
    } catch (e) {
      alert('게시글 작성 실패');
      console.error(e);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <StyledForm>
      <div>
        <h4>공지사항 작성</h4>
      </div>
      <Form.Group className="mb-3">
        <Form.Label htmlFor='title'>제목</Form.Label>
        <CustomInput
          id='title'
          type='text'
          placeholder='제목을 입력하세요'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>내용</Form.Label>
        <BoardContentEditor onChange={handleEditorChange} />
        {/* 각 이미지에 대한 스타일 적용 */}
        {Object.keys(imageStyles).length > 0 && (
          <div style={{ display: 'none' }}>
            {Object.keys(imageStyles).map(src => (
              <ImageWrapper key={src}>
                <img src={src} alt="" />
              </ImageWrapper>
            ))}
          </div>
        )}
      </Form.Group>
      <Form.Group className='mb-3'>
        <CustomButton
          variant='primary'
          type='submit'
          innerText='공지사항 작성'
          color='#ffffff'
          width='fit-content'
          onClick={uploadBStudyBoard}
        />
      </Form.Group>
    </StyledForm>
  );
};

export default CourseNoticeForm;
