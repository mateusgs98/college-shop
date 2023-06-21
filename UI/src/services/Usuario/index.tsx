import { AxiosResponse } from "axios";
import { API } from "../API";
import { DadosLoginUsuario, LoginUsuarioResposta, RegistrarUsuarioForm, UsuarioCadastrado } from "./types";

export function cadastrarUsuario(dadosUsuario: RegistrarUsuarioForm): Promise<AxiosResponse<UsuarioCadastrado>> {
  return API.post("/usuario/cadastrar", dadosUsuario);
}

export function loginUsuario(dadosUsuario: DadosLoginUsuario): Promise<AxiosResponse<LoginUsuarioResposta>> {
  return API.post("/usuario/login", dadosUsuario);
}
