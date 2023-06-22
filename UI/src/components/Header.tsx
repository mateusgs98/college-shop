import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import SidebarCarrinho from "./SidebarCarrinho";

const Header = () => {
  const [sidebarCarrinhoAberta, setSidebarCarrinhoAberta] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between h-[90px] px-8 bg-[var(--azul-escuro-primario)]">
        <h1 className="font-bold text-white text-3xl lg:text-5xl">College Shop</h1>
        <div className="flex gap-5">
          <button type="button" onClick={() => setSidebarCarrinhoAberta(true)} title="Visualizar carrinho">
            <AiOutlineShoppingCart className="w-7 h-7" fill="white" />
          </button>
          <button type="button" onClick={() => localStorage.removeItem("token")} title="Sair">
            <BiLogOut className="w-7 h-7" fill="white" />
          </button>
        </div>
      </div>
      <SidebarCarrinho sidebarAberta={sidebarCarrinhoAberta} setSidebarAberta={setSidebarCarrinhoAberta} />
    </>
  );
};

export default Header;
