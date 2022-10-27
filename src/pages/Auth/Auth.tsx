import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { signIn, signUp } from "../../apis";
import { Input } from "../../components";
import { useValidate } from "../../hooks";
import {
  emailValidation,
  getTokenFromLocalStorage,
  passwordValidation,
} from "../../utils";
import * as S from "./Auth.style";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [emailValue, emailError, isEmailValid, handleEmail] =
    useValidate(emailValidation);
  const [passwordValue, passwordError, isPasswordValid, handlePassword] =
    useValidate(passwordValidation);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLogin) {
      signIn({
        body: { email: emailValue, password: passwordValue },
        onSuccess: () => navigate("/todo"),
      });
    }

    if (!isLogin) {
      signUp({
        body: { email: emailValue, password: passwordValue },
        onSuccess: () => navigate("/todo"),
      });
    }
  };

  useEffect(() => {
    const token = getTokenFromLocalStorage();

    if (token) {
      navigate("/todo");
    }
  }, [navigate]);

  return (
    <S.Container>
      <S.Tab isLogin={isLogin}>
        <button type="button" onClick={() => setIsLogin(true)}>
          로그인
        </button>
        <button type="button" onClick={() => setIsLogin(false)}>
          회원가입
        </button>
      </S.Tab>
      <S.Form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="text"
          label="이메일"
          id="이메일"
          value={emailValue}
          isError={emailError}
          errorMsg="이메일 형식을 확인해주세요."
          onChange={(e) => handleEmail(e)}
        />
        <Input
          type="password"
          label="비밀번호"
          id="비밀번호"
          value={passwordValue}
          isError={passwordError}
          errorMsg="비밀번호를 8글자 이상 입력해주세요."
          onChange={(e) => handlePassword(e)}
        />
        <S.Button disabled={!isEmailValid || !isPasswordValid}>
          {isLogin ? "로그인" : "회원가입"}
        </S.Button>
      </S.Form>
    </S.Container>
  );
};

export default Login;
