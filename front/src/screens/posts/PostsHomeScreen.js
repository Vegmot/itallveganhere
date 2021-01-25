import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Post from '../../components/Post';
import PostPaginate from '../../components/PostPaginate';
import { getPostsList } from '../../actions/postActions';

const PostsHomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const postsList = useSelector(state => state.postsList);
  const { loading, error, posts, postsPage, postsPages } = postsList;

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  useEffect(() => {
    dispatch(getPostsList(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {' '}
      {loading && <Spinner animation='border' variant='primary' />}
      {error && <Message variant='danger'>{error}</Message>}
      {posts.length === 0 && <h2>There is no post.</h2>}
      <Link
        to={userData ? '/posts/post-form' : '/login'}
        className='btn btn-primary my-3'
      >
        Write a post
      </Link>
      <div className='posts my-3'>
        <Table
          striped
          bordered
          hover
          responsive
          className='table-sm posts-list-table'
        >
          <thead>
            <tr>
              <td>#</td>
              <td className='hide-sm'>Avatar</td>
              <td>Username</td>
              <td>Title</td>
              <td>Date</td>
              <td>likes</td>
              <td>Dislikes</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post._id}>
                <Post post={post} />
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <PostPaginate
        postsPage={postsPage}
        postsPages={postsPages}
        keyword={keyword ? keyword : ''}
      />
    </>
  );
};

export default PostsHomeScreen;
