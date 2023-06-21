import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button from "../../components/Comum/Button";
import Senha from "../../components/Comum/Input/Senha";
import Text from "../../components/Comum/Input/Text";
import { AuthContext } from "../../contexts/AuthContext/authContext";
import { cadastrarUsuario } from "../../services/Usuario";
import { RegistrarUsuarioForm } from "../../services/Usuario/types";
import CardForm from "../../components/Cards/CardForm";

export default function Registrar() {
  const { handleLogin } = useContext(AuthContext);

  const schema = z.object({
    nomeCompleto: z.string().min(1, "Obrigatório"),
    email: z.string().email({ message: "E-mail inválido." }).min(1, "Obrigatório"),
    senha: z.string().min(6, "A senha deve possuir no mínimo 6 caracteres."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrarUsuarioForm>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: cadastrarUsuario,
    onSuccess: (dadosResposta, dadosInseridos) => {
      if (dadosResposta.data.value?.errors) {
        toast.error("Não foi possível registrar sua conta, tente novamente.");
        return;
      }

      handleLogin({ email: dadosInseridos.email, senha: dadosInseridos.senha });
    },
    onError: () => {
      toast.error("Não foi possível registrar sua conta, tente novamente.");
    },
  });

  const handleEnvioForm = handleSubmit(async (dadosForm: RegistrarUsuarioForm) => {
    mutation.mutateAsync(dadosForm);
  });

  return (
    <CardForm titulo="Criar Conta">
      <form onSubmit={handleEnvioForm} className="mt-8 flex flex-col gap-5 md:min-w-[250px]">
        <Text placeholder="Nome Completo" name="nomeCompleto" register={register} erro={errors.nomeCompleto} />
        <Text placeholder="Email" name="email" register={register} erro={errors.email} />
        <Senha placeholder="Senha" name="senha" register={register} erro={errors.senha} />
        <div className="flex flex-col gap-3">
          <Button submit cor="azulEscuro" carregando={mutation.isLoading}>
            Cadastrar
          </Button>
          <Button cor="branco">
            <Link to="/login">Já estou cadastrado</Link>
          </Button>
        </div>
      </form>
    </CardForm>
  );
}
