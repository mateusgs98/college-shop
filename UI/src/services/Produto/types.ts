export type CadastroProdutoForm = {
  imagem: FileList;
  nome: string;
  categoria: string;
  fabricante: string;
  valor: string;
  descricao: string;
  qtdDisponivel: string;
};

type CadastroProdutoRequisicao = {
  imagem: string;
  nome: string;
  categoria: string;
  fabricante: string;
  valor: number;
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

type IdUsuario = {
  idUsuario: number;
};

export type CadastroProdutoRequest = CadastroProdutoRequisicao & IdUsuario;
