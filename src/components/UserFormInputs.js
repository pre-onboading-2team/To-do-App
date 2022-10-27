import React from 'react';
import styled from 'styled-components';

const UserFormInputs = ({
  form,
  setInputValue,
  inputValues,
  allValueCheck,
}) => {
  return (
    <UserFormInputContainer>
      <InputBox>
        {form.inputLists.map((inputList, i) => {
          return (
            <React.Fragment key={i}>
              <InputTextBox>
                <InputText>{inputList.text}</InputText>
              </InputTextBox>
              <Input
                type={inputList.type}
                name={inputList.value}
                value={inputValues[inputList.value]}
                autoComplete="off"
                placeholder={inputList.placeholder}
                onChange={setInputValue}
                onKeyUp={allValueCheck}
              />
            </React.Fragment>
          );
        })}
      </InputBox>
    </UserFormInputContainer>
  );
};

export default UserFormInputs;

const UserFormInputContainer = styled.div`
  ${({ theme }) => theme.flex('center', 'center', 'column')};
  width: 100%;
  margin: 10px 0;
`;

const InputBox = styled.div`
  width: 100%;
`;

const InputTextBox = styled.div`
  ${({ theme }) => theme.flex('flex-start', 'center', null)};
  width: 70%;
  margin: 0 auto;
`;

const InputText = styled.p`
  margin: 5px 0;
  font-size: 13px;
`;

const Input = styled.input`
  ${({ theme }) => theme.flex('center', 'center', null)};
  width: 70%;
  height: 50px;
  margin: 0 auto 10px;
  padding: 0 10px;
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline-color: rebeccapurple;

  &::placeholder {
    font-size: 12px;
  }
`;
