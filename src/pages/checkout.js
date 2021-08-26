import { useState, useContext, useEffect } from 'react';
import { placeOrder } from '../services/APICalls/ordersAPICalls';

import CheckoutListItem from '../components/TableListItems/CheckoutListItem';

import UserContext from '../store/user-context';
import CartContext from '../store/cart-context';

import { Container, Card, Table } from "react-bootstrap";
import Button from '../components/UI/Button';

import './checkout.styles.scss';

const Checkout = () => {

  const { user } = useContext(UserContext);
  const cartCtx = useContext(CartContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Trigger component update

  useEffect(() => {
    return () => { };
  }, [cartCtx.cartTotal, cartCtx.cartItems]);

  // Set loggedin state

  useEffect(() => {
    if (user.id && user.username && user.role) {
      setIsLoggedIn(true);
    }
  }, [user.id, user.username, user.role]);

  // Render line items for order

  const cartUpdateHandler = () => {
    localStorage.setItem('cart-total', JSON.stringify(cartCtx.cartTotal));
    localStorage.setItem('cart-items', JSON.stringify(cartCtx.cartItems));
  };

  const placeOrderHandler = async () => {
    await placeOrder(orderList);
    cartCtx.unsetCart();
  };

  const lineItemsList = cartCtx.cartItems.map(item => {
    const addQuantityHandler = () => {
      ++item.amount;
      let newCartTotal = cartCtx.cartTotal += item.price;

      cartCtx.setCartTotal(newCartTotal);
      cartUpdateHandler();
    };

    const minusQuantityHandler = () => {
      --item.amount;
      let newCartTotal = cartCtx.cartTotal -= item.price;
      cartCtx.setCartTotal(newCartTotal);

      if (item.amount <= 0) {
        const itemIndex = cartCtx.cartItems.indexOf(item);
        cartCtx.cartItems.splice(itemIndex, 1);
      }

      cartUpdateHandler();
    };

    const removeItemHandler = () => {
      let newCartTotal = cartCtx.cartTotal -= item.amount * item.price;
      cartCtx.setCartTotal(newCartTotal);

      const itemIndex = cartCtx.cartItems.indexOf(item);
      cartCtx.cartItems.splice(itemIndex, 1);
      cartUpdateHandler();
    };

    return (
      <CheckoutListItem
        key={item.id}
        id={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onMinus={minusQuantityHandler}
        onAdd={addQuantityHandler}
        onRemove={removeItemHandler}
      />
    );
  });

  // Load order list

  const orderList = cartCtx.cartItems.map(item => {
    const {
      id: productId,
      amount: productAmount
    } = item;

    const orderItem = {
      id: productId,
      amount: productAmount
    };

    return orderItem;
  });

  // Render component

  return (
    <Container id="checkout-container">
      <Card className="checkout-card">
        <Card.Header>
          <h2>My Cart</h2>
        </Card.Header>
        {
          cartCtx.cartItems.length > 0 ?
            <>
              <Table className="mb-0" bordered responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Price</th>
                    <th>Remove from cart</th>
                  </tr>
                </thead>
                <tbody>
                  {lineItemsList}
                </tbody>
              </Table>
              <Card.Footer>
                <h4>Total: PHP {cartCtx.cartTotal.toFixed(2)}</h4>
                <form onSubmit={placeOrderHandler}>
                  <Button
                    id="order-button"
                    className="primary-btn"
                    type="submit"
                    disabled={!isLoggedIn}
                  >
                    Order
                  </Button>
                  {
                    !isLoggedIn && <span>Please log in to post a review</span>
                  }
                </form>
              </Card.Footer>
            </>
            :
            <Card.Body>
              <p>No products in cart...</p>
            </Card.Body>
        }
      </Card>
    </Container>
  );
};

export default Checkout;