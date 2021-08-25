import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDropzone } from 'react-dropzone';

import { addProductImages } from '../../../services/APICalls/productsAPICalls';

import Modal from "../Modal";
import ImageUpload from './ImageUpload';
import ImageDelete from './ImageDelete';

import { Tabs, Tab } from 'react-bootstrap';

import Button from '../Button';

import './ImageEditForm.styles.scss';

import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';

const override = css`
  display: flex;
  margin: 0;
  justify-content: center;
  padding: 8rem 0;
  border-color: red;
`;

const ImageEditForm = (props) => {
  const { id } = useParams();
  const [key, setKey] = useState('add');
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const addImagesHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('productId', JSON.stringify(id));
    files.forEach(file => formData.append('files', file));

    setIsLoading(true);
    await addProductImages(formData, id);
    setIsLoading(false);
    window.location.reload(false);
  };

  return (
    <Modal id="image-update-modal" onClose={props.onClose}>
      <Tabs
        id="images-services"
        activeKey={key}
        onSelect={key => setKey(key)}
      >
        <Tab eventKey="add" title="New Images">
          {
            isLoading ?
              <BeatLoader css={override} />
              :
              <form onSubmit={addImagesHandler}>
                <ImageUpload
                  id="image-upload"
                  files={files}
                  getRootProps={getRootProps}
                  getInputProps={getInputProps}
                />
                <Button id="add-images-btn" className="primary-btn" type="submit">
                  Update Images
                </Button>
              </form>
          }
        </Tab>

        <Tab eventKey="delete" title="Current Images">
          <ImageDelete
            id="image-delete"
            existingFiles={props.existingImages}
            productId={id}
          />
        </Tab>
      </Tabs>
    </Modal>
  );
};

export default ImageEditForm;