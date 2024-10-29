import React, { useEffect, useState } from 'react'
import BoardList from '../../../components/board/BoardList';
import useBoardApi from '../../../components/hook/UseBoardApi';
import PagingContainer from '../../../components/board/PagingContainer';
import CustomButton from '../../../components/common/CustomButton';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import styled from 'styled-components';

const ContentWrapper = styled.div`

  & > div:first-child {
    padding: 2em;
  }
`;

const CourseNoticeBoardListPage = ({isAdmin}) => {
  const [boards, setBoards] = useState([])
  const [boardId, setBoardId] = useState(null);
  const [pages, setPages] = useState([]);
  const { getCourseNotice, getCourseNoticePaging } = useBoardApi();
  const navigate = useNavigate()

  const getPagingData = async () => {
    try {
      const res = await getCourseNoticePaging();
      setPages(res);  // 받아온 데이터를 상태에 저장
      console.log(res);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  }

  useEffect(() => {
    getPagingData();
  }, [])

  const getFetchData = async () => {
    try {
      const res = await getCourseNotice(boardId);
      setBoards(res);  // 받아온 데이터를 상태에 저장
      console.log(res);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    getFetchData();
  }, [boardId]);

  const changePage = (e) => {
    console.log(e);
    setBoardId(e)
  }

  const moveToNoticeForm = () => {
    navigate(`${ROUTES.WRITE}`)
  }

  return (
    <ContentWrapper>
      <BoardList
        data={boards}
        title='코스 공지사항 리스트'
        width='80%'
        isCourseBoard={true}
      >
        {
          isAdmin &&
          <CustomButton
            variant='primary'
            type='button' // 'submit'으로 두면 onSubmit에서 처리됨
            innerText='공지사항 작성하기'
            color='#ffffff'
            width='fit-content'
            onClick={moveToNoticeForm}
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

export default CourseNoticeBoardListPage
