/* eslint-disable no-alert */
import { axiosInstance, getErrorMessage } from "../utils";
import { addTokenToLocalStorage } from "../utils/localStorage";

export const signUp = async ({ body, onSuccess }) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", body);

    addTokenToLocalStorage(data);

    if (onSuccess) onSuccess();
  } catch (error) {
    alert(getErrorMessage(error));
  }
};

export const signIn = async ({ body, onSuccess }) => {
  try {
    const { data } = await axiosInstance.post("/auth/signin", body);

    addTokenToLocalStorage(data);

    if (onSuccess) onSuccess();
  } catch (error) {
    alert(getErrorMessage(error));
  }
};
