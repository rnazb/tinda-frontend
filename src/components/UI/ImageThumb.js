import './ImageThumb.styles.scss';

const ImageThumb = (props) => {
  return (
    <div className="thumb" id={props.id}>
      <div className="thumb-inner">
        <img
          src={props.source}
          className="thumb-image"
          alt=""
        />
      </div>
    </div>
  );
};

export default ImageThumb;