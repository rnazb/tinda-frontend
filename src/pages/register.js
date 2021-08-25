import React, { useState, useContext, useEffect } from 'react';
import { registerUser } from '../services/APICalls/userAPICalls';
import validationService from '../services/validationServices';

import Input from '../components/UI/Input';
import { Container, Form, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import Button from '../components/UI/Button';

import UserContext from '../store/user-context';

import './register.styles.scss'

const Register = () => {
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [usernameIsValid, setUsernameIsValid] = useState();
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [accountType, setAccountType] = useState('customer');
  const [willRedirect, setWillRedirect] = useState(false);

  useEffect(() => {
    setUsernameIsValid(true);
    setEmailIsValid(true);
    setPasswordIsValid(true);
  }, []);

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onChangeRadioHandler = (event) => {
    setAccountType(event.target.value);
  };

  const validateUsernameHandler = () => {
    setUsernameIsValid(validationService.text(username));
  };

  const validateEmailHandler = () => {
    setEmailIsValid(validationService.email(email));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(validationService.text(password));
  };

  const clickHandler = (event) => {
    if (!username && !email && !password) {
      event.preventDefault();
      setUsernameIsValid(false);
      setEmailIsValid(false);
      setPasswordIsValid(false);
    }
  };

  const userData = {
    username: username,
    email: email,
    password: password,
    role: accountType
  };

  const registerUserHandler = async (event) => {
    event.preventDefault();
    const registerResponse = await registerUser(userData);

    setUser({
      id: registerResponse.data.id,
      username: username,
      role: accountType
    });

    localStorage.setItem('id', registerResponse.data.id);
    localStorage.setItem('username', username);
    localStorage.setItem('role', accountType);

    setWillRedirect(true);
  };

  return (
    willRedirect
      ?
      <Redirect to="/market" />
      :
      <Container id="register-container">
        <Card className="registration-form">
          <h1>Registration Page</h1>
          <Form onSubmit={registerUserHandler}>
            <Input
              label="Username:"
              input={{
                type: 'text',
                id: 'username',
                value: `${username}`,
                placeholder: 'Enter Username',
                onChange: usernameHandler,
                onBlur: validateUsernameHandler,
              }}
              isValid={usernameIsValid}
              validationMessage="Please enter a valid username"
            />
            <Input
              label="Email:"
              input={{
                type: 'text',
                id: 'email',
                value: `${email}`,
                placeholder: 'Enter Email',
                onChange: emailHandler,
                onBlur: validateEmailHandler,
              }}
              isValid={emailIsValid}
              validationMessage="Please enter a valid email"
            />
            <Input
              label="Password:"
              input={{
                type: 'text',
                id: 'password',
                value: `${password}`,
                placeholder: 'Enter Password',
                onChange: passwordHandler,
                onBlur: validatePasswordHandler,
              }}
              isValid={passwordIsValid}
              validationMessage="Please enter a valid password"
            />
            <Form.Label><strong>Account Type: </strong></Form.Label>
            <Form.Check
              label="Customer"
              name="account-type"
              type="radio"
              value='customer'
              checked={accountType === 'customer'}
              onChange={onChangeRadioHandler}
              required
            />
            <Form.Check
              label="Vendor"
              name="account-type"
              type="radio"
              value='vendor'
              checked={accountType === 'vendor'}
              onChange={onChangeRadioHandler}
              required
            />
            <Button
              className="primary-btn"
              type="submit"
              onClick={clickHandler}
            >
              Submit
            </Button>
          </Form>
        </Card>
      </Container>
  );
};

export default Register;