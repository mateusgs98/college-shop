import { useQuery } from "@tanstack/react-query";
import React from "react";
import { AiOutlineCheckCircle, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "../../components/Comum/Button";
import { formatadorMonetario } from "../../helpers/monetario/formatadorMonetario";
import { obterProdutoPorId } from "../../services/Produto";

export default function AcompanharPedido() {
  const navigate = useNavigate();
  const { id } = useParams();

  function getProdutoPorId() {
    return obterProdutoPorId(id as string);
  }

  const {
    data: produto,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["obterProdutoAcompanharPedido"],
    queryFn: getProdutoPorId,
  });

  return (
    <div
      className={`min-h-[calc(100vh-180px)] px-16 py-10 ${
        isLoading || isError ? "flex items-center justify-center" : ""
      }`}
    >
      {!isLoading && isError && (
        <span className="text-4xl">Não foi possível obter os dados do produto, tente novamente mais tarde.</span>
      )}
      {isLoading && (
        <div>
          <AiOutlineLoading3Quarters className="w-24 h-24 animate-spin" />
        </div>
      )}
      {!isLoading && !isError && (
        <>
          <div className="px-8">
            <h2 className="text-4xl font-bold mb-5 mt-6">Pedido</h2>
            <span className="text-2xl">{produto?.nome}</span>
          </div>
          <div className="flex justify-between items-center mt-16">
            <img
              src={`data:image/png;base64, ${produto?.imagem}`}
              alt="imagem produto"
              className="w-56 h-56 aspect-square object-contain mix-blend-color-burn"
            />
            <div className="flex flex-col gap-7">
              <span className="text-3xl max-w-sm">{produto?.descricao}</span>
              <div className="flex gap-3 items-center">
                <span className="text-3xl">Status do pedido: Aprovado</span>
                <AiOutlineCheckCircle className="w-5 h-5 mt-0.5" fill="green" />
              </div>
              <span className="font-bold text-4xl">{formatadorMonetario.format(produto?.valor as number)}</span>
            </div>
            <div className="flex flex-col justify-center gap-5">
              <Button acao={() => navigate(`/produto/${id}`)}>Página do produto</Button>
              <Link to="/">
                <Button cor="branco">Voltar</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
