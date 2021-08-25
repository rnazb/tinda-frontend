import ReactDOM from 'react-dom';

import './Modal.styles.scss';

const Backdrop = (props) => {
  return <div className="backdrop-styles" onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div id={props.id} className={`modal-overlay-styles`} onClick={props.onClose}>
      {props.children}
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay id={props.id}>
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;