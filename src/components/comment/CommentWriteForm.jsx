import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import CustomButton from '../common/CustomButton';

const CommentWriteForm = ({boardId}) => {

  const [content, setContent] = useState('');
  const writeComment = () => {

  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label htmlFor='content'>댓글</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3} 
          placeholder='댓글을 입력하세요.'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>      
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <CustomButton
          variant='primary'
          type='submit' // 'submit'으로 두면 onSubmit에서 처리됨
          innerText='댓글 등록'
          color='#ffffff'
          width='fit-content'
          onClick={writeComment}
        />
      </Form.Group>
    </Form>
  )
}

export default CommentWriteForm
