import { API } from "./api";

export const signUp = data => {
  const url = 'auth/signUp';
  return API.post(url, data);
}

export const signIn = data => {
  const url = 'auth/signIn';
  return API.post(url, data);
}
