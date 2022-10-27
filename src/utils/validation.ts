export const emailValidation = (value: string) => {
  const EMAIL_REGEX = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i;

  return EMAIL_REGEX.test(value);
};

export const passwordValidation = (value: string) => {
  return value.trim().length > 7;
};

export const todoValidation = (value: string) => {
  return value.trim().length > 0;
};
