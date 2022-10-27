import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createTodo, getTodos } from "../../apis";
import { Button, Input, TodoCard } from "../../components";
import { useValidate } from "../../hooks";
import { ITodo } from "../../types";
import { getTokenFromLocalStorage, todoValidation } from "../../utils";
import * as S from "./Todo.style";

const Todo = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [todoValue, todoError, todoValid, handleTodo, setTodoValue] =
    useValidate(todoValidation);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo({
      todo: todoValue,
      onSuccess: () => {
        getTodos().then((data) => {
          if (data) setTodos(data);
          setTodoValue("");
        });
      },
    });
  };

  useEffect(() => {
    const token = getTokenFromLocalStorage();

    if (!token) {
      navigate("/");
    }

    getTodos().then((data) => {
      if (data) setTodos(data);
    });
  }, [navigate]);

  return (
    <S.Container>
      <h1>ToDo</h1>
      <S.Form onSubmit={handleSubmit}>
        <Input
          type="text"
          id="todo"
          value={todoValue}
          isError={todoError}
          errorMsg="1글자 이상 입력해주세요."
          onChange={(e) => handleTodo(e)}
        />
        <Button disabled={!todoValid}>등록</Button>
      </S.Form>
      <S.UList>
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            id={todo.id}
            todo={todo.todo}
            isCompleted={todo.isCompleted}
            setTodos={setTodos}
          />
        ))}
      </S.UList>
    </S.Container>
  );
};

export default Todo;
