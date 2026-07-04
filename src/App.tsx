import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<></>} />
        <Route path="/register" element={<></>} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<></>} />
          <Route path="/historial" element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
