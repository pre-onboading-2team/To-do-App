import { useRef, useState } from "react";

import { Back, Delete, Edit, Ok } from "../../../components/icons";
import { useDelete, useInput, usePut } from "../../../hooks";
import * as S from "../styles";

const TodoListItem = ({ item }) => {
  const [isModificationMode, setIsModificationMode] = useState(false);
  const [inputValue, handleChange, setInputValue] = useInput();
  const { putTodo, updateCtxByResponse } = usePut();
  const { deleteTodo, updateCtxById } = useDelete();
  const modifyingInput = useRef();

  const handleModificationMode = () => {
    setIsModificationMode(true);
    setInputValue(item.todo);
    setTimeout(() => modifyingInput.current.focus(), 0);
  };

  const handleCancelModification = () => setIsModificationMode(false);

  const handleModification = async () => {
    const body = { todo: inputValue, isCompleted: item.isCompleted };
    try {
      const res = await putTodo(item.id, body);
      updateCtxByResponse(res);
      setIsModificationMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleisCompleted = async () => {
    const body = { todo: item.todo, isCompleted: !item.isCompleted };
    try {
      const res = await putTodo(item.id, body);
      updateCtxByResponse(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(item.id);
      updateCtxById(item.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.ListItem>
      {isModificationMode && (
        <>
          <S.ItemInput
            type="text"
            value={inputValue}
            onChange={handleChange}
            ref={modifyingInput}
          />
          <S.BtnBox>
            <S.TodoButton onClick={handleModification}>
              <Ok />
            </S.TodoButton>
            <S.TodoButton onClick={handleCancelModification}>
              <Back />
            </S.TodoButton>
          </S.BtnBox>
        </>
      )}
      {!isModificationMode && (
        <>
          <S.TodoContents
            isCompleted={item.isCompleted}
            onClick={handleisCompleted}
          >
            {item.todo}
          </S.TodoContents>
          <S.BtnBox>
            <S.TodoButton onClick={handleModificationMode}>
              <Edit />
            </S.TodoButton>
            <S.TodoButton onClick={handleDelete}>
              <Delete />
            </S.TodoButton>
          </S.BtnBox>
        </>
      )}
    </S.ListItem>
  );
};

export default TodoListItem;
