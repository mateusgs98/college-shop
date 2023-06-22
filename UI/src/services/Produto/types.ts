export type CadastroProdutoForm = {
  imagem: FileList;
  nome: string;
  categoria: string;
  fabricante: string;
  valor: string;
  descricao: string;
  qtdDisponivel: number;
};

export type Produto = {
  nome: string;
  categoria: string;
  descricao: string;
  imagem: string;
  unidadesRestantes: number;
  preco: number;
};

export type ProdutoResposta = {
  id: number;
  imagem: string;
  idUsuario: number;
  nome: string;
  valor: number;
  categoria: string;
  descricao: string;
  fabricante: string;
  qtdDisponivel: number;
};
