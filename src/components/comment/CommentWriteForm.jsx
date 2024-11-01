import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import CustomButton from '../common/CustomButton';
import useCommentApi from '../hook/UseCommentApi';

const CommentWriteForm = ({boardId}) => {

  const [content, setContent] = useState('');
  const { addComment } = useCommentApi()
  const [isFetching, setIsFetching] = useState(false)
  const getData = {
    "teamBoardId": boardId,
    content
  }

  const writeComment = async (e) => {
      e.preventDefault()

      if(isFetching) {
        alert('잠시만 기다려주세요')
        return
      }

      setIsFetching(true)
      
      try {
        const data = getData();
        const { value } = await addComment(data);
        alert(value);
      } catch (e) {
        console.error(e);
        alert('댓글 등록 실패')
      } finally {
        setIsFetching(false)
      }
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
