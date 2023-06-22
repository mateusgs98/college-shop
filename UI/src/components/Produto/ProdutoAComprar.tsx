import React from "react";

type ProdutoAComprarProps = {
  imagem: string;
  nome: string;
  preco: number;
  quantidade: number;
};

export default function ProdutoAComprar({ imagem, nome, preco, quantidade }: ProdutoAComprarProps) {
  const formatadorMonetario = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div>
      <div className="flex gap-2">
        <img src={imagem} className="w-36" alt="Imagem produto" />
        <div className="flex flex-col">
          <span className="font-medium text-xl">{nome}</span>
          <span>{formatadorMonetario.format(preco)}</span>
          <span>Qtd: {quantidade}</span>
        </div>
      </div>
    </div>
  );
}
