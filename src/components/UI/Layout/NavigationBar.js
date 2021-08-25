import React, { useContext } from 'react';
import { logoutUser } from '../../../services/APICalls/userAPICalls';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import UserContext from '../../../store/user-context';
import CartContext from '../../../store/cart-context';

import './NavigationBar.styles.scss';

const NavigationBar = () => {
  const { user, unsetUser, setUser } = useContext(UserContext);

  const cartCtx = useContext(CartContext);

  const logoutHandler = () => {
    logoutUser();

    setUser({
      id: null,
      username: null,
      role: null
    });
    unsetUser();

    window.location.replace('/market');
  };

  return (
    <Navbar id="top-nav" expand="lg" sticky="top">
      <Navbar.Brand href="/">Tinda</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">

          <Nav.Link className="mx-auto" href="/market">Market</Nav.Link>

          <Nav.Link className="mx-auto" href="/checkout">Cart ({cartCtx.cartItems?.length || 0})</Nav.Link>

          {
            user.role === 'vendor' &&
            <Nav.Link className="mx-auto" href={`/shop/${user.id}/dashboard`}>My Store</Nav.Link>
          }

          {
            user.id !== null &&
            <Nav.Link className="mx-auto" href={`/profile/${user.id}`}>My Profile ({user.username})</Nav.Link>
          }

          {
            user.id === null &&
            <Nav.Link className="mx-auto" href="/register">Register</Nav.Link>
          }

          {
            user.id === null &&
            <Nav.Link className="mx-auto" href="/login">Login</Nav.Link>

          }

          {
            user.id !== null &&
            <Nav.Link className="mx-auto" href="/" onClick={logoutHandler}>Logout</Nav.Link>
          }

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
