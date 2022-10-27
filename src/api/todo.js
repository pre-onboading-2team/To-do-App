import axios from 'axios';
import { BASE_URL } from '../config';

const instance = axios.create({
  baseURL: BASE_URL,
});

export const createToDoAPI = async (todo, accessToken) => {
  try {
    const response = await instance.post(
      '/todos',
      {
        todo,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getToDosAPI = async accessToken => {
  try {
    const response = await instance.get('/todos', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateToDoAPI = async (id, todo, isCompleted, accessToken) => {
  try {
    const response = await instance.put(
      `/todos/${id}`,
      {
        todo,
        isCompleted,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteToDoAPI = async (id, accessToken) => {
  try {
    const response = await instance.delete(`/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
