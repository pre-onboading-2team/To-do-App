import { Route, Routes } from "react-router-dom";

import { TodosContextProvider } from "./contexts/TodosContext";
import { Login, SignUp, Todo } from "./pages";

const App = () => {
  return (
    <TodosContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </TodosContextProvider>
  );
};

export default App;
