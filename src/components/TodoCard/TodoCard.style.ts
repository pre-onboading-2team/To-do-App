import styled from "styled-components";

export const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  width: 100%;
  height: 100px;
  box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
    0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
  & > section:first-child {
    display: flex;
    align-items: center;
    width: 75%;
    & > input {
      width: 20px;
      height: 20px;
      margin-right: 20px;
    }
    & > p {
      margin: 0;
      padding-top: 3px;
    }
    & > div {
      flex-grow: 1;
    }
  }
`;

export const ButtonsContainer = styled.section`
  display: flex;
  align-items: center;
  gap: 10px;
  & > button {
    display: flex;
    align-items: center;
    border: none;
    height: 30px;
    padding: 10px;
    border-radius: 10px;
    color: #ffffff;
    transition: all 0.2s;
    &:hover {
      scale: 1.1;
    }
    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
    &:first-child {
      background-color: green;
    }
    &:last-child {
      background-color: red;
    }
  }
`;
