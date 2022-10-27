import { Link } from "react-router-dom";

import { AuthOutletWrapper } from "../styles";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <AuthOutletWrapper>
      <LoginForm />
      <Link to="/register">회원가입</Link>
    </AuthOutletWrapper>
  );
};

export default Login;
