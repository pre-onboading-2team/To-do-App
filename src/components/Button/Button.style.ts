import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35px;
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
