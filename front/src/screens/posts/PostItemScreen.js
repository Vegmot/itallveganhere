import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Table, Button, Card, Spinner } from 'react-bootstrap';
import Message from '../../components/Message';
import CommentForm from './CommentForm';
import CommentFormContainer from '../../components/CommentFormContainer';
import {
  getPostItem,
  deleteCommentItem,
  addLikeToPostItem,
  removeLikeFromPostItem,
  addDislikeToPostItem,
  removeDislikeFromPostItem,
  deletePostItem,
} from '../../actions/postActions';
import { useDispatch, useSelector } from 'react-redux';

const PostItemScreen = ({ match, history }) => {
  const postId = match.params.id;

  const dispatch = useDispatch();

  const postItem = useSelector(state => state.postItem);
  const { loading, error, post } = postItem;

  const addLikePost = useSelector(state => state.addLikePost);
  const { success: successLike } = addLikePost;

  const removeLikePost = useSelector(state => state.removeLikePost);
  const { success: successUnlike } = removeLikePost;

  const addDislikePost = useSelector(state => state.addDislikePost);
  const { success: successDislike } = addDislikePost;

  const removeDislikePost = useSelector(state => state.removeDislikePost);
  const { success: successUndislike } = removeDislikePost;

  const removePost = useSelector(state => state.removePost);
  const { success: successRemovePost } = removePost;

  const removeComment = useSelector(state => state.removeComment);
  const { success: successRemoveComment } = removeComment;

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  useEffect(() => {
    dispatch(getPostItem(postId));

    if (successRemovePost) {
      history.push('/posts');
    }

    if (
      (successRemoveComment,
      successLike,
      successUnlike,
      successDislike,
      successUndislike)
    ) {
      dispatch(getPostItem(postId));
    }
  }, [
    dispatch,
    postId,
    history,
    successRemovePost,
    successRemoveComment,
    successLike,
    successUnlike,
    successDislike,
    successUndislike,
  ]);

  const deletePostHandler = pId => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePostItem(pId));
    }
  };

  const deleteCommentHandler = (pId, cId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      dispatch(deleteCommentItem(pId, cId));
    }
  };

  return (
    <>
      {loading && <Spinner animation='border' variant='primary' />}
      {error && <Message variant='danger'>{error}</Message>}

      <Button onClick={history.goBack} className='btn btn-secondary mb-3'>
        Go back
      </Button>

      {post ? (
        <>
          <div className='postItem'>
            <Card>
              <Card.Header>
                <Link to={`/users/${post.user}`}>
                  {post.firstName + ' ' + post.lastName}
                </Link>{' '}
                posted on {post.date && post.date.substring(0, 10)}{' '}
                {userData &&
                (userData._id === post.user || userData.isAdmin) ? (
                  <Button
                    className='btn btn-sm btn-danger mx-5'
                    onClick={() => deletePostHandler(postId)}
                  >
                    <i className='fas fa-times'></i>
                  </Button>
                ) : (
                  ''
                )}
              </Card.Header>

              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                  <p className='my-1'>{post.content}</p>
                </Card.Text>

                <Button
                  type='button'
                  className={`btn mx-2 ${
                    post.likes.find(like => like.user === userData._id)
                      ? 'btn-primary'
                      : 'btn-light'
                  }`}
                  onClick={() => {
                    if (post.likes.find(like => like.user === userData._id)) {
                      dispatch(removeLikeFromPostItem(postId));
                    } else {
                      if (
                        !post.dislikes.find(
                          dislike => dislike.user === userData._id
                        )
                      ) {
                        dispatch(addLikeToPostItem(postId));
                      }
                    }
                  }}
                >
                  <i className='fas fa-thumbs-up'></i>{' '}
                  <span>
                    {post.likes.length > 0 && <span>{post.likes.length}</span>}
                  </span>
                </Button>

                <Button
                  type='button'
                  className={`btn mx-2 ${
                    post.dislikes.find(dislike => dislike.user === userData._id)
                      ? 'btn-danger'
                      : 'btn-light'
                  }`}
                  onClick={() => {
                    if (
                      post.dislikes.find(
                        dislike => dislike.user === userData._id
                      )
                    ) {
                      dispatch(removeDislikeFromPostItem(postId));
                    } else {
                      if (
                        !post.likes.find(like => like.user === userData._id)
                      ) {
                        dispatch(addDislikeToPostItem(postId));
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
                </Button>
              </Card.Body>
            </Card>

            <CommentFormContainer>
              <div className='comments-list-area'>
                <Table>
                  <tbody>
                    {post.comments.length > 0 &&
                      post.comments.map(comment => (
                        <tr key={comment._id}>
                          <td>
                            <Link to={`/users/${comment.user}`}>
                              {comment.firstName}
                            </Link>
                          </td>
                          <td>{comment.text}</td>
                          <td>
                            {comment.date && comment.date.substring(0, 10)}
                          </td>
                          <td>
                            <Button
                              className={
                                userData
                                  ? userData.isAdmin
                                    ? 'btn btn-danger btn-sm'
                                    : userData._id === comment.user
                                    ? 'btn btn-danger'
                                    : 'no-display'
                                  : 'no-display'
                              }
                              onClick={() => {
                                deleteCommentHandler(postId, comment._id);
                              }}
                            >
                              <i className='fas fa-times'></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </CommentFormContainer>
          </div>

          <CommentForm postId={postId} />
        </>
      ) : (
        <Message variant='danger'>Unable to load post</Message>
      )}
    </>
  );
};

export default withRouter(PostItemScreen);
