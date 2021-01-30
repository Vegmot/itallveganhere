import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteProductItem } from '../../actions/productActions';

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const deleteProductHandler = id => {
    if (
      window.confirm(
        'Are you sure you want to delete this user? This cannot be undone.'
      )
    ) {
      dispatch(deleteProductItem(id));
    }
  };

  return (
    <>
      <td className='align-middle'>{product._id}</td>
      <td className='align-middle'>
        <Link to={`/admin/products/${product._id}/create-update`}>
          {product.name}
        </Link>
      </td>
      <td className='align-middle'>
        <Image
          className='admin-product-image'
          src={product.image}
          alt={`Image of ${product.name}`}
        />
      </td>
      <td className='align-middle'>{product.category}</td>
      <td className='align-middle'>{product.brand}</td>
      <td className='align-middle'>$ {product.price}</td>
      <td className='align-middle'>
        <Button
          className='btn btn-danger'
          onClick={() => deleteProductHandler(product._id)}
        >
          <i className='fas fa-trash'></i>
        </Button>
      </td>
    </>
  );
};

export default Product;
