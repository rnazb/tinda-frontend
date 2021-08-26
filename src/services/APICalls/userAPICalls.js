import axios from "axios";

const callURL = process.env.REACT_APP_SERVER || 'http://localhost:4000';

export const registerUser = async (userData) => {
  return await axios({
    method: 'POST',
    url: `${callURL}/api/users/register`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: userData,
    withCredentials: true
  });
};

export const loginUser = async (userData) => {
  return await axios({
    method: 'POST',
    url: `${callURL}/api/users/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: userData,
    withCredentials: true
  });
};

export const logoutUser = async (userId) => {
  return await axios({
    method: 'GET',
    url: `${callURL}/api/users/logout`,
    withCredentials: true
  });
};