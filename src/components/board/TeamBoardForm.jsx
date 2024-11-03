import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import CustomButton from '../common/CustomButton';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../common/CustomInput';
import { BoardContentEditor } from '../common/BoardContentEditor';
import useCategoryApi from '../hook/UseCategoryApi';
import useBoardApi from '../hook/UseBoardApi';
import { ROUTES } from '../../constants/routes';
import { useTeam } from '../hook/UseTeam';

const TeamBoardForm = () => {
  const { teamId } = useTeam()
  const [categories, setCategories] = useState([{"id": null, name: "전체"}])
  const [categoryId, setCategoryId] = useState();
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageStyles, setImageStyles] = useState({}); // 이미지 크기 상태 추가
  const [isFetching, setIsFetching] = useState(false)
  const navigate = useNavigate();
  const { getCategoryByTeamId } = useCategoryApi();
  const { writeTeamBoard } = useBoardApi()

  const fetchCategoryData = async () => {    
    const res = await getCategoryByTeamId(teamId);
    setCategories([...categories, ...res])
  }
  
  useEffect(() => {
    if (teamId) {
      fetchCategoryData()
    }
  }, [teamId]);
  


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

  const uploadBTeamBoard = async (e) => {
    e.preventDefault()

    if(!title) {
      alert('제목을 입력해주세요')
      return
    }

    if(!content) {
      alert('내용을 입력해주세요')
      return
    }

    if(isFetching) {
      alert(`잠시만 기다려주세요`)
      return;
    }

    try {
      setIsFetching(true)
      const data = getData();
      const {value} = await writeTeamBoard(data)
      alert(value)
      navigate(`${ROUTES.TEAM}${ROUTES.BOARD}${ROUTES.LIST}`)
    } catch (e) {
      alert('게시글 작성 실패')
      console.error(e);
    } finally {
      setIsFetching(false)
    }


  }

  const getData = () => {
   return {
      teamId,
      categoryId,
      title,
      content,
      "isNotice": false
    }    
  }

  return (
    <Form>
      <div>
        <h4>팀 게시글 작성</h4>
      </div>
      <Form.Group className="mb-3">
        <Form.Label>카테고리</Form.Label>
        <Form.Select
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {
            categories.map(category => 
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            )
          }
        </Form.Select>
      </Form.Group>
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
          onClick={uploadBTeamBoard}
        />
      </Form.Group>
    </Form>
  )
}

export default TeamBoardForm
