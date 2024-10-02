import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';
import { login } from '../../api/auth';
import styled from 'styled-components';

const FormContainer = styled.div`
    margin: auto;
    margin-top: 6em;
    width: 30vw;

    & > h3 {
        font-weight: 600;
        text-align: center;
        margin-bottom: 1em;
    }
`;

const StyledCustomButton = styled(CustomButton)`
    border: none; /* 테두리 없애기 */
`;

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // 기본 폼 제출 이벤트 방지
        login({ username, password });
    };

    return (
        <FormContainer>
            <h3>로그인</h3>
            <Form onSubmit={handleSubmit}>
                <Table borderless>
                    <tbody>
                        <tr>
                            <td>아이디</td>
                            <td>
                                <CustomInput
                                    id='username'
                                    type='text'
                                    placeholder='아이디를 입력하세요'
                                    isShow={false}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td>
                                <CustomInput
                                    id='password'
                                    type='password'
                                    placeholder='비밀번호를 입력하세요'
                                    isShow={false}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <StyledCustomButton
                                    variant='primary'
                                    type='submit' // 'submit'으로 두면 onSubmit에서 처리됨
                                    innerText='로그인'
                                    width='100%'
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Form>
        </FormContainer>
    );
};

export default LoginForm;
