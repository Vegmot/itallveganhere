import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Spinner, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { writeNewPost } from '../../actions/postActions';
import Message from '../../components/Message';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const writePost = useSelector(state => state.writePost);
  const { loading, error } = writePost;

  const postHandler = e => {
    e.preventDefault();
    dispatch(writeNewPost(title, content));
  };

  return (
    <>
      <Container>
        {loading && <Spinner animation='border' variant='primary' />}
        {error && <Message variant='danger'>{error}</Message>}

        <Link to='/posts' className='btn btn-secondary mb-2'>
          Back to posts
        </Link>

        <Form onSubmit={postHandler}>
          <Form.Group controlId='postTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              name='title'
              className='post-form-title'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='postContent'>
            <Form.Label>Content</Form.Label>
            <Form.Control
              as='textarea'
              rows={12}
              name='content'
              className='post-form-content'
              style={{ whiteSpace: 'pre-line' }}
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </Form.Group>

          <Button type='submit' className='btn btn-primary ml-auto'>
            Post
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default PostForm;
