import React from "react";

type ProdutoCarrinhoProps = {
  imagem: string;
  nome: string;
  preco: number;
  quantidade: number;
};

export default function ProdutoCarrinho({ imagem, nome, preco, quantidade }: ProdutoCarrinhoProps) {
  const formatadorMonetario = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div>
      <div className="flex gap-5">
        <img src={imagem} className="w-24" alt="Imagem produto" />
        <div className="flex flex-col gap-y-2">
          <span className="font-bold text-2xl">{nome}</span>
          <span className="text-xl">{formatadorMonetario.format(preco)}</span>
          <span className="text-xl">Qtd: {quantidade}</span>
        </div>
      </div>
    </div>
  );
}
