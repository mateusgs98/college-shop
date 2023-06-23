import { AxiosError } from "axios";
import React, { createContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API } from "../../services/API";
import { loginUsuario } from "../../services/Usuario";
import { DadosLoginUsuario } from "../../services/Usuario/types";
import { AuthProviderProps, DadosAuthContext } from "./types";

export const AuthContext = createContext<DadosAuthContext>({
  idUsuario: null,
  autenticado: false,
  mensagemErro: null,
  handleLogin: Object,
  handleLogout: Function,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [tokenAcesso, setTokenAcesso] = useState<string | null>(null);
  const [carregandoApp, setCarregandoApp] = useState(true);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idUsuario");
    setTokenAcesso(null);
    setIdUsuario(null);
    navigate("/login");
  };

  const setarDadosIniciaisApp = async () => {
    const token = localStorage.getItem("accessToken");
    const idUser = localStorage.getItem("idUsuario");
    if (token) {
      API.defaults.headers.common.Authorization = `Bearer ${JSON.parse(token)}`;
      setTokenAcesso(token);
    }
    if (idUser) {
      setIdUsuario(Number(idUser));
    }

    setCarregandoApp(false);
  };

  useEffect(() => {
    setarDadosIniciaisApp();
  }, []);

  const handleLogin = async (loginData: DadosLoginUsuario) => {
    try {
      const { data } = await loginUsuario(loginData);

      localStorage.setItem("accessToken", JSON.stringify(data.value.token));
      localStorage.setItem("idUsuario", JSON.stringify(data.value.idUsuario));
      API.defaults.headers.common.Authorization = `Bearer ${data.value.token}`;
      setTokenAcesso(data.value.token);
      setIdUsuario(data.value.idUsuario);
      navigate("/");
    } catch (e) {
      const err = e as AxiosError<any>;
      const errorMsg =
        err.response?.data && err.response.data.message
          ? err.response.data.message
          : import.meta.env.VITE_GENERIC_ERROR_MESSAGE;
      setMensagemErro(errorMsg);
      toast.error("Credenciais inválidas");
    }
  };

  const contextData = useMemo(
    () => ({
      autenticado: !!tokenAcesso,
      mensagemErro,
      handleLogin,
      handleLogout,
      idUsuario,
    }),
    [tokenAcesso, mensagemErro]
  );

  return <AuthContext.Provider value={contextData}>{!carregandoApp ? children : null}</AuthContext.Provider>;
};
