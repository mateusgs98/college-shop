import { API } from "../API";
import { ProdutoResposta } from "./types";

export async function obterProdutoPorId(idProduto: string): Promise<ProdutoResposta> {
  return (await API.get(`/produto/obterPorId/${idProduto}`)).data.value;
}
