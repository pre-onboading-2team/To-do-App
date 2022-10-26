import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AUTH_API } from '../api/axiosInstance';

import useInputs from '../lib/useInputs';
import useLocalStorage from '../lib/useLocalStorage';
import { isValidEmail, isValidPassword } from '../lib/useValidation';
import { ACCESS_TOKEN, useLoginDispatch, useLoginState } from '../contexts/LoginContext';

import { Layout, Message, PageTitle, Button, Input, InputField } from '../components/common';
import { ButtonGroup } from '../components/common/Button';

const initialInputState = {
	email: '',
	password: '',
};

const initialLoginMessage = {
	display: false,
	message: '',
};

export function Login() {
	const navigate = useNavigate();
	const loginState = useLoginState();
	const loginDispatch = useLoginDispatch();
	const [inputState, onChange] = useInputs(initialInputState);
	const [accessToken, setAccessToken] = useLocalStorage(ACCESS_TOKEN, '');
	const [loginMessage, setloginMessage] = useState(initialLoginMessage);

	const { isLoggedIn } = loginState;
	const { email, password } = inputState;
	const { display, message } = loginMessage;

	const goSignUp = () => {
		navigate('/signup');
	};
	const goTodo = () => {
		navigate('/todo');
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const status = await tryLogin();

		if (status.statusCode === 200) {
			const successStatus = status;
			const { accessToken } = successStatus;
			setAccessToken(accessToken);
			loginDispatch({ type: 'LOGIN' });
			setloginMessage({ display: false, message: '' });
		} else {
			const errorStatus = status;
			const loginErrorMessage = {
				display: true,
				message: `${errorStatus.message}`,
			};
			setloginMessage(loginErrorMessage);
		}
	};

	async function tryLogin() {
		try {
			const res = await AUTH_API.signIn(inputState);
			return {
				statusCode: res.status,
				statusText: res.statusText,
				message: res.data.message,
				accessToken: res.data.access_token,
			};
		} catch (e) {
			if (axios.isAxiosError(e)) {
				return {
					statusCode: e.response?.status,
					statusText: e.response?.statusText,
					message: e.response?.data.message,
				};
			} else {
				console.error(e);
			}
		}
	}

	useEffect(() => {
		if (!accessToken) {
			loginDispatch({ type: 'LOGIN' });
		}

		if (isLoggedIn) goTodo();
	}, [isLoggedIn]);

	return (
		<Layout>
			<PageTitle>로그인</PageTitle>
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
					<Button type="submit" disabled={!isValidEmail(email) || !isValidPassword(password)}>
						로그인
					</Button>
					<Button type="submit" onClick={goSignUp}>
						회원가입
					</Button>
				</ButtonGroup>
			</form>
		</Layout>
	);
}
