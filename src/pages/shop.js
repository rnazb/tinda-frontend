import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getShopIndex } from '../services/APICalls/productsAPICalls';

import ProductItem from "../components/Products/ProductItem";
import { RatingView } from 'react-simple-star-rating';

import {
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap';

import './shop.styles.scss';

const Shop = () => {
  const { id } = useParams();
  const [shopIndex, setShopIndex] = useState([]);

  useEffect(() => {
    const loadIndex = async () => {
      const response = await getShopIndex(id);
      setShopIndex(response);
    }
    loadIndex();
  }, [id])

  const productsList = shopIndex.map(productItem =>
    <Col
      key={productItem._id}
      xs={12}
      md={6}
      xl={3}
      className="mx-0 px-0"
    >
      <div className="products-display">
        <Link to={`/product/${productItem._id}`}>
          <Card className="cardHighlight">
            {
              productItem.images?.length > 0 ?
                <Card.Img src={productItem.images[0].url} />
                :
                <Card.Img src="https://res.cloudinary.com/daddiqd6y/image/upload/v1626241614/Tinda/xjfxzr1ytbtquyt6bvyi.png" />
            }
            <ProductItem
              id={productItem._id}
              name={productItem.name}
              price={productItem.price.toFixed(2)}
            />
            <Card.Footer>
              <div className="ratings">
                <RatingView ratingValue={Math.floor(productItem.averageRating)} />
                <span>({
                  productItem.averageRating.toFixed(1)
                })</span>
              </div>
            </Card.Footer>
          </Card>
        </Link>
      </div>
    </Col>
  );

  return (
    <>
      <Container>

        <h1>Products by {shopIndex[0]?.owner.username}</h1>

        <Row>
          {
            productsList.length !== 0
              ?
              productsList
              :
              <p>No products found...</p>
          }
        </Row>


      </Container>
    </>
  );
};

export default Shop;