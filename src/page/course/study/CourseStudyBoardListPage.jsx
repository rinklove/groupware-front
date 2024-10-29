import React, { useEffect, useState } from 'react'
import BoardList from '../../../components/board/BoardList'
import PagingContainer from '../../../components/board/PagingContainer'
import useBoardApi from '../../../components/hook/UseBoardApi'
import styled from 'styled-components'
import CustomButton from '../../../components/common/CustomButton'
import { ROUTES } from '../../../constants/routes'
import { useNavigate } from 'react-router-dom'

const ContentWrapper = styled.div`

  & > div:first-child {
    padding: 2em;
  }
`;

const CourseStudyBoardListPage = ({ isAdmin }) => {
  const [boards, setBoards] = useState([])
  const [boardId, setBoardId] = useState(null);
  const [pages, setPages] = useState([]);
  const { getCourseStudy, getCourseStudyPaging } = useBoardApi();
  const navigate = useNavigate()

  const getBoardData = async () => {
    try {
      const res = await getCourseStudy(boardId);
      setBoards(res);  // 받아온 데이터를 상태에 저장
      console.log(res);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  const getPagingData = async () => {
    try {
      const res = await getCourseStudyPaging();
      setPages(res);  // 받아온 데이터를 상태에 저장
      console.log(`페이징 데이터 = `,res);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  }

  const changePage = (e) => {
    console.log(e);
    setBoardId(e)
  }

  useEffect(() => {
    getPagingData();
  }, [])

  useEffect(() => {
    getBoardData();
  }, [boardId]);

  const moveToStudyForm = () => {
    navigate(`${ROUTES.COURSE}${ROUTES.STUDY}${ROUTES.WRITE}`)
  }

  return (
    <ContentWrapper>
      <BoardList 
        data={boards}
        title='코스 스터디글 리스트'
        width='80%'
        isCourseBoard={true}
        >
          {
            !isAdmin &&
            <CustomButton
              variant='primary'
              type='button' // 'submit'으로 두면 onSubmit에서 처리됨
              innerText='게시글 작성하기'
              color='#ffffff'
              width='fit-content'
              onClick={moveToStudyForm}
            />
          }
        </BoardList>
      <PagingContainer
        pages={pages}
        changePage={changePage}
        currentPage={boardId}
      />
    </ContentWrapper>
  )
}

export default CourseStudyBoardListPage;
