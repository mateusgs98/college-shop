/* eslint-disable react/jsx-no-bind */
import { useQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "../../components/Comum/Button";
import { formatadorMonetario } from "../../helpers/monetario/formatadorMonetario";
import { obterProdutoPorId } from "../../services/Produto";
import { ProdutoResposta } from "../../services/Produto/types";

type ProdutoEspecificoProps = {
  setProdutoCarrinho: Dispatch<SetStateAction<ProdutoResposta | null>>;
};

export default function ProdutoEspecifico({ setProdutoCarrinho }: ProdutoEspecificoProps) {
  const { id: idProduto } = useParams();

  async function obterPorId() {
    return obterProdutoPorId(idProduto as string);
  }

  const {
    data: produto,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["obterProdutoPorId"],
    queryFn: obterPorId,
  });

  function adicionarAoCarrinho() {
    if (produto) {
      setProdutoCarrinho(produto);
      toast.success("Produto adicionado ao carrinho!");
    }
  }

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
            <h2 className="text-4xl font-bold mb-5 mt-6">{produto?.nome}</h2>
            <span className="text-2xl">Categoria: {produto?.categoria}</span>
          </div>
          <div className="flex justify-between items-center mt-16">
            <img
              src={`data:image/png;base64, ${produto?.imagem}`}
              alt="imagem produto"
              className="w-56 h-56 aspect-square object-contain mix-blend-color-burn"
            />
            <div className="flex flex-col gap-7">
              <span className="text-3xl max-w-sm">{produto?.descricao}</span>
              <span className="text-3xl">{produto?.qtdDisponivel} unidades restantes</span>
              <span className="font-bold text-4xl">{formatadorMonetario.format(produto?.valor as number)}</span>
            </div>
            <div className="flex flex-col justify-center gap-5">
              <Button acao={adicionarAoCarrinho}>Adicionar ao Carrinho</Button>
              <Link to="/">
                <Button cor="branco">Voltar para a Pesquisa</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
