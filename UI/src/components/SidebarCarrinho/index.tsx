/* eslint-disable react/jsx-no-bind */
import React, { Dispatch, SetStateAction, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router";
import { ProdutoResposta } from "../../services/Produto/types";
import Button from "../Comum/Button";
import DetectarCliqueFora from "../DetectarCliqueFora";
import ProdutoCarrinho from "../Produto/ProdutoCarrinho";

type SidebarCarrinhoProps = {
  produtoCarrinho: ProdutoResposta | null;
  sidebarAberta: boolean;
  setSidebarAberta: Dispatch<SetStateAction<boolean>>;
};

export default function SidebarCarrinho({ produtoCarrinho, sidebarAberta, setSidebarAberta }: SidebarCarrinhoProps) {
  const refSidebarCarrinho = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

  function comprarProduto() {
    setSidebarAberta(false);
    navigate("/realizar-compra", {
      state: {
        idProduto: produtoCarrinho?.id,
        imagem: produtoCarrinho?.imagem,
        nome: produtoCarrinho?.nome,
        preco: produtoCarrinho?.valor,
        quantidade: 1,
      },
    });
  }

  return (
    <>
      <DetectarCliqueFora onClicarFora={() => setSidebarAberta(false)} refElemento={refSidebarCarrinho}>
        {sidebarAberta ? (
          <aside
            className="fixed right-0 top-0 h-screen bg-[var(--cinza-claro-primario)] px-4 md:px-12 border-l-2 border-black z-[70] max-w-[320px] lg:max-w-md"
            ref={refSidebarCarrinho}
          >
            <div className="h-full flex flex-col justify-between pb-8">
              <div>
                <button type="button" onClick={() => setSidebarAberta(false)} className="absolute top-6 right-4">
                  <AiOutlineClose className="w-5 h-5" />
                </button>
                <h2 className="font-bold text-4xl md:text-5xl mt-12">Meu Carrinho</h2>
                <div className="mt-8">
                  {produtoCarrinho ? (
                    <ProdutoCarrinho
                      imagem={produtoCarrinho?.imagem}
                      nome={produtoCarrinho?.nome}
                      preco={produtoCarrinho?.valor}
                      quantidade={produtoCarrinho?.qtdDisponivel}
                    />
                  ) : (
                    <span className="text-xl text-center">Não há produtos no carrinho</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <Button acao={comprarProduto}>Comprar</Button>
                <Button cor="branco" acao={() => setSidebarAberta(false)}>
                  Voltar
                </Button>
              </div>
            </div>
          </aside>
        ) : null}
      </DetectarCliqueFora>
      {sidebarAberta ? (
        // eslint-disable-next-line
        <div
          className="fixed w-screen h-screen top-0 left-0 bg-[rgba(0,0,0,.5)] z-50"
          onClick={() => setSidebarAberta(false)}
        />
      ) : null}
    </>
  );
}
