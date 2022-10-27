import request from "./request";
import server from "./url";

export type TodoProps = {
  todo: string;
  isCompleted?: boolean;
};

const TODO_API = {
  baseURL() {
    return server.preOnboarding;
  },
  createTodo(data: TodoProps, token: string) {
    return request.post(`${this.baseURL()}todos`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  getTodos(token: string) {
    return request.get(`${this.baseURL()}todos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  updateTodo(id: number, data: TodoProps, token: string) {
    return request.put(`${this.baseURL()}todos/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  deleteTodo(id: number, token: string) {
    return request.delete(`${this.baseURL()}todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default TODO_API;
