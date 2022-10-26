import React, { useState } from "react"

const TodoContext = React.createContext(null)

const TodoContextProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const value = { items, setItems }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export { TodoContextProvider, TodoContext }
