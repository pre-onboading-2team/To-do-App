import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  width: 400px;
  padding: 30px;
  background-color: white;
  border-radius: 0 0 7px 7px;
  box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
    0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  margin-top: 20px;
  padding: 20px 0;
  color: #ffffff;
  background-color: #1561ed;
  border: none;
  border-radius: 20px;
  transition: all 0.4s;
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const Tab = styled.section<{ isLogin: boolean }>`
  display: flex;
  width: 400px;
  & > button {
    border: 1px solid black;
    border-radius: 10px 10px 0 0;
    flex-basis: 50%;
    padding: 15px 0;
    border: none;
    box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
      0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
    transition: all 0.4s;
  }
  & > button:first-child {
    background-color: ${({ isLogin }) => (isLogin ? "#1561ed" : "inherit")};
    color: ${({ isLogin }) => (isLogin ? "#ffffff" : "#000000")};
  }
  & > button:last-child {
    background-color: ${({ isLogin }) => (isLogin ? "inherit" : "#1561ed")};
    color: ${({ isLogin }) => (isLogin ? "#000000" : "#ffffff")};
  }
`;
