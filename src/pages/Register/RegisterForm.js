import { useEffect, useState } from "react";

import { URL } from "../../api/url";
import * as S from "../../components/Form/styles";
import { useAccount, useInput } from "../../hooks";
import * as validation from "../../utils/validation";

const RegisterForm = () => {
  const [emailValue, handleEmailChange] = useInput("");
  const [pwValue, handlePwChange] = useInput("");
  const { postAccount, error } = useAccount();
  const { REGISTER } = URL;

  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [validEmailMsg, setValidEmailMsg] = useState("");
  const [validPwMsg, setValidPwMsg] = useState("");

  useEffect(() => {
    const isValidEmail = validation.isValidEmail(emailValue);
    const isValidPw = validation.isValidPassword(pwValue);
    const isEmptyEmail = validation.isEmpty(emailValue);
    const isEmptyPw = validation.isEmpty(pwValue);

    setValidEmailMsg(
      isValidEmail || isEmptyEmail ? null : validation.msg.email
    );
    setValidPwMsg(isValidPw || isEmptyPw ? null : validation.msg.pw);

    const isValidAll = isValidEmail && isValidPw;
    setIsBtnDisabled(!isValidAll);
  }, [emailValue, pwValue]);

  const handleSumbit = (e) => {
    e.preventDefault();
    const body = { email: emailValue, password: pwValue };
    postAccount(REGISTER, body);
  };

  return (
    <S.AuthForm onSubmit={handleSumbit}>
      <S.AuthLabel htmlFor="email">
        email <S.ValidationMsgBox>{validEmailMsg}</S.ValidationMsgBox>
      </S.AuthLabel>
      <S.AuthInput
        id="email"
        type="text"
        value={emailValue}
        onChange={handleEmailChange}
      />

      <S.AuthLabel htmlFor="pw">
        password <S.ValidationMsgBox>{validPwMsg}</S.ValidationMsgBox>
      </S.AuthLabel>
      <S.AuthInput
        id="pw"
        type="password"
        value={pwValue}
        onChange={handlePwChange}
      />
      <S.AuthButton type="submit" disabled={isBtnDisabled}>
        회원가입
      </S.AuthButton>
      <S.AuthErrorBox>{error}</S.AuthErrorBox>
    </S.AuthForm>
  );
};

export default RegisterForm;
