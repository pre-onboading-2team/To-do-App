import { axiosAuth } from "./api";
import { URL } from "./url";

export type UserInfoProps = {
  email: string;
  password: string;
};

export const signUp = (data: UserInfoProps) => {
  return axiosAuth.post(URL.SIGNUP, data);
};

export const signIn = (data: UserInfoProps) => {
  return axiosAuth.post(URL.LOGIN, data);
};
