import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// pages = total number of pages
const PostPaginate = ({ postsPages, postsPage, keyword = '' }) => {
  return (
    postsPages > 1 && (
      <Pagination>
        {[...Array(postsPages).keys()].map(x => (
          <LinkContainer
            key={x + 1}
            to={
              keyword
                ? `/posts/search/${keyword}/postsPage/${x + 1}`
                : `/posts/postsPage/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === postsPage}>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default PostPaginate;
