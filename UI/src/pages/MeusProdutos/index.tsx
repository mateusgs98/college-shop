import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineLoading } from "react-icons/ai";
import { Link } from "react-router-dom";
import Button from "../../components/Comum/Button";
import { AuthContext } from "../../contexts/AuthContext/authContext";
import { formatadorMonetario } from "../../helpers/monetario/formatadorMonetario";
import { obterProdutosPorUsuario } from "../../services/Produto";

export default function MeusProdutos() {
  const { idUsuario } = useContext(AuthContext);

  async function obterProdutosUsuario() {
    const { data } = await obterProdutosPorUsuario(idUsuario as number);
    return data;
  }

  const { data: produtos, isLoading } = useQuery({
    queryKey: ["obterProdutoUsuario"],
    queryFn: obterProdutosUsuario,
  });

  return (
    <div className="min-h-[calc(100vh-180px)] px-14 py-8">
      <div className="flex justify-between mb-10">
        <h2 className="text-3xl font-bold">Meus Produtos</h2>
        <Link to="/cadastro-produto">
          <Button>Cadastrar Produto</Button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-y-20 justify-items-center">
        {produtos &&
          produtos.value.length > 0 &&
          produtos.value.map((produto) => (
            <div
              key={`${produto.nome}-${produto.valor}`}
              className="relative w-[250px] flex flex-col items-center px-8 py-3 border-2 border-black shadow-lg rounded-lg"
            >
              <img src={`data:image/png;base64, ${produto.imagem}`} alt="imagem produto" className="w-24" />
              <span className="font-bold text-xl">{produto.nome}</span>
              <span>{formatadorMonetario.format(produto.valor)}</span>
              <div className="flex gap-2 absolute top-1 right-1">
                <AiOutlineEdit className="w-5 h-5 cursor-pointer hover:brightness-120" />
                <AiOutlineDelete className="w-5 h-5 cursor-pointer hover:brightness-120" />
              </div>
            </div>
          ))}
        {!isLoading && produtos?.value.length === 0 && (
          <span className="text-3xl col-span-3">Você não possui produtos cadastrados</span>
        )}
        {isLoading && <AiOutlineLoading className="w-12 h-12 animate-spin mx-auto col-start-2" />}
      </div>
    </div>
  );
}
