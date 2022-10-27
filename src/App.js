import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignIn, SignUp, ToDo } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/todo" element={<ToDo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
