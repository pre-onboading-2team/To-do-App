import { ReactNode } from "react";
import styled from "styled-components";

const HeaderText = styled.h1`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 700;
  margin-bottom: 2rem;
`;

type HeaderProps = {
  children: ReactNode;
};

export const Header = ({ children }: HeaderProps) => {
  return <HeaderText>{children}</HeaderText>;
};
