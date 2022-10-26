import React from 'react';
import styled from 'styled-components';

const UserFormBtn = ({ form, handleClickButton, isDisabled }) => {
  return (
    <BtnsContainer>
      {form.btnLists.map((list, i) => {
        return (
          <Btns
            key={i}
            blackFont={list.blackFont}
            backgroundColor={isDisabled ? null : list.bg}
            onClick={handleClickButton}
            name={list.name}
            disabled={isDisabled}
          >
            {list.text}
          </Btns>
        );
      })}
    </BtnsContainer>
  );
};

export default UserFormBtn;

const BtnsContainer = styled.div`
  ${({ theme }) => theme.flex('center', 'center', 'column')};
  width: 100%;
`;

const Btns = styled.button`
  width: 70%;
  height: 50px;
  margin: 15px 0;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ blackFont }) => (blackFont ? '#000' : '#fff')};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;
