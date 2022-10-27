import { Route, Routes } from "react-router-dom";

import { TodosContextProvider } from "./contexts/TodosContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";

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
