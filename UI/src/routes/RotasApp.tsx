import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Registrar from "../pages/Registrar";

const RotasApp = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen justify-between">
        <Topbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registrar" element={<Registrar />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default RotasApp;
