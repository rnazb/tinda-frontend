import axios from 'axios';


export const postReview = async (reviewData, productId) => {
  return await axios({
    method: 'POST',
    url: `http://localhost:4000/api/products/${productId}/reviews`,
    data: reviewData,
    withCredentials: true
  });
};

export const deleteReview = async (productId, reviewId) => {
  return await axios({
    method: 'DELETE',
    url: `http://localhost:4000/api/products/${productId}/reviews/${reviewId}`,
    withCredentials: true
  });
};