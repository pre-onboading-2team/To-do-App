import { createContext, useMemo, useState } from "react";

const TodoContext = createContext(null);

const TodoContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const value = useMemo(() => {
    return { items, setItems };
  }, [items]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export { TodoContext, TodoContextProvider };
