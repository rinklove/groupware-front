import React from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

const StyledButton = styled(Button)`
    text-decoration: none;
    color: ${({ variant }) => (variant === 'primary' ? '#ffffff' : '#0f1317')};
    font-family: 'Noto Sans KR';
    font-weight: 500;
    width: ${({ width }) => width || 'auto'}; // width prop을 기반으로 설정
`;

const CustomButton = ({variant, href, innerText, onClick, type, width}) => {
    return href ? (
        <StyledButton 
            variant={variant}
            href={href} 
            onClick={onClick}
            type={type}
            width={width}
        >
          {innerText}
        </StyledButton>
      ) : (
        <StyledButton 
            variant={variant}
            onClick={onClick}
            type={type}
            width={width}
        >
          {innerText}
        </StyledButton>
      );
}

export default CustomButton
