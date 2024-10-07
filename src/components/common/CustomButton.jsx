import React from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

const StyledButton = styled(Button)`
    text-decoration: none;
    color: ${({ color }) => (color || '#0f1317')};
    font-family: 'Noto Sans KR';
    font-weight: 500;
    width: ${({ width }) => width || 'auto'}; // width prop을 기반으로 설정
`;

const CustomButton = ({variant, href, innerText, onClick, type, width, color}) => {
    return href ? (
        <StyledButton 
            variant={variant}
            href={href} 
            onClick={onClick}
            type={type}
            width={width}
            color={color}
        >
          {innerText}
        </StyledButton>
      ) : (
        <StyledButton 
            variant={variant}
            onClick={onClick}
            type={type}
            width={width}
            color={color}
        >
          {innerText}
        </StyledButton>
      );
}

export default CustomButton
