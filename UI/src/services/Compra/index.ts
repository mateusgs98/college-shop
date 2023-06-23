import { API } from "../API";
import { CompraProdutoForm } from "./types";

export function realizarCompra(compra: CompraProdutoForm) {
  return API.post("/compra/realizarCompra", compra);
}
