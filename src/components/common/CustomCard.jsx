import React from 'react'
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

const StyledCard = styled(Card)`
    margin: 0.5em;
    & .card-title {
        font-weight: 700;
        font-size: 1.3em;
    }

    & a {
        font-weight: 600;
        text-decoration: none;
        color: #0f1317;
        transition: color 0.3s ease;

        &:hover {
            color: #0a58ca;
        }
    }
`;

const CustomCard = ({title, subTitle, innerText, href, hrefText, width, children}) => {
  return (
    <StyledCard style={{ width: width }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{subTitle}</Card.Subtitle>
        <Card.Text>
          {innerText}
        </Card.Text>
        {href ? <Card.Link href={href}>{hrefText}</Card.Link> : null}
        {children}
      </Card.Body>
    </StyledCard>
  )
}

export default CustomCard;
