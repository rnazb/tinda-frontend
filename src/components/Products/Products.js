import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { getProducts } from '../../services/APICalls/productsAPICalls';

import ProductItem from "./ProductItem";
import { RatingView } from 'react-simple-star-rating';

import { Card, Row, Col } from "react-bootstrap";

import './Products.styles.scss';

import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Products = () => {
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const loadedProducts = await getProducts();
      setProducts(loadedProducts)
    };
    loadProducts();
    setIsLoading(false);
  }, []);

  const productsList = products.map(productItem => {

    return (
      <Col
        key={productItem.id}
        xs={12}
        md={6}
        xl={3}
        className="mx-0 px-0"
      >
        <div className="products-display">
          <Link to={`/product/${productItem.id}`}>
            <Card className="cardHighlight">
              {
                isLoading ?
                  <BeatLoader css={override} />
                  :
                  <>
                    {
                      productItem.images?.length > 0 ?
                        <Card.Img src={productItem.images[0].url} />
                        :
                        <Card.Img src="https://res.cloudinary.com/daddiqd6y/image/upload/v1626241614/Tinda/xjfxzr1ytbtquyt6bvyi.png" />
                    }
                    <ProductItem
                      id={productItem.id}
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
                  </>
              }
            </Card>
          </Link>
        </div>
      </Col>
    );
  });

  return (
    <Row>
      {
        productsList.length !== 0
          ?
          productsList
          :
          <p>No products found...</p>
      }
    </Row>
  );
};

export default Products;
