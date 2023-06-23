import { DadosLoginUsuario } from "../../../services/Usuario/types";

export type AuthProviderProps = {
  children: React.ReactNode;
};

export type DadosAuthContext = {
  idUsuario: number | null;
  autenticado: boolean;
  mensagemErro: string | null;
  handleLogin: (dadosLogin: DadosLoginUsuario) => Promise<void>;
  handleLogout: () => void;
};
