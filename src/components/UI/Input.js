import React from 'react';

import './Input.styles.scss';

export const Textarea = React.forwardRef((props, ref) => {
  return (
    <div className="custom-input-group">
      <label className="custom-label" htmlFor={props.input.id}>
        {props.label}
      </label>
      <textarea className={`custom-textarea ${!props.isValid && "invalid-input"}`} ref={ref} {...props.input} />
      {!props.isValid && <p className="invalid-message">{props.validationMessage}</p>}
    </div>
  );
});

const Input = React.forwardRef((props, ref) => {
  return (
    <>
      <div className="custom-input-group">
        <label className="custom-label" htmlFor={props.input.id}>
          {props.label}
        </label>
        <input className={`custom-input ${!props.isValid && "invalid-input"}`} ref={ref} {...props.input} />
        {!props.isValid && <p className="invalid-message">{props.validationMessage}</p>}
      </div>
    </>
  );
});

export default Input;
