import { Link } from "react-router-dom";

import { AuthOutletWrapper } from "../styles";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <AuthOutletWrapper>
      <RegisterForm />
      <Link to="/">로그인</Link>
    </AuthOutletWrapper>
  );
};

export default Register;
