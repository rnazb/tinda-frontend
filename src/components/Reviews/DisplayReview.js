import { Card } from 'react-bootstrap';
import { RatingView } from 'react-simple-star-rating';

import Button from '../UI/Button';

import './DisplayReview.styles.scss';

const DisplayReview = (props) => {
  const date = new Date(props.createdAt);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  const reviewDate = `${formattedDate} - ${formattedTime}`

  return (
    <Card className="card-review">
      <div className="review-header">
        <RatingView ratingValue={props.rating} />
        <span>{reviewDate}</span>
      </div>
      <em>by {props.author.username}</em>
      <p>{props.body}</p>
      {
        localStorage.getItem('id') === props.author._id &&
        <span>
          <form id="review-delete-btn" onSubmit={props.onSubmit}>
            <Button className="danger-btn" type="submit">
              Delete
            </Button>
          </form>
        </span>
      }
    </Card>
  );
};

export default DisplayReview;