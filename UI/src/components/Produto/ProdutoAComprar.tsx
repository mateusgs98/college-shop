import React from "react";
import { formatadorMonetario } from "../../helpers/monetario/formatadorMonetario";

type ProdutoAComprarProps = {
  imagem: string;
  nome: string;
  preco: number;
  quantidade: number;
};

export default function ProdutoAComprar({ imagem, nome, preco, quantidade }: ProdutoAComprarProps) {
  return (
    <div className="flex gap-2">
      <img src={imagem} className="w-36" alt="Imagem produto" />
      <div className="flex flex-col mt-8">
        <span className="font-medium text-xl">{nome}</span>
        <span>{formatadorMonetario.format(preco)}</span>
        <span>Qtd: {quantidade}</span>
      </div>
    </div>
  );
}
