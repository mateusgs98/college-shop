import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters, AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formatadorMonetario } from "../../helpers/monetario/formatadorMonetario";
import { obterTodosProdutos } from "../../services/Produto";

export default function ListagemProdutos() {
  const [buscaProdutos, setBuscaProdutos] = useState("");

  const { data: todosProdutos, isLoading } = useQuery({
    queryKey: ["obterTodosProdutos"],
    queryFn: obterTodosProdutos,
  });

  const produtosFiltrados = todosProdutos?.value.filter((categoria) =>
    categoria[0].nome.toLowerCase()?.includes(buscaProdutos.toLowerCase())
  );

  return (
    <div className="px-14 py-6">
      <div className="relative w-fit ml-auto">
        <input
          type="text"
          value={buscaProdutos}
          onChange={(e) => setBuscaProdutos(e.target.value)}
          className="block rounded-lg pr-2.5 pl-8 pb-2.5 pt-3 w-full text-sm text-[var(--preto-texto)] 
        bg-white border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0"
          placeholder="Buscar"
        />
        <AiOutlineSearch className="absolute top-3.5 left-2 w-5 h-5" />
      </div>
      {isLoading && <AiOutlineLoading3Quarters className="mx-auto w-24 h-24 animate-spin" />}
      {produtosFiltrados && produtosFiltrados.length === 0 && buscaProdutos ? (
        <span className="text-2xl">Não existem produtos com o nome especificado</span>
      ) : null}
      {produtosFiltrados && produtosFiltrados.length === 0 && !buscaProdutos ? (
        <span className="text-2xl">Não existem produtos cadastrados</span>
      ) : null}
      {produtosFiltrados?.map((categoria) => (
        <div key={`${categoria[0].categoria}-${categoria[0].nome}`}>
          <h2 className="font-bold text-2xl mb-3 capitalize">{categoria[0].categoria}</h2>
          <div className="grid grid-cols-3 gap-x-10 mb-10 justify-items-center">
            {categoria.map((produto) => (
              <Link to={`produto/${produto.id}`} key={produto.id} title="Ir para a página do produto">
                <div className="rounded-lg shadow-xl border-2 border-black flex flex-col items-center justify-center w-[300px] h-fit p-5">
                  <img
                    src={`data:image/png;base64, ${produto.imagem}`}
                    alt="imagem produto"
                    className="w-24 h-24 aspect-square object-contain mix-blend-color-burn mb-2"
                  />
                  <h2 className="font-bold text-2xl">{produto.nome}</h2>
                  <span className="text-lg">{formatadorMonetario.format(produto.valor)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
