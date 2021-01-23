import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Table, Button, Card, Spinner } from 'react-bootstrap';
import Message from '../../components/Message';
import {
  getPostItem,
  writeNewComment,
  deleteCommentItem,
  addLikePost,
  removeLikePost,
  addDislikePost,
  removeDislikePost,
  deletePostItem,
} from '../../actions/postActions';
import { getUsersList } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const PostItemScreen = ({ match, history }) => {
  const postId = match.params.id;
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const postItem = useSelector(state => state.postItem);
  const { loading, error, post } = postItem;

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  useEffect(() => {
    dispatch(getPostItem(postId));
    dispatch(getUsersList());
  }, [dispatch, postId]);

  const writeCommentHandler = e => {
    e.preventDefault();
    dispatch(writeNewComment(postId, comment));
    setComment('');
  };

  const deletePostHandler = id => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePostItem(id));
    }
  };

  return (
    <>
      {loading && <Spinner animation='border' variant='primary' />}
      {error && <Message variant='danger'>{error}</Message>}

      <Button onClick={history.goBack} className='btn btn-secondary'>
        Go back
      </Button>

      <div className='post'>
        <Card>
          <Card.Header>
            {post.firstName + ' ' + post.lastName} posted on{' '}
            {post.date.substring(0, 10)}
          </Card.Header>

          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>
              <p className='my-1'>{post.content}</p>
            </Card.Text>

            <button
              type='button'
              className={`btn ${
                post.likes.find(like => like.user === userData._id)
                  ? 'btn-primary'
                  : 'btn-light'
              }`}
              onClick={() => {
                if (post.likes.find(like => like.user === userData._id)) {
                  dispatch(removeLikePost(postId));
                } else {
                  if (
                    !post.dislikes.find(
                      dislike => dislike.user === userData._id
                    )
                  ) {
                    dispatch(addLikePost(postId));
                  }
                }
              }}
            >
              <i className='fas fa-thumbs-up'></i>{' '}
              <span>
                {post.likes.length > 0 && <span>{post.likes.length}</span>}
              </span>
            </button>

            <button
              type='button'
              className={`btn ${
                post.dislikes.find(dislike => dislike.user === userData._id)
                  ? 'btn-danger'
                  : 'btn-light'
              }`}
              onClick={() => {
                if (
                  post.dislikes.find(dislike => dislike.user === userData._id)
                ) {
                  dispatch(removeDislikePost(postId));
                } else {
                  if (!post.likes.find(like => like.user === userData._id)) {
                    dispatch(addDislikePost(postId));
                  }
                }
              }}
            >
              <i className='fas fa-thumbs-down'></i>{' '}
              <span>
                {post.dislikes.length > 0 && (
                  <span>{post.dislikes.length}</span>
                )}
              </span>
            </button>

            <textarea
              name='comment'
              cols='30'
              rows='10'
              value={comment}
              onChange={e => setComment(e.target.value)}
            ></textarea>
            <Button
              type='button'
              className='btn btn-primary'
              onClick={writeCommentHandler}
            >
              Submit
            </Button>

            <Table>
              <tbody>
                {post.comments.length > 0 &&
                  post.comments.map(comment => (
                    <tr key={comment._id}>
                      <td>{comment.avatar}</td>
                      <td>{comment.firstName}</td>
                      <td>{comment.text}</td>
                      <td>{comment.date}</td>
                      <td>
                        {userData && userData._id === comment.user && (
                          <Button
                            onClick={() => {
                              if (
                                window.confirm(
                                  'Are you sure to delete this comment?'
                                )
                              ) {
                                dispatch(deleteCommentItem(comment._id));
                              }
                            }}
                          >
                            <i clasName='fas fa-trash'></i>
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>

            <Link to={`/posts/${postId}`} className='btn btn-primary'>
              Comments{' '}
              {post.comments.length > 0 && (
                <span className='comment-count'>{post.comments.length}</span>
              )}
            </Link>

            {userData._id === post.user || userData.isAdmin ? (
              <Button
                className='btn btn-danger'
                onClick={() => deletePostHandler(postId)}
              >
                <i className='fas fa-trash'></i>
              </Button>
            ) : (
              ''
            )}
          </Card.Body>
        </Card>

        <Link to={`/users/${post.user}`}>
          <img className='round-img' src={post.avatar} alt='Profile avatar' />
          <h4>View {post.firstName}'s profile</h4>
        </Link>
      </div>
    </>
  );
};

export default withRouter(PostItemScreen);
