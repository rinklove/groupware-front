import React from 'react'
import logo from '../../../images/icon.png'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes'

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 1em;

    & > * {
        margin: 0.1em;
    }

    &:hover {
        cursor: pointer;
    }
`;

const AppNameSpan = styled.span`
    font-size: 1.1em;
    font-weight: 600;
`;

const Logo = () => {
    const navigate = useNavigate();
  return (
    <LogoContainer onClick={() => navigate(ROUTES.HOME)}>
        <img 
            src={logo}
            width={50}
            alt='dev-ware'
        />
        <AppNameSpan>
            Dev-ware
        </AppNameSpan>
    </LogoContainer>
  )
}

export default Logo
