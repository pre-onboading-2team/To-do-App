export const emailValidation = (value) => {
  const EMAIL_REGEX = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i;

  return EMAIL_REGEX.test(value);
};

export const passwordValidation = (value) => {
  return value.trim().length > 7;
};

export const todoValidation = (value) => {
  return value.trim().length > 0;
};
