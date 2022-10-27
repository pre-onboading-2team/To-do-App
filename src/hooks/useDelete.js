import { axiosPrivate } from "../api/axios";
import { URL } from "../api/url";
import useTodoContext from "./useTodoContext";

const useDelete = () => {
  const { setItems } = useTodoContext();
  const { TODO } = URL;

  const updateCtxById = (id) => {
    setItems((ctxItems) => ctxItems.filter((ctxItem) => ctxItem.id !== id));
  };

  const deleteTodo = (id) => axiosPrivate.delete(`${TODO}/${id}`);

  return { deleteTodo, updateCtxById };
};

export default useDelete;
