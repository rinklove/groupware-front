import React, { useEffect, useState } from 'react'
import CustomInput from '../common/CustomInput'
import { Table } from 'react-bootstrap'
import { Form } from 'react-bootstrap'; 
import styled from 'styled-components';
import { 
    PASSWORD_CONSTRAINTS 
} from '../../constants/SignupConstraints';
import CustomButton from '../common/CustomButton';
import { getMyPage } from '../../api/auth';

const FormContainer = styled.div`
    margin: auto;
    margin-top: 10em;
    width: 40vw;

    & > h3 {
        font-weight: 600;
        text-align: center;
        margin-bottom: 1em;
    }
`;

const StyledCustomButton = styled(CustomButton)`
    border: none; /* 테두리 없애기 */
`;


const EditForm = () => {
    const [courseName, setCourseName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const getUserData = async () => {
            try {
                const {result} = await getMyPage();
                setCourseName(result.courseName);
                setUsername(result.username);
                setName(result.name);
                setEmail(result.email);
            } catch (e) {
                console.error(e);
            }
        }

        getUserData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); // 기본 폼 제출 이벤트 방지
    };

  return (
    <FormContainer>
        <h3>회원 정보 수정</h3>
        <Form onSubmit={handleSubmit}>
            <Table borderless>
                <tbody>
                    <tr>
                        <td valign='middle' align='center'>진행중인 코스</td>
                        <td>
                            <CustomInput
                                id='courseName'
                                type='text'
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                                disabled={true}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td valign='middle' align='center'>아이디</td>
                        <td>
                            <CustomInput
                                id='username'
                                type='text'
                                placeholder='아이디를 입력하세요'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td valign='middle' align='center'>이름</td>
                        <td>
                            <CustomInput
                                id='name'
                                type='text'
                                isShow={false}
                                placeholder='이름을 입력하세요'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td valign='middle' align='center'>이메일</td>
                        <td>
                            <CustomInput
                                id='email'
                                type='email'
                                isShow={false}
                                placeholder='이메일을 입력하세요'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <StyledCustomButton
                                variant='primary'
                                type='submit' // 'submit'으로 두면 onSubmit에서 처리됨
                                innerText='회원정보 수정'
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

export default EditForm
