import axios from "axios";
import React, { useEffect, useState } from "react";

import TODO_API, { TodoProps } from "../../apis/TODO_API";
import { ACCESS_TOKEN } from "../../contexts/LoginContext";
import useLocalStorage from "../../utils/useLocalStorage";
import Button from "../common/Button";
import { Input } from "../common/Input";
import Message from "../common/Message";

type CreateTodoSuccessState = {
  statusCode: number;
  statusText?: string;
  message?: string;
};
type CreateTodoErrorState = {
  statusCode: number;
  statusText?: string;
  message?: string;
};
type CreateTodoResultState = CreateTodoSuccessState | CreateTodoErrorState;

type FormMessageState = {
  display: boolean;
  message: string;
};

const initialFormMessage: FormMessageState = {
  display: false,
  message: "",
};

const TodoForm = ({ getTodos }: { getTodos: () => void }) => {
  const [value, setValue] = useState("");
  const [accessToken] = useLocalStorage(ACCESS_TOKEN, "");
  const [formMessage, setFormMessage] =
    useState<FormMessageState>(initialFormMessage);

  const { display, message } = formMessage;

  const createTodo = async (
    data: TodoProps
  ): Promise<CreateTodoResultState | unknown | void> => {
    try {
      const res = await TODO_API.createTodo(data, accessToken);
      return {
        statusCode: res.status,
        statusText: res.statusText,
        message: res.data.message,
      } as CreateTodoSuccessState;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        return {
          statusCode: e.response?.status,
          statusText: e.response?.statusText,
          message: e.response?.data.message,
        } as CreateTodoErrorState;
      }
      console.error(e);
      return {
        statusCode: 500,
        statusText: "알 수 없는 서버 오류",
        message: "서버 오류가 발생했습니다",
      };
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const createResponse = (await createTodo({
      todo: `${value}`,
    })) as CreateTodoResultState;
    if (createResponse.statusCode === 201) {
      getTodos();
      setValue("");
    } else {
      const errorStatus = createResponse as CreateTodoErrorState;
      const createErrorMessage = {
        display: true,
        message: `${errorStatus.message}`,
      };
      setFormMessage(createErrorMessage);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return (
    <form onSubmit={onSubmit}>
      {display ? <Message type="negative" message={message} /> : null}
      <Input
        type="text"
        value={value}
        placeholder="할 일을 입력해주세요"
        onChange={onChange}
      />
      <Button type="submit">등록</Button>
    </form>
  );
};

export default TodoForm;
