import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Spinner, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPostItem, editPostContents } from '../../actions/postActions';
import Message from '../../components/Message';

const EditPostForm = ({ match, history }) => {
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  const postItem = useSelector(state => state.postItem);
  const { loading, error, post } = postItem;

  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [updatedContent, setUpdatedContent] = useState(post.content);

  useEffect(() => {
    if (userData && userData._id === post.user) {
      getPostItem(match.params.id);
    }
  });

  const editPostHandler = e => {
    e.preventDefault();
    dispatch(editPostContents(match.params.id, updatedTitle, updatedContent));

    history.push(`/posts/${post._id}`);
    setMessage('Successfully updated the post');
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  };

  return (
    <>
      <Container>
        {loading && <Spinner animation='border' variant='primary' />}
        {error && <Message variant='danger'>{error}</Message>}
        {message && <Message variant='success'>{message}</Message>}

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
              value={updatedTitle}
              onChange={e => setUpdatedTitle(e.target.value)}
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
              value={updatedContent}
              onChange={e => setUpdatedContent(e.target.value)}
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
