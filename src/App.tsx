import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from '@pages/Form';
import ViewForm from '@pages/ViewForm';
import Layout from '@components/common/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<Form />} path="/" />
          <Route element={<ViewForm />} path="/viewform" />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
