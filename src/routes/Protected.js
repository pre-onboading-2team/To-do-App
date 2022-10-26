import { Navigate, Outlet } from "react-router-dom";
import { setPrivateHeaders } from "../api/axios";

const Protected = () => {
  const token = localStorage.getItem("token");
  if (token) setPrivateHeaders(token);

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default Protected;
