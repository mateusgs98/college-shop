import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { z } from "zod";
import CardForm from "../../components/Cards/CardForm";
import Button from "../../components/Comum/Button";
import Senha from "../../components/Comum/Input/Senha";
import Text from "../../components/Comum/Input/Text";
import { AuthContext } from "../../contexts/AuthContext/authContext";
import { LoginUsuarioForm } from "../../services/Usuario/types";

export default function Login() {
  const { handleLogin } = useContext(AuthContext);

  const schema = z.object({
    email: z.string().email("Email inválido.").min(1, "Obrigatório"),
    senha: z.string().min(1, "Obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUsuarioForm>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["loginUsuario"],
    mutationFn: handleLogin,
    onError: () => {
      toast.error("Não foi possível realizar o login, tente novamente mais tarde.");
    },
  });

  const handleEnvioForm = handleSubmit(async (dadosForm: LoginUsuarioForm) => {
    mutateAsync(dadosForm);
  });

  return (
    <CardForm titulo="Login">
      <form onSubmit={handleEnvioForm} className="mt-8 flex flex-col gap-5 md:min-w-[250px]">
        <Text name="email" register={register} placeholder="Email" erro={errors.email} />
        <Senha name="senha" register={register} placeholder="Senha" erro={errors.senha} />
        <div className="flex flex-col gap-3">
          <Button submit carregando={isLoading}>
            Entrar
          </Button>
          <Link to="/registrar">
            <Button cor="branco">Criar Conta</Button>
          </Link>
        </div>
      </form>
    </CardForm>
  );
}
