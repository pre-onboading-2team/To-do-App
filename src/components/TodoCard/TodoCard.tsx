import { useState } from "react";

import { deleteTodo, getTodos, updateTodo } from "../../apis";
import { useValidate } from "../../hooks";
import { ITodo } from "../../types";
import { todoValidation } from "../../utils";
import Input from "../Input/Input";
import { ErrorModal, useModal } from "../Modal";
import * as S from "./TodoCard.style";

interface Prop {
  id: number;
  todo: string;
  isCompleted: boolean;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoCard = ({ id, todo, isCompleted, setTodos }: Prop) => {
  const [isEdit, setIsEdit] = useState(false);
  const [checked, setChecked] = useState(isCompleted);
  const [
    todoValue,
    todoError,
    todoValid,
    handleTodo,
    setTodoValue,
    setTodoError,
  ] = useValidate(todoValidation);
  const { openModal } = useModal();

  const handleDelete = () => {
    if (!isEdit) {
      openModal(
        <ErrorModal
          body="정말 삭제 하시겠습니까?"
          buttonText="삭제"
          callback={() =>
            deleteTodo({ id })
              .then(() => getTodos())
              .then((data) => {
                if (data) setTodos(data);
              })
          }
        />
      );

      return;
    }

    setTodoValue(todo);
    setTodoError(false);
    setChecked(isCompleted);
    setIsEdit(false);
  };

  const handleEdit = () => {
    if (!isEdit) {
      setIsEdit(true);
      setTodoValue(todo);
      return;
    }

    if (todoValid) {
      updateTodo({ id, todo: todoValue, isCompleted: checked })
        .then(() => getTodos())
        .then((data) => {
          if (data) setTodos(data);
          setIsEdit(false);
        });
    }
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEdit) return;
    setChecked(e.target.checked);
  };

  return (
    <S.Container>
      <section>
        <input
          type="checkbox"
          checked={isEdit ? checked : isCompleted}
          onChange={(e) => handleCheckbox(e)}
        />
        {isEdit ? (
          <Input
            type="text"
            id="todo"
            value={todoValue}
            isError={todoError}
            errorMsg="1글자 이상 입력해주세요."
            onChange={(e) => handleTodo(e)}
          />
        ) : (
          <p>{todo}</p>
        )}
      </section>
      <S.ButtonsContainer>
        <button type="button" onClick={handleEdit} disabled={todoError}>
          {isEdit ? "제출" : "수정"}
        </button>
        <button type="button" onClick={handleDelete}>
          {isEdit ? "취소" : "삭제"}
        </button>
      </S.ButtonsContainer>
    </S.Container>
  );
};

export default TodoCard;
