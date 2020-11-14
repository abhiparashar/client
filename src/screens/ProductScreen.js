import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import  {Carousel}  from 'react-responsive-carousel';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';


function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productSaveSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };
  console.log(product)
  if (product.product) {
    const images = product.product.images;
    const imagesArr = [];
    for (const img in images) {
      imagesArr.push(images[img]);
    }
  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
          <div className="details">
            <div className="details-image">
              {/* <img src={product.images} alt="product"></img> */}
              <Carousel
  showArrows={true}
>
  {imagesArr.map(img => (
    <div>
      <img src={img} alt={product.product.name} />
      <p className='legend'>{product.product.name}</p>
    </div>
  ))}
</Carousel>
            </div>
            <div className="details-info">
              <ul>
                <li>
                  <h4>{product.name}</h4>
                </li>
                
                <li>
                  <a href="#reviews">
                    <Rating
                      value={product.rating}
                      text={product.numReviews + ' reviews'}
                    />
                  </a>
                </li>
                <li>
                  Price: <b>&#x20B9;{product.price}</b>
                </li>
                <li>
                  Description:
                  <div>{product.product.product_name}</div>
                </li>
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>Price: {product.price}</li>
                <li>
                  Status:{' '}
                  {product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
                </li>
                <li>
                  Qty:{' '}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  {product.countInStock > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className="button primary"
                    >
                      Add to Cart
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="content-margined">
            <h2>Reviews</h2>
            {/* {!product.product.reviews.length && <div>There is no review</div>} */}
            <ul className="review" id="reviews">
              {/* {product.product.reviews.map((review) => (
                <li key={review.id}>
                  <div>{review.name}</div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <div>{review.comment}</div>
                </li>
              ))} */}
              <li>
                <h3>Write a customer review</h3>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating">Rating</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Submit
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    Please <Link to="/signin">Sign-in</Link> to write a review.
                  </div>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  )}else {
    return <div></div>;
  }}
export default ProductScreen;
