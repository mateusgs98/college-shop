export type RegistrarUsuarioForm = {
  nomeCompleto: string;
  email: string;
  senha: string;
};

export type LoginUsuarioForm = {
  email: string;
  senha: string;
};

export type UsuarioCadastrado = {
  value: {
    succeeded: boolean;
    errors: {
      code: string;
      description: string;
    }[];
    statusCode: number;
  };
};

type Erro = {
  errors: {
    code: string;
    description: string;
  };
};

export type ErroApiIdentity = {
  value: Erro;
  statusCode: number;
};

export type DadosLoginUsuario = {
  email: string;
  senha: string;
};

export type LoginUsuarioResposta = {
  value: {
    token: string;
  };
  statusCode: number;
};
