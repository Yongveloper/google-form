import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from '@pages/Form';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Form />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
