import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TODO_API from "../apis/TODO_API";
import Button from "../components/common/Button";
import Layout from "../components/common/Layout";
import Message from "../components/common/Message";
import PageTitle from "../components/common/PageTitle";
import { TodoForm, TodoList } from "../components/Todo";
import {
  ACCESS_TOKEN,
  useLoginDispatch,
  useLoginState,
} from "../contexts/LoginContext";
import { TodosState } from "../contexts/TodosContext";
import useLocalStorage from "../utils/useLocalStorage";

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

const Todo = () => {
  const navigate = useNavigate();
  const loginState = useLoginState();
  const loginDispatch = useLoginDispatch();
  const [accessToken, setAccessToken] = useLocalStorage(ACCESS_TOKEN, "");
  const [todos, setTodos] = useState<TodosState | null>(null);
  const [todoMessage, setTodoMessage] =
    useState<TodoMessageState>(initialTodoMessage);

  const { isLoggedIn } = loginState;
  const { display, message } = todoMessage;

  const fetchTodos = async (): Promise<GetTodoResultState | unknown> => {
    try {
      const res = await TODO_API.getTodos(accessToken);
      return {
        statusCode: res.status,
        statusText: res.statusText,
        data: res.data,
      } as GetTodoSuccessState;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        return {
          statusCode: e.response?.status,
          statusText: e.response?.statusText,
          data: e.response?.data,
        } as GetTodoErrorState;
      }
      console.error(e);
      return {
        statusCode: 500,
        statusText: "알 수 없는 서버 오류",
        message: "서버 오류가 발생했습니다",
      };
    }
  };

  const getTodos = async () => {
    const fetched = (await fetchTodos()) as GetTodoResultState;
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
      <PageTitle>할 일 목록</PageTitle>
      {display ? <Message type="negative" message={message} /> : null}
      <TodoForm getTodos={getTodos} />
      <TodoList getTodos={getTodos} todos={todos} />
      <Button onClick={logout}>로그아웃</Button>
    </Layout>
  );
};

export default Todo;
