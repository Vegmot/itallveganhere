import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Spinner, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPostItem, editPostContents } from '../../actions/postActions';
import Message from '../../components/Message';

const EditPostForm = ({ match }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const editPostItem = useSelector(state => state.editPostItem);
  const { success } = editPostItem;

  const postItem = useSelector(state => state.postItem);
  const { loading, error, post } = postItem;

  useEffect(() => {
    if (userData && userData._id === post.user) {
      getPostItem(match.params.id);
      setTitle(post.title);
      setContent(post.content);
    }
  });

  const editPostHandler = e => {
    e.preventDefault();
    dispatch(editPostContents({ title, content }));
  };

  return (
    <>
      <Container>
        {loading && <Spinner animation='border' variant='primary' />}
        {error && <Message variant='danger'>{error}</Message>}

        <Link to='/posts' className='btn btn-light mb-2'>
          Back to posts
        </Link>

        <Form onSubmit={editPostHandler}>
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
            Update
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default EditPostForm;
