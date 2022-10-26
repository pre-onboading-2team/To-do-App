import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import GlobalStyles from "./styles/GlobalStyles"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <GlobalStyles />
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
