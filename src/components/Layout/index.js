import React from "react";
import { Outlet } from "react-router-dom";
import * as S from "./styles";
import Header from "./Header";

const Layout = () => {
  return (
    <S.Container className="layout_container">
      <Header />
      <Outlet />
    </S.Container>
  );
};

export default Layout;
