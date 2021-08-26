import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { loginUser } from '../services/APICalls/userAPICalls';
import validationService from '../services/validationServices';

import Input from '../components/UI/Input';
import { Container, Card } from 'react-bootstrap';

import Button from '../components/UI/Button';

import UserContext from '../store/user-context';

import './login.styles.scss';

import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';

const override = css`
  display: flex;
  margin: 0;
  justify-content: center;
  padding: 8rem 0;
  border-color: red;
`;

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  const [enteredUsername, setEnteredUsername] = useState('');
  const [usernameIsValid, setUsernameIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [willRedirect, setWillRedirect] = useState(false);

  useEffect(() => {
    setUsernameIsValid(true);
    setPasswordIsValid(true);
  }, []);

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateUsernameHandler = () => {
    setUsernameIsValid(validationService.text(enteredUsername));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(validationService.text(enteredPassword));
  };

  const clickHandler = (event) => {
    if (!enteredUsername && !enteredPassword) {
      event.preventDefault();
      setUsernameIsValid(false);
      setPasswordIsValid(false);
    }
  };

  const userData = {
    username: enteredUsername,
    password: enteredPassword
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const loginResponse = await loginUser(userData);

    setUser({
      id: loginResponse.data.id,
      username: loginResponse.data.username,
      role: loginResponse.data.role
    });

    localStorage.setItem('id', loginResponse.data.id);
    localStorage.setItem('username', loginResponse.data.username);
    localStorage.setItem('role', loginResponse.data.role);

    setEnteredUsername('');
    setEnteredPassword('');
    setIsLoading(false);
    setDidSubmit(true);
    setWillRedirect(true);
  };

  useEffect(() => {
    return () => { };
  }, [didSubmit]);

  return (
    user.username || willRedirect
      ?
      <Redirect to='/market' />
      :
      <>
        <Container id="login-container">
          <Card className="login-form">
            <h1>Login Page!</h1>
            {isLoading ?
              <BeatLoader css={override} />
              :
              <form onSubmit={loginHandler}>
                <Input
                  label="Username"
                  input={{
                    type: 'text',
                    id: 'username',
                    value: `${enteredUsername}`,
                    onChange: usernameChangeHandler,
                    onBlur: validateUsernameHandler
                  }}
                  isValid={usernameIsValid}
                  validationMessage="Please enter a valid username"
                />
                <Input
                  label="Password"
                  input={{
                    type: 'password',
                    id: 'password',
                    value: `${enteredPassword}`,
                    onChange: passwordChangeHandler,
                    onBlur: validatePasswordHandler
                  }}
                  isValid={passwordIsValid}
                  validationMessage="Please enter a valid password"
                />
                <Button
                  className="primary-btn"
                  type="submit"
                  onClick={clickHandler}
                >
                  Login
                </Button>
              </form>
            }
          </Card>
        </Container>
      </>
  );
};

export default Login;