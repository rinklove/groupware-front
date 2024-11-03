import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import CustomButton from '../common/CustomButton';
import useCommentApi from '../hook/UseCommentApi';

const CommentWriteForm = ({ boardId, onCommentSubmit }) => {
  const [content, setContent] = useState('');
  const { addComment } = useCommentApi();
  const [isFetching, setIsFetching] = useState(false);

  const writeComment = async (e) => {
    e.preventDefault();

    if (isFetching) {
      alert('잠시만 기다려주세요');
      return;
    }

    setIsFetching(true);

    try {
      const data = { teamBoardId: boardId, content };
      await addComment(data);
      alert('댓글이 등록되었습니다.');
      setContent(''); // 댓글 입력란 초기화
      onCommentSubmit(); // 댓글 등록 후 목록 새로고침
    } catch (e) {
      console.error(e);
      alert('댓글 등록 실패');
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="content">댓글</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="댓글을 입력하세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ resize: 'none' }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <CustomButton
          variant="primary"
          type="submit"
          innerText="댓글 등록"
          color="#ffffff"
          width="fit-content"
          onClick={writeComment}
        />
      </Form.Group>
    </Form>
  );
};

export default CommentWriteForm;
