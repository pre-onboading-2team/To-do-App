export const isValidEmail = (value) => (value.includes("@") ? true : false);
export const isValidPassword = (value) => (value.length > 7 ? true : false);
export const isEmpty = (value) => (value === "" ? true : false);

export const msg = {
  email: "잘못된 형식의 이메일입니다.",
  pw: "비밀번호가 너무 짧습니다.",
};
