import React from 'react'
import { Card } from 'react-bootstrap'

const TeamCard = ({variant, data, onClick}) => {
  return (
    <Card
      bg={variant.toLowerCase()}
      key={variant}
      text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
      style={{ width: '16rem' }}
      className="mb-2"
    >
      <Card.Header>Header</Card.Header>
      <Card.Body>
        <Card.Title>{data?.title || '임시제목'}</Card.Title>
        <Card.Text>
          버튼 자리
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default TeamCard
