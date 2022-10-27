import axios from "axios";

import { BASE_URL } from "./url";

const JSON_TYPE = "application/json";

export const axiosAuth = axios.create({
  baseURL: BASE_URL.todo,
  timeout: 1000,
  headers: {
    "Content-Type": JSON_TYPE,
  },
});

export const axiosTodo = axios.create({
  baseURL: BASE_URL.todo,
  timeout: 1000,
  headers: {
    "Content-Type": JSON_TYPE,
  },
});
