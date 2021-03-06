import { useState, useEffect, useContext } from "react";
import UserContext from "../../../store/user-context";

import { postReview } from "../../../services/APICalls/reviewsAPICalls";

import { Rating } from "react-simple-star-rating";

import { Form } from 'react-bootstrap';
import Button from '../Button';

import './ReviewAddForm.styles.scss';

const ReviewAddForm = (props) => {
  const { user } = useContext(UserContext);
  const [rating, setRating] = useState(0);
  const [reviewBody, setReviewBody] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user.id && user.username && user.role) {
      setIsLoggedIn(true)
    }
  }, [user.id, user.username, user.role]);

  const ratingChangeHandler = (ratingInput) => {
    setRating(ratingInput);
  };

  const reviewBodyChangeHandler = (reviewBodyInput) => {
    setReviewBody(reviewBodyInput.target.value);
  };

  const reviewData = {
    authorId: localStorage.getItem('id'),
    reviewedProductId: props.id,
    rating: rating,
    reviewBody: reviewBody
  };

  const reviewSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoggedIn) {
      await postReview(reviewData, props.id);
      setRating(0);
      setReviewBody('');
      window.location.reload(false);
    } else {
      return;
    }
  };

  return (
    <>
      <h3>Leave a Review</h3>
      <Form onSubmit={reviewSubmitHandler}>
        <Form.Group controlId="ControlTextarea1">
          <Rating onClick={ratingChangeHandler} ratingValue={rating} />
          <Form.Control
            as="textarea"
            value={reviewBody}
            onChange={reviewBodyChangeHandler}
            rows={4}
          />
        </Form.Group>
        <div id="review-add-btn">
          {
            !isLoggedIn && <span>Please log in to post a review</span>
          }
          <Button
            className="primary-btn"
            type="submit"
            disabled={!isLoggedIn}
          >
            Post Review
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ReviewAddForm;