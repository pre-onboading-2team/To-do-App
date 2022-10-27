import styled, { css } from "styled-components";

export const Container = styled.div<{ isError: boolean }>`
  color: #0c0d0e;
  font-size: 15px;
  ${({ isError }) =>
    isError &&
    css`
      svg {
        position: absolute;
        top: 17px;
        transform: translateY(-50%);
        right: 10px;
        color: hsl(358, 68%, 59%);
        font-size: 20px;
      }
      p:last-child {
        color: hsl(358, 62%, 52%);
        font-size: 12px;
      }
    `}
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
`;

export const Comment = styled.p`
  font-size: 0.8rem;
  color: hsl(210, 8%, 35%);
  margin-bottom: 7px;
`;

export const Input = styled.input<{ isError: boolean }>`
  padding: 8px 10px;
  width: 100%;
  height: 35px;
  border: 1px solid rgb(186, 191, 196);
  border-radius: 10px;
  &::placeholder {
    color: var(--black-300);
  }
  &:focus {
    border-color: ${({ isError }) => !isError && "hsl(206, 90%, 69.5%)"};
    outline: ${({ isError }) => !isError && "hsl(206, 96%, 90%) solid 4px"};
  }
  ${({ isError }) =>
    isError &&
    css`
      border-color: hsl(358, 68%, 59%);
      outline: hsl(358, 76%, 90%) solid 4px;
    `}
`;
