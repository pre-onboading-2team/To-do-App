import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import { Register, Login } from "./pages"
import { Protected, Public } from "./routes"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Public />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<Protected />}>
          <Route path="/todo" element={<div>인증된페이지</div>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}

export default App
