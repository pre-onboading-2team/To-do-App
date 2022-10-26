import axios from "axios";

export const getErrorMessage = (error) => {
  if (axios.isAxiosError(error)) {
    return error.response.data.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};
