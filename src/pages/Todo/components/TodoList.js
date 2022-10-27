import React, { useEffect } from "react";

import { useGet, useTodoContext } from "../../../hooks";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const { items } = useTodoContext();
  const { getTodos } = useGet();
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <ul>
      {items.map((item) => {
        return <TodoListItem key={item.id} item={item} />;
      })}
    </ul>
  );
};

export default TodoList;
