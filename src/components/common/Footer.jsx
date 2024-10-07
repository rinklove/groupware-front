import React from 'react'
import styled from 'styled-components'
import CustomInput from './CustomInput';
import { BASIC_ROUTE, ROUTES } from '../../constants/routes';
import CustomButton from './CustomButton';

const StyledFooter = styled.footer`
    background-color: #0f1317;
    width: 100%;
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & span {
        font-size: 1.5em;
        color: #ffffff;
        margin: 0.3em 0.5em;
    }
`;
const Footer = () => {
  return (
    <StyledFooter>
      {/* <CustomButton
        variant='link'
        href={`${BASIC_ROUTE}${ROUTES.ADMIN}${ROUTES.ADMIN_MAIN}`}
        innerText='관리자용 페이지'
        color='#ffffff'
      /> */}
    </StyledFooter>
  )
}

export default Footer
