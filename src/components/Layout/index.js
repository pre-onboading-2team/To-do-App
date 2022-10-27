import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import * as S from "./styles";

const Layout = () => {
  return (
    <S.Container className="layout_container">
      <Header />
      <Outlet />
    </S.Container>
  );
};

export default Layout;
