import React from 'react';
import ImageThumb from '../ImageThumb';

import './ImageUpload.styles.scss';

const ImageUpload = (props) => {
  const thumbs = props.files.map(file => (
    <ImageThumb
      key={file.name}
      id={file._id}
      source={file.preview}
    />
  ));

  return (
    <>
      <label><strong>Image Upload</strong></label>
      <section className="image-file-container">
        <div {...props.getRootProps({ className: 'dropzone' })}>
          <input {...props.getInputProps()} multiple />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        {
          props.files?.length > 0 &&
          <aside className="thumbs-container">
            {thumbs}
          </aside>
        }
      </section>
    </>
  );
};

export default ImageUpload;