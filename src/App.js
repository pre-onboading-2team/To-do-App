import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import { Login, Register, Todo } from "./pages";
import { Protected, Public } from "./routes";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Public />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<Protected />}>
          <Route path="/todo" element={<Todo />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;

// 폰트적용, 아이콘, 안내메세지, 코드정리, 헤더 설정 위치
