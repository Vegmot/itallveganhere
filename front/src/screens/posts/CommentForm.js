import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { writeNewComment } from '../../actions/postActions';
import { ADD_COMMENT_RESET } from '../../constants/postConstants';

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const writeComment = useSelector(state => state.writeComment);
  const { success } = writeComment;

  useEffect(() => {
    if (success) {
      setText('');
      dispatch({ type: ADD_COMMENT_RESET });
    }
  }, [success, dispatch]);

  const writeCommentHandler = e => {
    e.preventDefault();
    dispatch(writeNewComment(postId, { text }));
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={{ span: 10, offset: 7 }}>
            <input
              type='text'
              name='comment'
              className='comment-form my-4'
              value={text}
              onChange={e => setText(e.target.value)}
            ></input>
            <Button
              type='submit'
              className='btn btn-sm mx-2 btn-primary'
              onClick={writeCommentHandler}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CommentForm;
