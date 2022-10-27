/* eslint-disable camelcase */
import { IToken } from "../types";

export const addTokenToLocalStorage = (token: IToken) => {
  const { access_token } = token;
  localStorage.setItem("access_token", JSON.stringify(access_token));
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("access_token");
};

export const getTokenFromLocalStorage = (): null | IToken => {
  const result = localStorage.getItem("access_token");
  const token = result ? JSON.parse(result) : null;
  return token;
};
