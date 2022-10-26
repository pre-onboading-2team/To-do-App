import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import useInputs from '../lib/useInputs';
import { isValidEmail, isValidPassword } from '../lib/useValidation';
import { AUTH_API } from '../api/axiosInstance';

import { Message, Layout, PageTitle, Button, Input, InputField } from '../components/common';
import { ButtonGroup } from '../components/common/Button';

const initialInputState = {
	email: '',
	password: '',
};

const initialSignupMessage = {
	display: false,
	type: 'negative',
	message: '',
};

export function SignUp() {
	const navigate = useNavigate();
	const [inputsState, onChange] = useInputs(initialInputState);
	const [signupMessage, setSignupMessage] = useState(initialSignupMessage);

	const { email, password } = inputsState;
	const { display, type, message } = signupMessage;

	const goBack = () => navigate(-1);

	const onSubmit = async (e) => {
		e.preventDefault();
		const status = await trySignUp();
		if (status.statusCode === 201) {
			const signupMessage = {
				display: true,
				type: 'positive',
				message: `계정이 생성되었습니다!`,
			};
			setSignupMessage(signupMessage);
		} else {
			const errorStatus = status;
			const signupMessage = {
				display: true,
				type: 'negative',
				message: `${errorStatus.message}`,
			};
			setSignupMessage(signupMessage);
		}
	};

	async function trySignUp() {
		try {
			const res = await AUTH_API.signUp(inputsState);
			return {
				statusCode: res.status,
				statusText: res.statusText,
				message: res.data.message,
			};
		} catch (e) {
			if (axios.isAxiosError(e)) {
				return {
					statusCode: e.response?.status,
					statusText: e.response?.statusText,
					message: e.response?.data.message,
				};
			}
			console.error(e);
		}
	}

	return (
		<Layout>
			<PageTitle>회원가입</PageTitle>
			<form onSubmit={onSubmit}>
				<InputField>
					<label htmlFor="email">이메일</label>
					<Input
						name="email"
						placeholder="이메일 주소"
						type="text"
						value={email}
						onChange={onChange}
					/>
				</InputField>
				<InputField>
					<label htmlFor="password">비밀번호</label>
					<Input
						name="password"
						placeholder="비밀번호"
						type="password"
						value={password}
						onChange={onChange}
					/>
				</InputField>
				{display && <Message type={type} message={message} />}
				<ButtonGroup>
					<Button type="submit" disabled={!isValidEmail(email) || !isValidPassword(password)}>
						등록
					</Button>
					<Button type="button" onClick={goBack}>
						돌아가기
					</Button>
				</ButtonGroup>
			</form>
		</Layout>
	);
}
