import { axiosTodo } from "./api";
import { URL } from "./url";

export type TodoProps = {
  todo: string;
  isCompleted?: boolean;
};

export const createTodo = (data: TodoProps, token: string) => {
  return axiosTodo.post(URL.TODO, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getTodos = (token: string) => {
  return axiosTodo.get(URL.TODO, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const updateTodo = (id: number, data: TodoProps, token: string) => {
  return axiosTodo.put(`${URL.TODO}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const deleteTodo = (id: number, token: string) => {
  return axiosTodo.delete(`${URL.TODO}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
