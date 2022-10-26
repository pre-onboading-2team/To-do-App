import axios from 'axios';
import { BASE_URL } from '../config';

const instance = axios.create({
  baseURL: BASE_URL,
});

export const signUpAPI = async (email, password) => {
  try {
    const response = await instance.post(
      '/auth/signup',
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const signInAPI = async (email, password) => {
  try {
    const response = await instance.post(
      '/auth/signin',
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
