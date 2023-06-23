import React, { useContext, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext/authContext";
import { ProdutoResposta } from "../services/Produto/types";
import SidebarCarrinho from "./SidebarCarrinho";

type HeaderProps = {
  produtosCarrinho: ProdutoResposta | null;
};

const Header = ({ produtosCarrinho }: HeaderProps) => {
  const { autenticado, handleLogout } = useContext(AuthContext);

  const [sidebarCarrinhoAberta, setSidebarCarrinhoAberta] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between h-[90px] px-8 bg-[var(--azul-escuro-primario)]">
        <h1 className="font-bold text-white text-3xl lg:text-5xl">College Shop</h1>
        <div className="flex gap-5 items-center">
          <Link to="/" className="text-white hover:underline">
            Loja
          </Link>
          {!autenticado && (
            <>
              <Link to="/registrar" className="text-white hover:underline">
                Cadastrar
              </Link>
              <Link to="/login" className="text-white hover:underline">
                Login
              </Link>
            </>
          )}
          {autenticado && (
            <Link to="/meus-produtos" className="text-white hover:underline">
              Meus Produtos
            </Link>
          )}
          <button type="button" onClick={() => setSidebarCarrinhoAberta(true)} title="Visualizar carrinho">
            <AiOutlineShoppingCart className="w-7 h-7" fill="white" />
          </button>
          <button type="button" onClick={handleLogout} title="Sair">
            <BiLogOut className="w-7 h-7" fill="white" />
          </button>
        </div>
      </div>
      <SidebarCarrinho
        produtoCarrinho={produtosCarrinho}
        sidebarAberta={sidebarCarrinhoAberta}
        setSidebarAberta={setSidebarCarrinhoAberta}
      />
    </>
  );
};

export default Header;
