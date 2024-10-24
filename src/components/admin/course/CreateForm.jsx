import React, { useState } from 'react'
import { Form, Table } from 'react-bootstrap';
import styled from 'styled-components';
import CustomInput from '../../common/CustomInput';
import CustomButton from '../../common/CustomButton';
import { STATUS } from '../../../constants/errorCode';
import { useCourseApi } from '../../hook/UseCourseApi';

const FormContainer = styled.div`
  margin: auto;
  width: 100%;
`;

const StyledCustomButton = styled(CustomButton)`
    border: none; /* 테두리 없애기 */
`;
const CreateForm = () => {
  const [courseName, setCourseName] = useState('');
  const [isFetching, setFatching] = useState(false);
	const { addCourse } = useCourseApi()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isFetching) {
        alert('잠시만 기다려주세요.');
        return;
    }
    try{
        setFatching(true);

        const data = {
            "name": courseName
        }
        const res = await addCourse(data); 
        alert('코스 등록 성공');
        setCourseName('');
    } catch (e) {
        alert('코스 동록 실패');
        console.error(e);
    } finally {
        setFatching(false);
    }
  }

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
            <Table borderless>
                <tbody>
                    <tr>
                        <td valign='middle' align='center'>코스명</td>
                        <td>
                            <CustomInput
                                id='username'
                                type='text'
                                placeholder='코스명을 입력하세요'
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <StyledCustomButton
                                variant='primary'
                                type='submit' // 'submit'으로 두면 onSubmit에서 처리됨
                                innerText='코스 등록'
                                color='#ffffff'
                                width='100%'
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Form>
    </FormContainer>
  )
}

export default CreateForm
