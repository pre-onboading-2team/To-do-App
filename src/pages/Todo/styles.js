import styled from "styled-components";

import Button from "../../components/Button";

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 15px;
  height: 40px;
  align-items: stretch;
`;

export const ItemInput = styled.input`
  height: 40px;
  font-size: 15px;
  width: 100%;
  padding: 5px;
  border-radius: 5px;
`;

export const TodoContents = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  width: 100%;
  background-color: #f9d9a9;

  cursor: pointer;
  :hover {
    background-color: #fdc269;
  }
  ${({ isCompleted }) =>
    isCompleted
      ? `
        color: #545454;
        background-color: #dad5ce;
        text-decoration: line-through;
        font-style: italic;
         `
      : null}
`;

export const BtnBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const TodoButton = styled(Button)`
  width: 35px;
  font-size: 20px;
  margin-left: 5px;
`;

export const TodoForm = styled.form`
  display: flex;
  align-items: stretch;
  margin-top: 15px;
  button {
    height: 40px;
  }
`;

export const TodoFormInput = styled.input`
  height: 40px;
  font-size: 15px;
`;
