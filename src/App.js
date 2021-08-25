import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import NavigationBar from './components/UI/Layout/NavigationBar';
import Footer from './components/UI/Layout/Footer';

import Home from './pages/home';
import Market from './pages/market';
import Shop from './pages/shop';
import Profile from './pages/profile';
import Checkout from './pages/checkout';
import ProductView from './pages/productView';
import Register from './pages/register';
import Login from './pages/login';
import NotFound from './pages/notFound';

import ShopDashboard from './components/UI/Dashboard/ShopDashboard';

import { UserProvider } from './store/user-context';
import { CartProvider } from './store/cart-context';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const [user, setUser] = useState({
    id: localStorage.getItem('id'),
    username: localStorage.getItem('username'),
    role: localStorage.getItem('role')
  });

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    if (!localStorage.getItem('cart-items')) {
      localStorage.setItem('cart-items', JSON.stringify([]));
    }

    if (!localStorage.getItem('cart-total')) {
      localStorage.setItem('cart-total', '0');
    }
  }, []);

  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart-items')));

  const [cartTotal, setCartTotal] = useState(JSON.parse(localStorage.getItem('cart-total')));

  const unsetCart = () => {
    localStorage.setItem('cart-items', JSON.stringify([]));
    localStorage.setItem('cart-total', '0');
  };

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <CartProvider value={{
          cartItems,
          setCartItems,
          cartTotal,
          setCartTotal,
          unsetCart
        }}>
          <Router>
            <NavigationBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/market" component={Market} />
              <Route exact path="/shop/:id" component={Shop} />
              <Route exact path="/shop/:id/dashboard" component={ShopDashboard} />
              <Route exact path="/profile/:id" component={Profile} />
              <Route exact path="/product/:id" component={ProductView} />
              <Route exact path="/checkout" component={Checkout} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </Router>
        </CartProvider>
      </UserProvider>
    </>
  );
};

export default App;