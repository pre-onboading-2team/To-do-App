import "./TodoItem.css";

import axios from "axios";
import React, { useCallback, useState } from "react";
import { MdCancel, MdCheck, MdDelete, MdEdit } from "react-icons/md";

import { TodoService } from "../../apis";
import { TodoProps } from "../../apis/TodoService";
import { ACCESS_TOKEN } from "../../contexts/LoginContext";
import { useLocalStorage } from "../../hooks";
import { handleNetworkError } from "../../utils";
import { Message } from "../common";

export type TodoItemProps = {
  data: {
    id: number;
    todo: string;
    isCompleted: boolean;
    userId?: number;
  };
  getTodos: () => void;
};

type TodoItemBodyProps = {
  onToggle: () => void;
  onRemove: () => void;
  onEdit: () => void;
  isCompleted: boolean;
  todo: string;
};

type TodoItemEditProps = {
  id: number;
  todo: string;
  isCompleted: boolean;
  onText: () => void;
  tryUpdateTodo: (data: TodoProps) => Promise<UpdateTodoResultState | unknown>;
  getTodos: () => void;
};

type UpdateTodoSuccessState = {
  statusCode: number;
  statusText?: string;
  message?: string;
};
type UpdateTodoErrorState = {
  statusCode: number;
  statusText?: string;
  message?: string;
};
type UpdateTodoResultState = UpdateTodoSuccessState | UpdateTodoErrorState;

type RemoveTodoSuccessState = {
  statusCode: number;
  statusText?: string;
  message?: string;
};
type RemoveTodoErrorState = {
  statusCode: number;
  statusText?: string;
  message?: string;
};
type RemoveTodoResultState = RemoveTodoSuccessState | RemoveTodoErrorState;

type ItemMessageState = {
  display: boolean;
  message: string;
};

const initialItemMessage: ItemMessageState = {
  display: false,
  message: "",
};

type ItemEditMessageState = {
  display: boolean;
  message: string;
};

const initialEditItemMessage: ItemEditMessageState = {
  display: false,
  message: "",
};

const TodoItem = ({ data, getTodos }: TodoItemProps) => {
  const { id, todo, isCompleted } = data;
  const [mode, setMode] = useState("text");
  const [accessToken] = useLocalStorage(ACCESS_TOKEN, "");
  const [itemMessage, setItemMessage] =
    useState<ItemMessageState>(initialItemMessage);

  const { display, message } = itemMessage;

  const tryDeleteTodo = async (): Promise<RemoveTodoResultState | unknown> => {
    try {
      const res = await TodoService.deleteTodo(id, accessToken);
      return {
        statusCode: res.status,
        statusText: res.statusText,
        message: res.data.message,
      } as RemoveTodoSuccessState;
    } catch (e: unknown) {
      return handleNetworkError(e);
    }
  };

  const tryUpdateTodo = async (
    data: TodoProps
  ): Promise<UpdateTodoResultState | unknown> => {
    try {
      const res = await TodoService.updateTodo(id, data, accessToken);
      return {
        statusCode: res.status,
        statusText: res.statusText,
        message: res.data.message,
      } as UpdateTodoSuccessState;
    } catch (e: unknown) {
      return handleNetworkError(e);
    }
  };

  const onToggle = async () => {
    const updateResponse = (await tryUpdateTodo({
      todo,
      isCompleted: !isCompleted,
    })) as UpdateTodoResultState;
    if (updateResponse.statusCode === 200) {
      getTodos();
    } else {
      const errorStatus = updateResponse as UpdateTodoErrorState;
      const updateErrorMessage = {
        display: true,
        message: `${errorStatus.message}`,
      };
      setItemMessage(updateErrorMessage);
    }
  };

  const onRemove = async () => {
    const removeResponse = (await tryDeleteTodo()) as RemoveTodoResultState;
    if (removeResponse.statusCode === 204) {
      getTodos();
    } else {
      const errorStatus = removeResponse as RemoveTodoErrorState;
      const errorErrorMessage = {
        display: true,
        message: `${errorStatus.message}`,
      };
      setItemMessage(errorErrorMessage);
    }
  };

  const onEdit = () => {
    setMode("edit");
  };

  const onText = () => {
    setMode("text");
  };

  return (
    <li className={`TodoItem ${isCompleted ? "isCompleted" : ""}`}>
      {display && <Message type="negative" message={message} />}
      {mode === "text" ? (
        <TodoItemBody
          onToggle={onToggle}
          onRemove={onRemove}
          onEdit={onEdit}
          isCompleted={isCompleted}
          todo={todo}
        />
      ) : (
        <TodoItemEdit
          onText={onText}
          id={id}
          isCompleted={isCompleted}
          todo={todo}
          tryUpdateTodo={tryUpdateTodo}
          getTodos={getTodos}
        />
      )}
    </li>
  );
};

const TodoItemBody = ({
  isCompleted,
  todo,
  onToggle,
  onRemove,
  onEdit,
}: TodoItemBodyProps) => {
  return (
    <div>
      <input
        className="checkbox"
        type="checkbox"
        checked={isCompleted}
        onChange={onToggle}
      />
      <span className="text">{todo}</span>
      <span className="edit" onClick={onEdit}>
        <MdEdit />
      </span>
      <span className="remove" onClick={onRemove}>
        <MdDelete />
      </span>
    </div>
  );
};

const TodoItemEdit = ({
  id,
  todo,
  onText,
  tryUpdateTodo,
  getTodos,
  isCompleted,
}: TodoItemEditProps) => {
  const [value, setValue] = useState(todo);
  const [editMessage, setEditMessage] = useState(initialEditItemMessage);
  const { display, message } = editMessage;

  const onSave = async () => {
    const updateResponse = (await tryUpdateTodo({
      todo: value,
      isCompleted,
    })) as UpdateTodoResultState;
    if (updateResponse.statusCode === 200) {
      getTodos();
      onText();
    } else {
      const errorStatus = updateResponse as UpdateTodoErrorState;
      const updateErrorMessage = {
        display: true,
        message: `${errorStatus.message}`,
      };
      setEditMessage(updateErrorMessage);
    }
  };

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const onCancel = () => {
    setValue(todo);
    onText();
  };

  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
      {display && <Message type="negative" message={message} />}
      <MdCheck onClick={onSave} />
      <MdCancel onClick={onCancel} />
    </div>
  );
};

export default TodoItem;
