import { API } from "./api";

export const addTodo = (data: any) => {
  const url = "todos";
  return API.post(url, data, {
    headers: {
      Authorization: `Bearer %{token}`,
    },
  });
};

export const getTodos = () => {
  const url = "todos";
  return API.get(url, {
    headers: {
      Authorization: `Bearer %{token}`,
    },
  });
};

export const updateTodo = (id: number, data: any) => {
  const url = `todo/${id}`;
  return API.put(url, data, {
    headers: {
      Authorization: `Bearer %{token}`,
    },
  });
};

export const deleteTodo = (id: number) => {
  const url = `todo/${id}`;
  return API.delete(url, {
    headers: {
      Authorization: `Bearer %{token}`,
    },
  });
};
