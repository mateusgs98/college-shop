import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

import Text from "../components/Comum/Input/Text";
import Senha from "../components/Comum/Input/Senha";
import Button from "../components/Comum/Button";

type RegistrarForm = {
  nomeCompleto: string;
  email: string;
  senha: string;
};

export default function Registrar() {
  const schema = z.object({
    nomeCompleto: z.string().min(1, "Obrigatório"),
    email: z.string().email({ message: "E-mail inválido." }).min(1, "Obrigatório"),
    senha: z.string().min(1, "Obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrarForm>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const handleEnvioForm = handleSubmit(async (dadosForm: RegistrarForm) => {
    //
  });

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-180px)] lg:min-h-[calc(100vh-250px)]">
      <div className="shadow-lg py-6 px-14 bg-[#f4f4f5] border border-black rounded-lg">
        <h2 className="text-4xl text-center">Criar Conta</h2>
        <form onSubmit={handleEnvioForm} className="mt-8 flex flex-col gap-5 md:min-w-[250px]">
          <Text placeholder="Nome Completo" name="nomeCompleto" register={register} erro={errors.nomeCompleto} />
          <Text placeholder="Email" name="email" register={register} erro={errors.email} />
          <Senha placeholder="Senha" name="senha" register={register} erro={errors.senha} />
          <Button submit cor="azulEscuro">
            Cadastrar
          </Button>
          <Button cor="branco">
            <Link to="/login">Já estou cadastrado</Link>
          </Button>
        </form>
      </div>
    </div>
  );
}
