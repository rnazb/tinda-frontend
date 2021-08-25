import { Carousel } from 'react-bootstrap';

import './ProductImageCarousel.styles.scss';
import React from 'react';

const ProductImageCarousel = (props) => {

  const carouselImages = props.images?.map(item => {
    return (
      <Carousel.Item key={item._id} >
        <img
          className="d-flex w-100"
          src={item.url}
          pause="hover"
          intertval={5000}
          alt=""
        />
      </Carousel.Item >
    );
  });

  return (
    <Carousel>
      {carouselImages}
    </Carousel>
  );
};

export default ProductImageCarousel;