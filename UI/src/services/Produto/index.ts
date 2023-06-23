import { AxiosResponse } from "axios";
import { API } from "../API";
import { CadastroProdutoRequest, ProdutoResposta, ProdutoUsuarioResposta } from "./types";

export async function obterProdutoPorId(idProduto: string): Promise<ProdutoResposta> {
  return (await API.get(`/produto/obterPorId/${idProduto}`)).data.value;
}

export async function cadastrarProduto(produto: CadastroProdutoRequest) {
  return API.post("/produto/cadastrar", produto);
}

export async function obterProdutosPorUsuario(idUsuario: number): Promise<AxiosResponse<ProdutoUsuarioResposta>> {
  return API.get(`/produto/obterporusuario/${idUsuario}`);
}
