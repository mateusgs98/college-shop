import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AuthProvider } from "../contexts/AuthContext/authContext";
import CadastroProduto from "../pages/CadastroProduto";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MeusProdutos from "../pages/MeusProdutos";
import ProdutoEspecifico from "../pages/ProdutoEspecifico";
import RealizarCompra from "../pages/RealizarCompra";
import Registrar from "../pages/Registrar";
import { ProdutoResposta } from "../services/Produto/types";

const RotasApp = () => {
  const [produtosCarrinho, setProdutosCarrinho] = useState<ProdutoResposta | null>(null);

  return (
    <BrowserRouter>
      <div className="relative flex flex-col min-h-screen justify-between">
        <AuthProvider>
          <Header produtosCarrinho={produtosCarrinho} />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/registrar" element={<Registrar />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro-produto" element={<CadastroProduto />} />
              <Route path="/realizar-compra" element={<RealizarCompra />} />
              <Route path="/produto/:id" element={<ProdutoEspecifico setProdutoCarrinho={setProdutosCarrinho} />} />
              <Route path="/meus-produtos" element={<MeusProdutos />} />
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
};

export default RotasApp;
