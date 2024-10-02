import React from 'react';
import styled from 'styled-components';
import background from '../../images/background-home1.png';

const StyledDiv = styled.div`
    background-image: url(${background}); 
    background-size: cover; 
    background-position: center; 
    width: 100%; 
    height: 60vh; 
    display: flex;
    justify-content: space-around;
    align-items: center;

    
    & > div:first-child {
        display: flex;
        flex-direction: column;

        & > span {
            font-size: 3em;
            font-weight: 700;
        }
    }
`;

const HomeContainer = () => {
  return (
    <StyledDiv>
        <div>
            <span>나와 같이 교육을 듣는 사람들과</span>
            <span>자유롭게 소통해보세요!</span>
        </div>
        <div>
            
        </div>
    </StyledDiv>
  );
};

export default HomeContainer;
