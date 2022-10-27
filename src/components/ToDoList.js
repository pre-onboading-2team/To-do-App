import React from 'react';
import styled from 'styled-components';
import ToDoListItem from './ToDoListItem';

const ToDoList = ({ todos, token, setTodos }) => {
  return (
    <TDList className="ToDoList">
      {todos.map(todo => (
        <ToDoListItem
          item={todo}
          key={todo.id}
          token={token}
          setTodos={setTodos}
        />
      ))}
    </TDList>
  );
};

export default ToDoList;

const TDList = styled.ul`
  margin: 20px;
  padding: 5px;
  width: 80%;
  height: 350px;
  overflow: auto;
`;
