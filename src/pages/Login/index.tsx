import React, { useCallback, useState } from "react";
import { useNavigation } from "react-router-dom";
import { LoginService } from "../../apis";
import axios, { AxiosError } from "axios";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await LoginService.signIn({ email, password });
      if (response.status === 200) {
        localStorage.setItem("USER_TOKEN", response.data.access_token);
      }
      setLoading(false);
    } catch (error) {
      const errorResponse: any = (error as AxiosError).response;
      if (errorResponse) {
        alert(errorResponse.data.message);
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h1>로그인</h1>
      </div>
      <div>
        이메일
        <input type="text" />
      </div>
      <div>
        <input type="text" />
      </div>
      <div>
        <button onClick={onSubmit} style={{ backgroundColor: "gray" }}>
          로그인
        </button>
        <button onClick={onSubmit} style={{ backgroundColor: "gray" }}>
          회원가입
        </button>
      </div>
    </div>
  );
};
export default Login;
