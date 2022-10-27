import { Route, Routes } from "react-router-dom";

import { Modal } from "./components";
import { Auth } from "./pages";

const App = () => {
  return (
    <Modal width="600px" height="max-content" borderRadius="12px" background>
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </Modal>
  );
};

export default App;
