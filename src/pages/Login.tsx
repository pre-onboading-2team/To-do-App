import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthService } from "../apis";
import {
  Button,
  ButtonGroup,
  Header,
  Input,
  InputField,
  Layout,
  Message,
} from "../components/common";
import {
  ACCESS_TOKEN,
  useLoginDispatch,
  useLoginState,
} from "../contexts/LoginContext";
import { useInputs, useLocalStorage } from "../hooks";
import { isValidEmail, isValidPassword } from "../utils/validation";

type LoginSuccessState = {
  statusCode?: number;
  statusText?: string;
  message?: string;
  accessToken: string;
};
type LoginErrorState = {
  statusCode?: number;
  statusText?: string;
  message?: string;
};
type LoginResultState = LoginSuccessState | LoginErrorState;

type LoginMessageState = {
  display: boolean;
  message: string;
};

const initialInputState = {
  email: "",
  password: "",
};

const initialLoginMessage: LoginMessageState = {
  display: false,
  message: "",
};

export const Login = () => {
  const navigate = useNavigate();
  const loginState = useLoginState();
  const loginDispatch = useLoginDispatch();
  const [inputState, onChange] = useInputs(initialInputState);
  const [accessToken, setAccessToken] = useLocalStorage(ACCESS_TOKEN, "");
  const [loginMessage, setloginMessage] =
    useState<LoginMessageState>(initialLoginMessage);

  const { isLoggedIn } = loginState;
  const { email, password } = inputState;
  const { display, message } = loginMessage;

  async function tryLogin(): Promise<LoginResultState | unknown> {
    try {
      // const res = await AUTH_API.signIn(inputState);
      const res = await AuthService.signIn(inputState);
      return {
        statusCode: res.status,
        statusText: res.statusText,
        message: res.data.message,
        accessToken: res.data.access_token,
      } as LoginSuccessState;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        return {
          statusCode: e.response?.status,
          statusText: e.response?.statusText,
          message: e.response?.data.message,
        } as LoginErrorState;
      }
      console.error(e);
      return {
        statusCode: 500,
        statusText: "알 수 없는 서버 오류",
        message: "서버 오류가 발생했습니다",
      };
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status = (await tryLogin()) as LoginResultState;

    if (status.statusCode === 200) {
      const successStatus = status as LoginSuccessState;
      const { accessToken } = successStatus;
      setAccessToken(accessToken);
      loginDispatch({ type: "LOGIN" });
      setloginMessage({ display: false, message: "" });
    } else {
      const errorStatus = status as LoginErrorState;
      const loginErrorMessage = {
        display: true,
        message: `${errorStatus.message}`,
      };
      setloginMessage(loginErrorMessage);
    }
  };

  const goSignUp = () => {
    navigate("/signup");
  };

  const goTodo = () => {
    navigate("/todo");
  };

  useEffect(() => {
    if (accessToken !== "") {
      loginDispatch({ type: "LOGIN" });
    }

    if (isLoggedIn) goTodo();
  }, [isLoggedIn]);

  return (
    <Layout>
      <Header>로그인</Header>
      <form onSubmit={onSubmit}>
        <InputField>
          <label htmlFor="email">이메일</label>
          <Input
            name="email"
            type="text"
            placeholder="이메일 주소"
            value={email}
            onChange={onChange}
          />
        </InputField>
        <InputField>
          <label htmlFor="password">비밀번호</label>
          <Input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onChange}
          />
          {display && <Message type="negative" message={message} />}
        </InputField>
        <ButtonGroup>
          <Button
            type="submit"
            disabled={!isValidEmail(email) || !isValidPassword(password)}
          >
            로그인
          </Button>
          <Button type="submit" onClick={goSignUp}>
            회원가입
          </Button>
        </ButtonGroup>
      </form>
    </Layout>
  );
};