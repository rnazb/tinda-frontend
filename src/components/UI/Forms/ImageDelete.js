import { useState } from 'react';

import { deleteProductImages } from '../../../services/APICalls/productsAPICalls';

import ImageThumb from '../ImageThumb';

import Button from '../Button';

import './ImageDelete.styles.scss';

import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';

const override = css`
  display: flex;
  margin: 0;
  justify-content: center;
  padding: 8rem 0;
  border-color: red;
`;

const ImageDelete = (props) => {
  const [isSelected, setIsSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await deleteProductImages(isSelected, props.productId);
    setIsLoading(false);
    window.location.reload(false);
  };

  const thumbs = props.existingFiles.map(file => {
    const thumbnailUrl = file.url.replace('/upload', '/upload/w_200');

    const checkboxChangeHandler = (event) => {
      let index = isSelected.indexOf(file.filename);
      let imageFilename = event.target.value;
      let selectedArray = isSelected;

      if (index > -1) {
        selectedArray.splice(index, 1)
      }

      if (index < 0) {
        selectedArray.push(imageFilename)
      }
      setIsSelected(selectedArray);
    }

    return (
      <div className="delete-thumb" key={file._id}>
        <ImageThumb
          id={file._id}
          source={thumbnailUrl}
          isCurrentImages={true}
          filename={file.filename}
        />
        <input
          className="delete-checkbox"
          type="checkbox"
          value={file.filename}
          name="deleteImage"
          onChange={checkboxChangeHandler}
          selected={isSelected.includes(file._id)}
        />
      </div>
    );
  });

  return (
    <>
      {
        isLoading ?
          <BeatLoader css={override} />
          :
          <form onSubmit={submitHandler}>
            <label><strong>Select Images to Delete</strong></label>
            <section id="existing-image-container">
              {thumbs}
            </section>
            <Button
              id="image-delete-btn"
              className="danger-btn"
              type="submit"
            >
              Delete selected images
            </Button>
          </form>
      }
    </>
  );
};

export default ImageDelete;