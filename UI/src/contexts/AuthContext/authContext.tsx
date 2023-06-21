import { AxiosError } from "axios";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../services/API";
import { loginUsuario } from "../../services/Usuario";
import { DadosLoginUsuario } from "../../services/Usuario/types";
import { AuthProviderProps, DadosAuthContext } from "./types";

export const AuthContext = createContext<DadosAuthContext>({
  autenticado: false,
  mensagemErro: null,
  handleLogin: Object,
  handleLogout: Function,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const [tokenAcesso, setTokenAcesso] = useState<string | null>(null);
  const [carregandoApp, setCarregandoApp] = useState(true);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setTokenAcesso(null);
    navigate("/");
  };

  const setarDadosIniciaisApp = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      API.defaults.headers.common.Authorization = `Bearer ${JSON.parse(token)}`;
      setTokenAcesso(token);
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
      API.defaults.headers.common.Authorization = `Bearer ${data.value.token}`;
      navigate("/");
      setTokenAcesso(data.value.token);
    } catch (e) {
      const err = e as AxiosError<any>;
      const errorMsg =
        err.response?.data && err.response.data.message
          ? err.response.data.message
          : import.meta.env.VITE_GENERIC_ERROR_MESSAGE;
      setMensagemErro(errorMsg);
    }
  };

  const contextData = useMemo(
    () => ({
      autenticado: !!tokenAcesso,
      mensagemErro,
      handleLogin,
      handleLogout,
    }),
    [tokenAcesso, mensagemErro]
  );

  return <AuthContext.Provider value={contextData}>{!carregandoApp ? children : null}</AuthContext.Provider>;
};
