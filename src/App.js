import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Join from "./Join";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </>
  );
}

export default App;
