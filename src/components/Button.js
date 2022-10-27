import styled from "styled-components";

const Button = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #c8c8c8;

  cursor: pointer;
  :hover {
    background-color: #ffb883;
  }
  :active {
    transform: scale(0.95);
  }
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #e0e0e0c2;
    pointer-events: none;
  `};
`;

export default Button;
