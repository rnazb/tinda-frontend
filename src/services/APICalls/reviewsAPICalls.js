import axios from 'axios';

const callURL = process.env.REACT_APP_SERVER || 'http://localhost:4000';

export const postReview = async (reviewData, productId) => {
  return await axios({
    method: 'POST',
    url: `${callURL}/api/products/${productId}/reviews`,
    data: reviewData,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
};

export const deleteReview = async (productId, reviewId) => {
  return await axios({
    method: 'DELETE',
    url: `${callURL}/api/products/${productId}/reviews/${reviewId}`,
    withCredentials: true
  });
};