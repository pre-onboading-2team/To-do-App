/* eslint-disable consistent-return */
/* eslint-disable no-alert */
import { ITodo } from "../types";
import { authHeader, axiosInstance } from "../utils";
import { getErrorMessage } from "../utils/errorHandler";

interface CreateTodoPayload {
  todo: string;
  onSuccess: () => void;
}

export const createTodo = async ({
  todo,
  onSuccess,
}: CreateTodoPayload): Promise<void> => {
  try {
    await axiosInstance.post("/todos", { todo }, authHeader());
    onSuccess();
  } catch (error) {
    alert(getErrorMessage(error));
  }
};

export const getTodos = async (): Promise<ITodo[] | undefined> => {
  try {
    const { data } = await axiosInstance.get("/todos", authHeader());
    return data;
  } catch (error) {
    alert(getErrorMessage(error));
  }
};

export const deleteTodo = async ({ id }: { id: number }): Promise<void> => {
  try {
    await axiosInstance.delete(`/todos/${id}`, authHeader());
  } catch (error) {
    alert(getErrorMessage(error));
  }
};

interface UpdateTodoPayload {
  id: number;
  todo: string;
  isCompleted: boolean;
}

export const updateTodo = async ({
  id,
  todo,
  isCompleted,
}: UpdateTodoPayload): Promise<void> => {
  try {
    await axiosInstance.put(
      `/todos/${id}`,
      { todo, isCompleted },
      authHeader()
    );
  } catch (error) {
    alert(getErrorMessage(error));
  }
};
