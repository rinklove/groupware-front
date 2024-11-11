import React, { useEffect, useState } from 'react'
import useCategoryApi from '../hook/UseCategoryApi';
import { Button, Form, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { useTeam } from '../hook/UseTeam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faGear, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ContentWrapper = styled.div`
  width: 20%;
  
  & > div:first-child {
    display: flex;
    align-items: center;
    & > h6 {
      font-weight: 700;
      vertical-align: middle;
    }
  }
`

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;
  
  & > span {
    font-weight: 700;
    margin-right: 0.5em;
  }
`

const CategoryList = ({ clickCategory }) => {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const { 
      getCategoryByTeamId, 
      addCategory, 
      deleteCategory
  } = useCategoryApi();
  const { teamId } = useTeam();

  const fetchData = async () => {
    try {
      const res = await getCategoryByTeamId(teamId);
      setCategories(res);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (teamId) {
      fetchData();
    }
  }, [teamId]);

  const showCategoryForm = () => {
    setEditMode(!editMode);
  }

  const handleAddCategory = async () => {
    if (name.trim()) {
      try {
        const res = await addCategory({teamId, name});
        alert(res.value)
        setName('');
        fetchData(); // Refresh category list
      } catch ({data}) {
        alert(data.message)
      }
    }
  }

  const handleDeleteCategory = async (id) => {
    try {
      const res = await deleteCategory({teamId, "categoryId": id});
      alert(res.value)
      fetchData(); 
    } catch ({data}) {
      alert(data.message)
    }
  }

  return (
    <ContentWrapper>
      <TitleDiv>
        <span>카테고리</span>
        <FontAwesomeIcon
          icon={faGear}
          onClick={showCategoryForm}
          style={{ cursor: 'pointer' }}
        />
      </TitleDiv>
      {
        categories.length > 0 ? 
        categories.map(category => (
          <div key={category.id}>
            <Button
              variant="link"
              onClick={() => clickCategory(category.id)}
              style={{ display: 'inline-block', marginRight: '0.5em' }}
            >
              {category.name} ({category.boardCount})
            </Button>
            {editMode && (
              <>
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ cursor: 'pointer', color: 'red' }}
                  onClick={() => handleDeleteCategory(category.id)}
                />
              </>
            )}
          </div>
        ))
        :
        <span>카테고리가 없습니다.</span>
      }
      {editMode && (
        <InputGroup className="mt-3">
          <Form.Control
            placeholder="새 카테고리 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={handleAddCategory} variant="outline-primary">
            <FontAwesomeIcon icon={faCirclePlus} />
          </Button>
        </InputGroup>
      )}
    </ContentWrapper>
  )
}

export default CategoryList;
