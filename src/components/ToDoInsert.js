import React, { useState } from 'react';
import { MdOutlineAdd } from 'react-icons/md';
import styled from 'styled-components';

const ToDoInsert = ({ onInsertTodo }) => {
  const [value, setValue] = useState('');
  const onChange = e => {
    setValue(e.target.value);
  };

  const onAddList = e => {
    e.preventDefault();
    onInsertTodo(value);
    setValue('');
  };

  return (
    <InsertBox>
      <ToDoInput
        type="text"
        autoComplete="off"
        placeholder="할 일을 입력해주세요"
        value={value}
        onChange={onChange}
      ></ToDoInput>
      <button onClick={onAddList}>
        <MdOutlineAdd className="addLogo" />
      </button>
    </InsertBox>
  );
};

export default ToDoInsert;

const InsertBox = styled.div`
  display: flex;
  align-items: center;
  width: 90%;

  .addLogo {
    font-size: 2rem;
  }

  > button {
    background-color: #ffffff;
    border: 0;
    outline: 0;
    cursor: pointer;
  }
`;

const ToDoInput = styled.input`
  ${({ theme }) => theme.flex('center', 'center', null)};
  width: 80%;
  height: 50px;
  margin: 20px;
  padding: 0 10px;
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline-color: rebeccapurple;

  &::placeholder {
    font-size: 12px;
  }
`;
