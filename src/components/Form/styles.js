import styled from "styled-components";

import Button from "../Button";

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  > input {
    margin-top: 5px;
  }

  > button {
    margin-top: 25px;
    width: 100%;
  }
`;

export const AuthButton = styled(Button)`
  font-size: 15px;
  height: 35px;
`;

export const AuthInput = styled.input`
  height: 35px;
  width: 100%;
`;

export const AuthLabel = styled.label`
  width: 100%;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  &:not(:nth-child(1)) {
    margin-top: 15px;
  }
`;
export const ValidationMsgBox = styled.div`
  display: flex;
  align-items: flex-end;
  color: red;
  font-size: 12px;
`;

export const AuthErrorBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
  height: 35px;
  color: red;
  width: 100%;
`;
