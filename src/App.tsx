import { Route, Routes } from "react-router-dom";

import { Modal } from "./components";
import { Auth, Todo } from "./pages";

const App = () => {
  return (
    <Modal width="600px" height="max-content" borderRadius="12px" background>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Modal>
  );
};

export default App;
