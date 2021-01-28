import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// pages = total number of pages
const OrderPaginate = ({
  orderPages,
  orderPage,
  isAdmin = false,
  keyword = '',
}) => {
  return (
    orderPages > 1 && (
      <Pagination>
        {[...Array(orderPages).keys()].map(x => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/orders/search/${keyword}/page/${x + 1}`
                  : `/orders/page/${x + 1}`
                : `/admin/orders/page/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === orderPage}>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default OrderPaginate;
