import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPublic } from "../api/axios";

const useAccount = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const setToken = (token) => localStorage.setItem("token", token);

  const postAccount = async (url, body) => {
    try {
      const res = await axiosPublic.post(url, body);
      const token = res.data.access_token;
      setToken(token);
      navigate("/todo");
    } catch (err) {
      const msg = err.response.data.message;
      setError(msg === "Unauthorized" ? "비밀번호가 다릅니다" : msg);
    }
  };

  return { postAccount, error };
};

export default useAccount;
