import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RequestTrip from "./pages/RequestTrip";
import TripDetail from "./pages/TripDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/request-trip" element={<RequestTrip />} />
          <Route path="/historial" element={<></>} />
          <Route path="/trips/:id" element={<TripDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
