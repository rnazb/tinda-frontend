import { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

import { addProduct } from "../../../services/APICalls/productsAPICalls";
import validationService from "../../../services/validationServices";

import Modal from "../Modal";
import Input, { Textarea } from "../Input";
import ImageUpload from "./ImageUpload";

import { Button } from "react-bootstrap";

import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';

const override = css`
  display: flex;
  margin: 0;
  justify-content: center;
  padding: 8rem 0;
  border-color: red;
`;

const ProductAddForm = (props) => {
  const [productName, setProductName] = useState('');
  const [nameIsValid, setNameIsValid] = useState();
  const [productDescription, setProductDescription] = useState('');
  const [descriptionIsValid, setDescriptionIsValid] = useState();
  const [productPrice, setProductPrice] = useState(0);
  const [priceIsValid, setPriceIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [files, setFiles] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [didSend, setDidSend] = useState(false);

  useEffect(() => {
    setNameIsValid(true);
    setDescriptionIsValid(true);
    setPriceIsValid(true);
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(nameIsValid && priceIsValid && descriptionIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [nameIsValid, descriptionIsValid, priceIsValid]);

  useEffect(() => {
    return () => { };
  }, [didSend]);

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

  const validateDescriptionHandler = () => {
    setDescriptionIsValid(validationService.text(productDescription));
  };

  const validatePriceHandler = () => {
    setPriceIsValid(validationService.number(productPrice));
  };

  const clickHandler = (event) => {
    if (!productName && !productPrice && !productDescription) {
      event.preventDefault();
      setNameIsValid(false);
      setDescriptionIsValid(false);
      setPriceIsValid(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const addProductHandler = () => {
    setIsLoading(true);

    const productData = {
      name: productName,
      description: productDescription,
      price: productPrice,
    };

    const formData = new FormData();
    formData.append('details', JSON.stringify(productData));
    files.forEach(file => formData.append('files', file));

    addProduct(formData);
    setIsLoading(false);
    setDidSend(true);
  };

  return (
    <>
      {
        didSend ?
          <Redirect to={`/market`} />
          :
          <Modal id="product-add-modal" onClose={props.onClose}>
            {
              isLoading ?
                <BeatLoader css={override} />
                :
                <form onSubmit={addProductHandler}>
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
                      onBlur: validateDescriptionHandler,
                      rows: 5,
                      maxLength: 400
                    }}
                  />
                  <Input
                    label="Product Price"
                    input={{
                      type: 'number',
                      id: 'product-price',
                      value: productPrice,
                      onChange: priceChangeHandler,
                      onBlur: validatePriceHandler
                    }}
                    isValid={priceIsValid}
                    validationMessage="Please enter a valid price"
                  />
                  <ImageUpload
                    id="image-upload"
                    files={files}
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                  />
                  <Button
                    type="submit"
                    disabled={!formIsValid}
                    onClick={clickHandler}
                  >
                    Add Product
                  </Button>
                </form>
            }
          </Modal>
      }
    </>
  );
};

export default ProductAddForm;