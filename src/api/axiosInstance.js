import axios from 'axios';
import server from './url';

export const axios_preonboarding = axios.create({
	baseURL: server.preOnboarding,
});

export const AUTH_API = {
	baseURL() {
		return server.preOnboarding;
	},
	signUp(data) {
		return axios_preonboarding.post(this.baseURL() + 'auth/signup', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	},
	signIn(data) {
		return axios_preonboarding.post(this.baseURL() + 'auth/signin', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	},
};
