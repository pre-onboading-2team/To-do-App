import { ReactNode } from "react";
import styled from "styled-components";

const PageTitleText = styled.h1`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 700;
  margin-bottom: 2rem;
`;

type PageTitleProps = {
  children: ReactNode;
};

const PageTitle = ({ children }: PageTitleProps) => {
  return <PageTitleText>{children}</PageTitleText>;
};

export default PageTitle;
