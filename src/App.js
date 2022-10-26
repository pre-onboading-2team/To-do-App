import { Route, Routes } from "react-router-dom";

import { Auth, Todo } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
};

export default App;
