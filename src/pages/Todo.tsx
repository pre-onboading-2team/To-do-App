import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TodoService } from "../apis";
import { Button, Header, Layout, Message } from "../components/common";
import { TodoForm, TodoList } from "../components/Todo";
import {
  ACCESS_TOKEN,
  useLoginDispatch,
  useLoginState,
} from "../contexts/LoginContext";
import { TodosState } from "../contexts/TodosContext";
import { useLocalStorage } from "../hooks";
import { handleNetworkError } from "../utils";

type GetTodoSuccessState = {
  statusCode: number;
  statusText: string;
  data: TodosState;
};
type GetTodoErrorState = {
  statusCode: number;
  statusText: string;
  message?: string;
};

type GetTodoResultState = GetTodoSuccessState | GetTodoErrorState;

type TodoMessageState = {
  display: boolean;
  message: string;
};

const initialTodoMessage: TodoMessageState = {
  display: false,
  message: "",
};

export const Todo = () => {
  const navigate = useNavigate();
  const loginState = useLoginState();
  const loginDispatch = useLoginDispatch();
  const [accessToken, setAccessToken] = useLocalStorage(ACCESS_TOKEN, "");
  const [todos, setTodos] = useState<TodosState | null>(null);
  const [todoMessage, setTodoMessage] =
    useState<TodoMessageState>(initialTodoMessage);

  const { isLoggedIn } = loginState;
  const { display, message } = todoMessage;

  const tryGetTodos = async (): Promise<GetTodoResultState | unknown> => {
    try {
      const res = await TodoService.getTodos(accessToken);
      return {
        statusCode: res.status,
        statusText: res.statusText,
        data: res.data,
      } as GetTodoSuccessState;
    } catch (e: unknown) {
      return handleNetworkError(e);
    }
  };

  const getTodos = async () => {
    const fetched = (await tryGetTodos()) as GetTodoResultState;
    if (fetched.statusCode === 200) {
      const successTodos = fetched as GetTodoSuccessState;
      setTodos(successTodos.data);
    } else {
      const errorTodos = fetched as GetTodoErrorState;
      const todoErrorMessage = {
        display: true,
        message: `${errorTodos.message}`,
      };
      setTodoMessage(todoErrorMessage);
    }
  };

  const goHome = () => {
    navigate("/");
  };

  const logout = () => {
    loginDispatch({ type: "LOGOUT" });
    setAccessToken("");
    goHome();
  };

  useEffect(() => {
    if (!isLoggedIn) goHome();

    getTodos();
  }, []);

  return (
    <Layout>
      <Header>할 일 목록</Header>
      {display && <Message type="negative" message={message} />}
      <TodoForm getTodos={getTodos} />
      <TodoList getTodos={getTodos} todos={todos} />
      <Button onClick={logout}>로그아웃</Button>
    </Layout>
  );
};
