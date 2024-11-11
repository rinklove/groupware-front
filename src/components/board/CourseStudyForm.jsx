import React, { useState } from 'react';
import { BoardContentEditor } from '../common/BoardContentEditor';
import CustomInput from '../common/CustomInput';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import CustomButton from '../common/CustomButton';
import useBoardApi from '../hook/UseBoardApi';
import { COURSE } from '../../constants/belonging';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useCourse } from '../hook/UseCourse';

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

const CourseStudyForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageStyles, setImageStyles] = useState({}); // 이미지 크기 상태 추가
  const { writeCourseStudyBoard } = useBoardApi();
  const {courseId} = useCourse();
  const [isFetching, setIsFetching] = useState(false)
  const navigate = useNavigate();


  const handleEditorChange = (data) => {
    setContent(data);

    // 정규 표현식을 통해 모든 이미지 src를 찾고, 각 이미지에 대해 크기 업데이트
    const imgMatches = [...data.matchAll(/<img[^>]+src="([^">]+)"[^>]*style="([^"]*)"/g)];
    const newImageStyles = {};

    imgMatches.forEach((match) => {
      const imgSrc = match[1];
      const imgStyle = match[2]; // 기존 스타일 가져오기
      const widthMatch = imgStyle.match(/width:\s*(\d+)px/); // width 가져오기

      // 이미지 크기를 px 단위로 설정
      const width = widthMatch ? `${widthMatch[1]}px` : '100%'; // 기본적으로 100%로 설정
      
      newImageStyles[imgSrc] = {
        width,
      };
    });

    setImageStyles(newImageStyles);
  };

  const uploadBStudyBoard = async (e) => {
    e.preventDefault();

    if(isFetching) {
      alert('잠시만 기다려주세요')
      return
    }
    
    setIsFetching(true)

    try {
      const data = {
        "courseId": courseId,
        title,
        content,
        "isNotice": false
      }
      
      const { value } = await writeCourseStudyBoard(data);
      console.log(value);
      
      alert(value);
      navigate(`${ROUTES.COURSE}${ROUTES.STUDY}${ROUTES.LIST}`)
    } catch (e) {
      alert('게시글 작성 실패')
      console.error(e); 
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <StyledForm>
      <div>
        <h4>스터디 모집글 작성</h4>
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
        <BoardContentEditor
          onChange={handleEditorChange}
        />
        {/* 각 이미지에 대한 스타일 적용 */}
        {Object.keys(imageStyles).length > 0 && (
          <div style={{ display: 'none' }}>
            {Object.keys(imageStyles).map(src => (
              <img key={src} src={src} style={imageStyles[src]} alt="" />
            ))}
          </div>
        )}
      </Form.Group>
      <Form.Group className='mb-3'>
        <CustomButton
          variant='primary'
          type='submit' // 'submit'으로 두면 onSubmit에서 처리됨
          innerText='게시글 작성'
          color='#ffffff'
          width='fit-content'
          onClick={uploadBStudyBoard}
        />
      </Form.Group>
    </StyledForm>
  );
};

export default CourseStudyForm;
