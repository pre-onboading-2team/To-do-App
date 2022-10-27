import { axiosPrivate } from "../api/axios";
import { URL } from "../api/url";
import useTodoContext from "./useTodoContext";

const useGet = () => {
  const { setItems } = useTodoContext();
  const { TODO } = URL;

  const setCtxItemsByResponse = (res) => setItems(res.data);

  const getTodos = async () => {
    try {
      const res = await axiosPrivate.get(TODO);
      setCtxItemsByResponse(res);
    } catch (err) {
      console.log(err);
    }
  };

  return { getTodos };
};

export default useGet;
