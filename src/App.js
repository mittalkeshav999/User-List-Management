import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UsersList from "./pages/UsersList"; import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<ProtectedRoute Component={UsersList} />} />
    </Routes>
  );
};

export default App;
