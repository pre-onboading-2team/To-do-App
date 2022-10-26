import axios from "axios";

import { getTokenFromLocalStorage } from "./localStorage";

export const authHeader = () => {
  const token = getTokenFromLocalStorage();
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};

export const axiosInstance = axios.create({
  baseURL: "https://pre-onboarding-selection-task.shop",
});
