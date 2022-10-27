import React, { useState } from 'react';
import axios from 'axios';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { BsXLg, BsCheckLg } from 'react-icons/bs';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import styled, { css } from 'styled-components';
import { updateToDoAPI, deleteToDoAPI } from '../api/todo';

const ToDoListItem = ({ item, token, setTodos }) => {
  const { id, todo, isCompleted } = item;

  const [edited, setEdited] = useState(true);
  const [editValue, setEditValue] = useState(todo);

  const onClickEditButton = () => {
    setEdited(!edited);
  };

  const onClickCancelButton = () => {
    setEdited(!edited);
    setEditValue(todo);
  };

  const onChangeValue = e => {
    setEditValue(e.target.value);
  };

  const onEditTodoList = async isCompleted => {
    const result = await updateToDoAPI(id, editValue, isCompleted, token);
    setTodos(prev => prev.map(e => (e.id === id ? result.data : e)));
  };

  const submitEditButton = () => {
    onEditTodoList(isCompleted);
    setEdited(!edited);
  };

  const checkDoneToggle = () => {
    onEditTodoList(!isCompleted);
  };

  const deleteTodoList = async () => {
    const result = await deleteToDoAPI(id, token);
    if (axios.isAxiosError(result)) {
      alert('삭제 오류');
    } else {
      setTodos(prev => prev.filter(e => e.id !== id));
    }
  };

  return (
    <ListItem>
      {edited ? (
        <>
          <ItemBox>
            {isCompleted ? (
              <MdCheckBox className="logo" onClick={checkDoneToggle} />
            ) : (
              <MdCheckBoxOutlineBlank
                className="logo"
                onClick={checkDoneToggle}
              />
            )}
            <ItemText isCompleted={isCompleted}>{todo}</ItemText>
          </ItemBox>
          <EditBox>
            <BsPencilFill className="edit" onClick={onClickEditButton} />
            <BsTrashFill className="remove" onClick={deleteTodoList} />
          </EditBox>
        </>
      ) : (
        <>
          <ItemBox>
            <EditInput
              type="text"
              value={editValue}
              onChange={onChangeValue}
            ></EditInput>
          </ItemBox>
          <EditBox>
            <BsCheckLg className="logo" onClick={submitEditButton} />
            <BsXLg className="beRed" onClick={onClickCancelButton} />
          </EditBox>
        </>
      )}
    </ListItem>
  );
};

export default ToDoListItem;

const ListItem = styled.li`
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  border-radius: 5px;
  box-shadow: 1px 1px 3px 1px #828282;
  padding: 1rem;
  display: flex;
  align-items: center;

  + li {
    margin-top: 15px;
  }
`;

const ItemBox = styled.div`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;

  .logo {
    font-size: 1.5rem;
    color: #029d06;
  }
`;

const ItemText = styled.p`
  ${({ ...args }) => css`
    margin-left: 0.5rem;
    flex: 1;
    color: ${args.isCompleted ? '#908F90' : '#000000'};
    text-decoration: ${args.isCompleted ? 'line-through' : null};
  `}
`;

const EditBox = styled.div`
  width: 12%;
  display: flex;
  justify-content: space-between;
  }

  .edit {
    cursor: pointer;
  }

  .remove {
    cursor: pointer;
  }

  .logo{
    color: #029d06;
  }

  .beRed{
    color: red;
  }
`;

const EditInput = styled.input`
  ${({ theme }) => theme.flex('center', 'center', null)};
  width: 95%;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
