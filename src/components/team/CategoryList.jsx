import React, { useEffect, useState } from 'react'
import useCategoryApi from '../hook/UseCategoryApi';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useTeam } from '../hook/UseTeam';

const ContentWrapper = styled.div`
  width: 20%;

  & > h6 {
    font-weight: 700;
  }
`

const CategoryList = ({clickCategory}) => {
  const [categories, setCategories] = useState([])
  const { getCategoryByTeamId } = useCategoryApi();
  const { teamId } = useTeam()

  const fetchData = async () => {
    try {
      const res = await getCategoryByTeamId(teamId);
      setCategories(res)
      
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if(teamId) {
      fetchData()
    }
  }, [teamId])

  

  return (
    <ContentWrapper>
      <h6>카테고리</h6>
      {
        categories.length > 0 ?
        categories.map(category => 
          <Button
            key={category.id}
            variant="link"
            onClick={clickCategory(category.id)}
          >
            {category.name} `(${category.boardCount})`
          </Button>
        )
        :
        <span>카테고리가 없습니다.</span>
      }
    </ContentWrapper>
  )
}

export default CategoryList
