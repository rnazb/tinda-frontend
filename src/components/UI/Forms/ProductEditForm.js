import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { editProduct } from "../../../services/APICalls/productsAPICalls";
import validationService from "../../../services/validationServices";

import Modal from "../Modal";
import Input, { Textarea } from "../Input";

import Button from '../Button';

import './ProductEditForm.styles.scss';

import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';

const override = css`
  display: flex;
  margin: 0;
  justify-content: center;
  padding: 8rem 0;
  border-color: red;
`;

const ProductEditForm = (props) => {
  const { id } = useParams();
  const [productName, setProductName] = useState(props.name);
  const [nameIsValid, setNameIsValid] = useState(true);
  const [productDescription, setProductDescription] = useState(props.description);
  const [productPrice, setProductPrice] = useState(props.price);
  const [priceIsValid, setPriceIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(nameIsValid && priceIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [nameIsValid, priceIsValid]);

  const nameChangeHandler = (event) => {
    setProductName(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setProductDescription(event.target.value);
  };

  const priceChangeHandler = (event) => {
    setProductPrice(event.target.value);
  };

  const validateNameHandler = () => {
    setNameIsValid(validationService.text(productName));
  };

  const validatePriceHandler = () => {
    setPriceIsValid(validationService.number(productPrice));
  };

  const clickHandler = (event) => {
    if (!productName && !productPrice) {
      event.preventDefault();
      setNameIsValid(false);
      setPriceIsValid(false);
    }
  };

  const editProductHandler = () => {
    setIsLoading(true);

    const productData = {
      name: productName,
      description: productDescription,
      price: productPrice
    };

    editProduct(productData, id);
    setIsLoading(false);
    window.location.reload(false);
  };

  return (
    <Modal onClose={props.onClose}>
      {
        isLoading ?
          <BeatLoader css={override} />
          :
          <form onSubmit={editProductHandler}>
            <Input
              label="Product Name"
              input={{
                type: 'text',
                id: 'product-name',
                value: `${productName}`,
                onChange: nameChangeHandler,
                onBlur: validateNameHandler
              }}
              isValid={nameIsValid}
              validationMessage="Please enter a valid name"
            />
            <Textarea
              label="Product Description (Max. 400 characters)"
              input={{
                type: 'text',
                id: 'product-description',
                value: `${productDescription}`,
                onChange: descriptionChangeHandler,
                rows: 5,
                maxLength: 400
              }}
            />
            <Input
              label="Product Price"
              input={{
                type: 'number',
                id: 'product-price',
                value: `${productPrice}`,
                onChange: priceChangeHandler,
                onBlur: validatePriceHandler
              }}
              isValid={priceIsValid}
              validationMessage="Please enter a valid price"
            />
            <Button
              id="edit-product-details-btn"
              className="primary-btn"
              type="submit"
              disabled={!formIsValid}
              onClick={clickHandler}
            >
              Edit Product
            </Button>
          </form>
      }
    </Modal>
  );
};

export default ProductEditForm;