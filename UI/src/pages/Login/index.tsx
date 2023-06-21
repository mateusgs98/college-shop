import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import CardForm from "../../components/Cards/CardForm";
import Button from "../../components/Comum/Button";
import Senha from "../../components/Comum/Input/Senha";
import Text from "../../components/Comum/Input/Text";
import { LoginUsuarioForm } from "../../services/Usuario/types";

export default function Login() {
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

  const handleEnvioForm = handleSubmit(async (dadosForm: LoginUsuarioForm) => {
    //
  });

  return (
    <CardForm titulo="Login">
      <form onSubmit={handleEnvioForm} className="mt-8 flex flex-col gap-5 md:min-w-[250px]">
        <Text name="email" register={register} placeholder="Email" erro={errors.email} />
        <Senha name="senha" register={register} placeholder="Senha" erro={errors.senha} />
        <div className="flex flex-col gap-3">
          <Button submit>Entrar</Button>
          <Button cor="branco">
            <Link to="/registrar">Criar Conta</Link>
          </Button>
        </div>
      </form>
    </CardForm>
  );
}
