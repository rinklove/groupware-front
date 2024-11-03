import React, { useEffect, useState } from 'react'
import BoardList from '../../../components/board/BoardList'
import PagingContainer from '../../../components/board/PagingContainer'
import CategoryList from '../../../components/team/CategoryList'
import useBoardApi from '../../../components/hook/UseBoardApi'
import styled from 'styled-components'
import CustomButton from '../../../components/common/CustomButton'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import { useTeam } from '../../../components/hook/UseTeam'

const ContentWrapper = styled.div`
  min-height: 60vh;

  & > div {
    margin-top: 1em;
    margin: 0 0.5em;
    box-sizing: border-box;
    padding: 1em;
  }
`

const BoardDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const TeamBoardListPage = () => {
  const { teamId } = useTeam()
  const [boards, setBoards] = useState([]);
  const [boardId, setBoardId] = useState(null);
  const [categoryId, setCategoryId] = useState(null)
  const [pages, setPages] = useState([]);
  const {getTeamBoard, getTeamBoardPaging} = useBoardApi();
  const navigate = useNavigate()

  const fetchBoardData = async () => {
    console.log(`teamId = ${teamId}`);
    const res = await getTeamBoard(teamId, categoryId, boardId);
    setBoards(res);
  }

  const clickCategory = (id) => {
    setCategoryId(id)
  }

  const fetchPagingData = async () => {
    const res = await getTeamBoardPaging(teamId, categoryId)
    setPages(res)
  }

  const changePage = (e) => {
    console.log(e);
    setBoardId(e);
  };
  
  useEffect(() => {
    if(teamId) {
      fetchBoardData()
      fetchPagingData()
    }
  }, [teamId, boardId, categoryId]);

  const moveToWriteForm = () => {
    navigate(`${ROUTES.TEAM}${ROUTES.BOARD}${ROUTES.WRITE}`, { state: { teamId } });
  }

  return (
    <ContentWrapper>
      <BoardDiv>
        <BoardList
          data={boards} 
          width='70%' 
          title='팀 게시글 목록'
        >
          <CustomButton
            variant='primary'
            type='button'
            innerText='게시글 작성하기'
            color='#ffffff'
            width='fit-content'
            onClick={moveToWriteForm}
          />
        </BoardList>
        <div className="vr mx-2" />
        <CategoryList
          teamId={teamId}
          clickCategory={clickCategory}
        />
      </BoardDiv>
      <div>
        <PagingContainer
          pages={pages}
          changePage={changePage}
          currentPage={boardId}
        />
      </div>
    </ContentWrapper>
  )
}

export default TeamBoardListPage
