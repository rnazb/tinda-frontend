import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSingleProduct, getAverageSellerRating } from '../services/APICalls/productsAPICalls';
import { deleteReview } from '../services/APICalls/reviewsAPICalls';

import CartItemAddForm from '../components/UI/Forms/CartItemAddForm';
import ProductDeleteConfirm from '../components/UI/Forms/ProductDeleteConfirm';
import ProductEditForm from '../components/UI/Forms/ProductEditForm';
import ImageEditForm from '../components/UI/Forms/ImageEditForm';
import ReviewAddForm from '../components/UI/Forms/ReviewAddForm';
import Button from '../components/UI/Button';

import DisplayReview from '../components/Reviews/DisplayReview';
import ProductImageCarousel from '../components/Products/ProductImageCarousel';

import {
  Container,
  Card,
  Row,
  Col
} from 'react-bootstrap';

import { RatingView } from 'react-simple-star-rating';

import './productView.styles.scss';

import UserContext from '../store/user-context';

const ProductView = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [productReviews, setProductReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [averageSellerRating, setAverageSellerRating] = useState(0);

  const [editFormIsShown, setEditFormIsShown] = useState(false);
  const [imagesFormIsShown, setImagesFormIsShown] = useState(false);

  const [deleteConfirmIsShown, SetDeleteConfirmIsShown] = useState(false);

  const { user } = useContext(UserContext);

  const showEditFormHandler = (event) => {
    event.preventDefault();
    setEditFormIsShown(true);
  };

  const hideEditFormHandler = (event) => {
    event.preventDefault();
    setEditFormIsShown(false);
  };

  const showDeleteConfirmHandler = (event) => {
    event.preventDefault();
    SetDeleteConfirmIsShown(true);
  };

  const hideDeleteConfirmHandler = (event) => {
    event.preventDefault();
    SetDeleteConfirmIsShown(false);
  };

  const showImagesFormHandler = (event) => {
    event.preventDefault();
    setImagesFormIsShown(true);
  };

  const hideImagesFormHandler = (event) => {
    event.preventDefault();
    setImagesFormIsShown(false);
  };

  useEffect(() => {
    const loadProduct = async () => {
      const loadedProduct = await getSingleProduct(id);
      setProduct(loadedProduct);
      setAverageRating(loadedProduct.averageRating);

      const loadedSellerRating = await getAverageSellerRating(loadedProduct.owner._id);
      setAverageSellerRating(loadedSellerRating.averageSellerRating);
    };
    loadProduct();
  }, [id]);

  const addToCartHandler = amount => {
    const newCartItem = {
      id: product._id,
      name: product.name,
      amount: amount,
      price: product.price
    };

    const existingCartItems = JSON.parse(localStorage.getItem('cart-items'));
    let existingCartTotal = JSON.parse(localStorage.getItem('cart-total'));

    // update cart-items

    if (
      existingCartItems.length === 0 ||
      !existingCartItems.some(elem =>
        elem.id === newCartItem.id)
    ) {
      existingCartItems.push(newCartItem);

    } else {

      for (let index of existingCartItems) {
        if (index.id === newCartItem.id) {
          index.amount += newCartItem.amount;
        }
      }
    }

    localStorage.setItem('cart-items', JSON.stringify(existingCartItems));

    // update cart-total

    existingCartTotal += newCartItem.amount * newCartItem.price;
    localStorage.setItem('cart-total', `${existingCartTotal}`)

  };

  // List out product review details

  useEffect(() => {
    setProductReviews(product.reviews);
  }, [productReviews, setProductReviews, product.reviews]);

  const reviewsList = productReviews?.reverse().map(item => {
    const deleteReviewHandler = async (event) => {
      event.preventDefault();

      const reviewIndex = productReviews.indexOf(item);
      productReviews.splice(reviewIndex, 1);

      await deleteReview(id, item._id);
      window.location.reload(false);
    };

    return (
      <DisplayReview
        key={item._id}
        rating={item.rating}
        author={item.author}
        body={item.body}
        createdAt={item.createdAt}
        onSubmit={deleteReviewHandler}
      />
    );
  });

  return (
    <>
      <div id="main-product-view" className="custom-container" >
        {
          editFormIsShown &&
          <ProductEditForm
            onClose={hideEditFormHandler}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        }
        {
          imagesFormIsShown &&
          <ImageEditForm
            onClose={hideImagesFormHandler}
            existingImages={product.images}
          />
        }
        {
          deleteConfirmIsShown &&
          <ProductDeleteConfirm
            onClose={hideDeleteConfirmHandler}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        }
        <Card>
          <Container fluid>
            <Row className="product-card">

              <Col className="m-0 p-0" xs={12} md={12} lg={3}>
                <Card className="product-image-card">
                  {
                    product.images?.length > 0 ?
                      <>
                        <ProductImageCarousel images={product.images} />
                      </>
                      :
                      <Card.Img src="https://res.cloudinary.com/daddiqd6y/image/upload/v1626241614/Tinda/xjfxzr1ytbtquyt6bvyi.png" />
                  }
                </Card>
              </Col>

              <Col className="m-0 p-0" xs={12} md={6} lg={5}>
                <Card>
                  <Card.Body className="d-flex flex-column justify-content-between mb-0 pb-0">
                    <Card.Title className="mb-2 pb-0">
                      {product.name}
                    </Card.Title>
                    <div id="product-rating">
                      <RatingView ratingValue={Math.floor(averageRating)} />
                      <span>(
                        {
                          productReviews?.length > 0 ?
                            averageRating.toFixed(1)
                            :
                            'No Reviews Yet'
                        }
                        )</span>
                    </div>
                    <Card.Text className="mt-2">
                      {product.description}
                    </Card.Text>
                    <Card.Text className="my-2">
                      <strong>PHP {product.price?.toFixed(2)}</strong>
                    </Card.Text>
                  </Card.Body>
                  <Card.Body>
                    <CartItemAddForm onAddToCart={addToCartHandler} />
                  </Card.Body>
                </Card>
              </Col>

              <Col className="m-0 p-0" xs={12} md={6} lg={4} bg="dark">
                <Card className="order-details">
                  <Card.Body id="seller-details">
                    <div>
                      <span>Sold by</span>
                      <h5>{product.owner?.username}</h5>
                    </div>
                    <div id="average-seller-rating-box">
                      <h6>Average Seller Rating</h6>
                      <span>{averageSellerRating.toFixed(0)}%</span>
                    </div>
                    <div id="shop-link-container">
                      <Link to={`/shop/${product.owner?._id}`}>
                        GO TO STORE
                      </Link>
                    </div>
                  </Card.Body>
                  <Card.Body>
                    {
                      user.id === product.owner?._id &&
                      <>
                        <h5>Edit Product</h5>
                        <div id="edit-product-btn-group">
                          <Button onClick={showDeleteConfirmHandler}
                            className="danger-btn">
                            Delete
                          </Button>
                          <Button onClick={showImagesFormHandler} className="primary-btn">
                            Update Images
                          </Button>
                          <Button onClick={showEditFormHandler} className="primary-btn">
                            Edit Details
                          </Button>
                        </div>
                      </>
                    }
                  </Card.Body>
                </Card>
              </Col>

            </Row>
          </Container>
        </Card>
      </div>

      <div id="reviews-container" className="custom-container">
        <Card id="reviews-card">
          <ReviewAddForm id={id} />
        </Card>
        {reviewsList}
      </div>
    </>
  );
};

export default ProductView;