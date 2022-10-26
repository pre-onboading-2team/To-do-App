export const isValidEmail = (email) => {
	const reg = /([a-zA-Z0-9]@{1}[a-zA-Z0-9])/;
	return email.match(reg);
};

export const isValidPassword = (password) => {
	const reg = /^([a-zA-Z0-9]{8})/;
	return password.match(reg);
};
