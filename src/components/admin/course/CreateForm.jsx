import React, { useState } from 'react'
import { Form, Table } from 'react-bootstrap';
import styled from 'styled-components';
import CustomInput from '../../common/CustomInput';
import CustomButton from '../../common/CustomButton';

const FormContainer = styled.div`
  margin: auto;
  width: 100%;
`;

const StyledCustomButton = styled(CustomButton)`
    border: none; /* 테두리 없애기 */
`;
const CreateForm = () => {
  const [courseName, setCourseName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
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
