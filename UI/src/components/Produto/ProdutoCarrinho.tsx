import React from "react";
import { formatadorMonetario } from "../../helpers/monetario/formatadorMonetario";

type ProdutoCarrinhoProps = {
  imagem?: string;
  nome?: string;
  preco?: number;
  quantidade?: number;
};

export default function ProdutoCarrinho({ imagem, nome, preco, quantidade }: ProdutoCarrinhoProps) {
  return (
    <div>
      <div className="flex gap-5">
        <img src={`data:image/png;base64, ${imagem}`} className="w-24" alt="Imagem produto" />
        <div className="flex flex-col gap-y-2">
          <span className="font-bold text-2xl">{nome}</span>
          <span className="text-xl">{formatadorMonetario.format(preco as number)}</span>
          <span className="text-xl">Qtd: {quantidade}</span>
        </div>
      </div>
    </div>
  );
}
