import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Spinner, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { writeNewPost } from '../../actions/postActions';
import Message from '../../components/Message';

const PostForm = ({ history }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const writePost = useSelector(state => state.writePost);
  const { loading, error } = writePost;

  const postHandler = () => {
    dispatch(writeNewPost(title, content));
    history.push('/posts');
  };

  return (
    <>
      <Container>
        {loading && <Spinner animation='border' variant='primary' />}
        {error && <Message variant='danger'>{error}</Message>}

        <Link to='/posts' className='btn btn-secondary mb-2'>
          Back to posts
        </Link>

        <Form>
          <Form.Group controlId='postTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              name='title'
              className={title ? 'has-success' : 'has-danger'}
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
              className={content ? 'has-success' : 'has-danger'}
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </Form.Group>

          <Button className='btn btn-primary ml-auto' onClick={postHandler}>
            Post
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default PostForm;
