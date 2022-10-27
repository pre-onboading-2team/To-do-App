import { axiosPrivate } from "../api/axios";
import { URL } from "../api/url";
import useTodoContext from "./useTodoContext";

const usePost = () => {
  const { setItems } = useTodoContext();
  const { TODO } = URL;

  const updateCtxByResponse = (res) =>
    setItems((items) => [...items, res.data]);

  const postTodo = (body) => axiosPrivate.post(TODO, body);

  return { postTodo, updateCtxByResponse };
};

export default usePost;
