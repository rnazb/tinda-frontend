import { useState, useEffect, useRef } from 'react';

import Button from '../Button';
import Input from '../Input';

import './CartItemAddForm.styles.scss';

const CartItemAddForm = (props) => {
  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  useEffect(() => {
    setAmountIsValid(true);
  }, []);

  const clickHandler = (event) => {
    if (amountInputRef.current.value <= 0) {
      event.preventDefault();
      setAmountIsValid(false);
    }
  };

  const addQuantityHandler = (event) => {
    event.preventDefault();
    ++amountInputRef.current.value;
    if (amountInputRef.current.value > 0) {
      setAmountIsValid(true);
    }
  };

  const minusQuantityHandler = (event) => {
    event.preventDefault();
    if (amountInputRef.current.value > 0) {
      --amountInputRef.current.value;
    }
    if (amountInputRef.current.value < 1) {
      setAmountIsValid(false);
    }
  };

  const submitHandler = () => {
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form id="cart-form" onSubmit={submitHandler}>
      <div>
        <label id="amount-label" htmlFor="amount"><h5>Amount</h5></label>
        <div className="quantity-btn-group">
          <Button className="quantity-btn" onClick={minusQuantityHandler}>-</Button>
          <Input
            ref={amountInputRef}
            input={{
              id: 'amount',
              type: 'number',
              step: '1',
              min: '0',
              defaultValue: '1'
            }}
            isValid={amountIsValid}
            validationMessage="Please enter a valid amount"
          />
          <Button className="quantity-btn" onClick={addQuantityHandler}>+</Button>
        </div>
      </div>
      <Button onClick={clickHandler} className="primary-btn" type="submit">Add to Cart</Button>
    </form>
  );
};

export default CartItemAddForm;