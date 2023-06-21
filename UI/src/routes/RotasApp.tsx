import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AuthProvider } from "../contexts/AuthContext/authContext";
import Home from "../pages/Home";
import Registrar from "../pages/Registrar";
import Login from "../pages/Login";

const RotasApp = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen justify-between">
        <Header />
        <div className="flex-1">
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/registrar" element={<Registrar />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </AuthProvider>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default RotasApp;
