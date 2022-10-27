import { axiosPrivate } from "../api/axios";
import { URL } from "../api/url";
import useTodoContext from "./useTodoContext";

const usePut = () => {
  const { setItems } = useTodoContext();
  const { TODO } = URL;

  const updateCtxByResponse = (res) => {
    setItems((ctxItems) => {
      return ctxItems.map((ctxItem) => {
        if (ctxItem.id === res.data.id) return res.data;
        return ctxItem;
      });
    });
  };

  const putTodo = (id, body) => {
    return axiosPrivate.put(`${TODO}/${id}`, body); //
  };

  return { putTodo, updateCtxByResponse };
};

export default usePut;
