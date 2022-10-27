export const isValidEmail = (value) => !!value.includes("@");
export const isValidPassword = (value) => value.length > 7;
export const isEmpty = (value) => value === "";

export const msg = {
  email: "잘못된 형식의 이메일입니다.",
  pw: "비밀번호가 너무 짧습니다.",
};
