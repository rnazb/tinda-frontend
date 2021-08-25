import axios from "axios";


export const registerUser = async (userData) => {
  return await axios({
    method: 'POST',
    url: 'http://localhost:4000/api/users/register',
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
    url: 'http://localhost:4000/api/users/login',
    headers: {
      'Content-Type': 'application/json'
    },
    data: userData,
    withCredentials: true
  });
};

export const logoutUser = (userId) => {
  return axios({
    method: 'GET',
    url: 'http://localhost:4000/api/users/logout',
    withCredentials: true
  });
};