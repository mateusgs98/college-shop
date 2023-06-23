import { API } from "../API";
import { CadastroProdutoRequest, ProdutoResposta } from "./types";

export async function obterProdutoPorId(idProduto: string): Promise<ProdutoResposta> {
  return (await API.get(`/produto/obterPorId/${idProduto}`)).data.value;
}

export async function cadastrarProduto(produto: CadastroProdutoRequest) {
  return API.post("/produto/cadastrar", produto);
}
