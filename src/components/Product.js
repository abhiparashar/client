import React from 'react'
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  const prod = product.product;
    return (
            <div className="product">
                <Link to={'/product/' + product.id}>
                  <img
                    className="product-image"
                    src={prod.images.image_one}
                    alt="product"
                  />
                </Link>
                <div className="product-name">
                  <Link to={'/product/' + product.id}>{prod.item_name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">&#x20B9;{product.price}</div>
                {/* <div className="product-rating">
                  <Rating
                    value={product.rating}
                    text={product.numReviews + ' reviews'}
                  />
                </div> */}
              </div>
    )
}

export default Product;
