import { useRef } from "react";

import { URL } from "../../api/url";
import * as S from "../../components/Form/styles";
import { useAccount, useInput } from "../../hooks";
import { isEmpty } from "../../utils/validation";

const LoginForm = () => {
  const [emailValue, handleEmailChange] = useInput("");
  const [pwValue, handlePwChange] = useInput("");
  const { postAccount, error } = useAccount();
  const { LOGIN } = URL;
  const emailInput = useRef();
  const pwInput = useRef();

  const handleSumbit = (e) => {
    e.preventDefault();
    if (isEmpty(emailValue)) {
      emailInput.current.focus();
      return;
    }
    if (isEmpty(pwValue)) {
      pwInput.current.focus();
      return;
    }

    const body = { email: emailValue, password: pwValue };
    postAccount(LOGIN, body);
  };

  return (
    <S.AuthForm onSubmit={handleSumbit}>
      <S.AuthLabel htmlFor="email">email</S.AuthLabel>
      <S.AuthInput
        id="email"
        type="text"
        onChange={handleEmailChange}
        value={emailValue}
        ref={emailInput}
      />
      <S.AuthLabel htmlFor="pw">password</S.AuthLabel>
      <S.AuthInput
        id="pw"
        type="password"
        onChange={handlePwChange}
        value={pwValue}
        ref={pwInput}
      />
      <S.AuthButton type="submit">로그인</S.AuthButton>
      <S.AuthErrorBox>{error}</S.AuthErrorBox>
    </S.AuthForm>
  );
};

export default LoginForm;
