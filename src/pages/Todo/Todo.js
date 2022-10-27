import { TodoContextProvider } from "../../context/TodoContext";
import { TodoForm, TodoList } from "./components";

const Todo = () => {
  return (
    <TodoContextProvider>
      <TodoForm />
      <TodoList />
    </TodoContextProvider>
  );
};

export default Todo;
