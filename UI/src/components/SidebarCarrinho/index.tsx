import React, { Dispatch, SetStateAction, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import DetectarCliqueFora from "../DetectarCliqueFora";
import ProdutoCarrinho from "../Produto/ProdutoCarrinho";

type SidebarCarrinhoProps = {
  sidebarAberta: boolean;
  setSidebarAberta: Dispatch<SetStateAction<boolean>>;
};

export default function SidebarCarrinho({ sidebarAberta, setSidebarAberta }: SidebarCarrinhoProps) {
  const refSidebarCarrinho = useRef<HTMLElement | null>(null);

  return (
    <>
      <DetectarCliqueFora onClicarFora={() => setSidebarAberta(false)} refElemento={refSidebarCarrinho}>
        {sidebarAberta ? (
          <aside
            className="fixed right-0 top-0 h-screen bg-[var(--cinza-claro-primario)] px-4 md:px-12 border-l-2 border-black z-[70] max-w-[320px] lg:max-w-md"
            ref={refSidebarCarrinho}
          >
            <button type="button" onClick={() => setSidebarAberta(false)} className="absolute top-6 right-4">
              <AiOutlineClose className="w-5 h-5" />
            </button>
            <h2 className="font-bold text-4xl md:text-5xl mt-12">Meu Carrinho</h2>
            <div className="mt-8">
              <ProdutoCarrinho
                imagem="https://photos.enjoei.com.br/livro-calculo-volume-1-james-stewart/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy83NTgwMTcxL2FlZWFiNGRiNGMzM2QzMmU2MjMyODQ5ZTVhODcyMTRhLmpwZw"
                nome="Livro de Cálculo"
                preco={49.9}
                quantidade={1}
              />
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
