import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostItem } from '../../actions/postActions';

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  const deletePostHandler = pId => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePostItem(pId));
    }
  };

  return (
    <>
      <td>{post.postNumber}</td>

      <td className='hide-sm align-middle'>
        <Link to={`/users/${post.user}`}>
          <img
            className='posts-list-avatar'
            src={post.avatar}
            alt='Profile avatar'
          />
        </Link>
      </td>

      <td className='align-middle'>
        <Link to={`/users/${post.user}`}>
          <h6>{post.firstName + ' ' + post.lastName}</h6>
        </Link>
      </td>

      <td className='align-middle'>
        <h6 className='text-primary'>
          {post.title.length > 30 ? (
            <Link to={`/posts/${post._id}`}>
              {post.title.substring(0, 50) +
                '... ' +
                '(' +
                post.comments.length +
                ')'}
            </Link>
          ) : (
            <Link to={`/posts/${post._id}`}>
              {post.title + ' (' + post.comments.length + ')'}
            </Link>
          )}
        </h6>
      </td>

      <td className='align-middle'>
        <p className='post-date'>{post.date.substring(0, 10)}</p>
      </td>

      <td className='align-middle'>
        <button type='button' className='btn btn-sm'>
          <i className='fas fa-thumbs-up'></i>{' '}
          <span>
            {post.likes.length > 0 && <span>{post.likes.length}</span>}
          </span>
        </button>
      </td>

      <td className='align-middle'>
        <button type='button' className='btn btn-sm'>
          <i className='fas fa-thumbs-down'></i>{' '}
          <span>
            {post.dislikes.length > 0 && <span>{post.dislikes.length}</span>}
          </span>
        </button>
      </td>

      <td className='align-middle'>
        {userData && (userData.isAdmin || userData._id === post.user) ? (
          <Button
            className='btn btn-sm btn-danger'
            onClick={() => deletePostHandler(post._id)}
          >
            <i className='fas fa-trash'></i>
          </Button>
        ) : (
          ''
        )}
      </td>
    </>
  );
};

export default Post;
