import { useState, useEffect } from "react";
import { Redirect, useParams } from 'react-router-dom';
import { deleteProduct } from "../../../services/APICalls/productsAPICalls";

import Modal from "../Modal";
import Button from '../Button';

import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';

const override = css`
  display: flex;
  margin: 0;
  justify-content: center;
  padding: 8rem 0;
  border-color: red;
`;

const ProductDeleteConfirm = (props) => {
  const { id } = useParams();
  const [willRedirect, setWillRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteProductHandler = async () => {
    setIsLoading(true);
    await deleteProduct(id);
    setIsLoading(false);
    setWillRedirect(true);
  };

  useEffect(() => {
    return () => { };
  }, [willRedirect]);

  return (
    willRedirect
      ?
      <Redirect to="/market" />
      :
      <Modal id="delete-confirm-modal" onClose={props.onClose}>
        {
          isLoading ?
            <BeatLoader css={override} />
            :
            <>
              <h2>Are you sure you want to delete this product?</h2>
              <p id="delete-warning-para">You won't be able to recover this later on</p>
              <form onSubmit={deleteProductHandler}>
                <Button
                  className="danger-btn"
                  type="submit"
                >
                  Delete Product
                </Button>
              </form>
            </>
        }
      </Modal>
  );
};

export default ProductDeleteConfirm;