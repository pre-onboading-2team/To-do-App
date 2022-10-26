import { Navigate, Outlet } from "react-router-dom";

const Public = () => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/todo" /> : <Outlet />;
};

export default Public;
