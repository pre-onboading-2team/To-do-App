import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AUTH_API, { UserInfoProps } from "../apis/AUTH_API";
import Button, { ButtonGroup } from "../components/common/Button";
import { Input, InputField } from "../components/common/Input";
import Layout from "../components/common/Layout";
import Message from "../components/common/Message";
import PageTitle from "../components/common/PageTitle";
import useInputs from "../utils/useInputs";
import { isValidEmail, isValidPassword } from "../utils/validation";

type SignUpSuccessState = {
  statusCode?: number;
  statusText?: string;
  message?: string;
};
type SignUpErrorState = {
  statusCode?: number;
  statusText?: string;
  message?: string;
};

type SignUpResultState = SignUpSuccessState | SignUpErrorState;

type SignupMessageState = {
  display: boolean;
  type: "negative" | "positive";
  message: string;
};

const initialInputState: UserInfoProps = {
  email: "",
  password: "",
};

const initialSignupMessage: SignupMessageState = {
  display: false,
  type: "negative",
  message: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const [inputsState, onChange] = useInputs(initialInputState);
  const [signupMessage, setSignupMessage] = useState(initialSignupMessage);

  const { email, password } = inputsState;
  const { display, type, message } = signupMessage;

  const goBack = () => navigate(-1);

  async function signUpUser(): Promise<any> {
    try {
      const res = await AUTH_API.signUp(inputsState);
      return {
        statusCode: res.status,
        statusText: res.statusText,
        message: res.data.message,
      } as SignUpSuccessState;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        return {
          statusCode: e.response?.status,
          statusText: e.response?.statusText,
          message: e.response?.data.message,
        } as SignUpErrorState;
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
    const status = (await signUpUser()) as SignUpResultState;
    if (status.statusCode === 201) {
      const signupMessage = {
        display: true,
        type: "positive",
        message: `계정이 생성되었습니다!`,
      } as SignupMessageState;
      setSignupMessage(signupMessage);
    } else {
      const errorStatus = status as SignUpErrorState;
      const signupMessage = {
        display: true,
        type: "negative",
        message: `${errorStatus.message}`,
      } as SignupMessageState;
      setSignupMessage(signupMessage);
    }
  };

  return (
    <Layout>
      <PageTitle>회원가입</PageTitle>
      <form onSubmit={onSubmit}>
        <InputField>
          <label htmlFor="email">
            <Input
              name="email"
              id="email"
              placeholder="이메일 주소"
              type="text"
              value={email}
              onChange={onChange}
            />
            이메일
          </label>
        </InputField>
        <InputField>
          <label htmlFor="password">
            <Input
              id="password"
              name="password"
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={onChange}
            />
            비밀번호
          </label>
        </InputField>
        {display ? <Message type={type} message={message} /> : null}
        <ButtonGroup>
          <Button
            type="submit"
            disabled={!isValidEmail(email) || !isValidPassword(password)}
          >
            등록
          </Button>
          <Button type="button" onClick={goBack}>
            돌아가기
          </Button>
        </ButtonGroup>
      </form>
    </Layout>
  );
};

export default SignUp;
