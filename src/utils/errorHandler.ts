import axios from "axios";

export const handleNetworkError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return {
      statusCode: error.response?.status,
      statusText: error.response?.statusText,
      message: error.response?.data.message,
    };
  }
  console.error(error);
  return {
    statusCode: 500,
    statusText: "알 수 없는 서버 오류",
    message: "서버 오류가 발생했습니다",
  };
};
