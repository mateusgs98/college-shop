import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import CardForm from "../../components/Cards/CardForm";
import Button from "../../components/Comum/Button";
import CPF from "../../components/Comum/Input/CPF";
import CVVCartao from "../../components/Comum/Input/CVVCartao";
import DataValidadeCartao from "../../components/Comum/Input/DataValidadeCartao";
import NumeroCartao from "../../components/Comum/Input/NumeroCartao";
import Telefone from "../../components/Comum/Input/Telefone";
import Text from "../../components/Comum/Input/Text";
import ProdutoAComprar from "../../components/Produto/ProdutoAComprar";
import { realizarCompra } from "../../services/Compra";
import { CompraProdutoForm } from "../../services/Compra/types";

export default function RealizarCompra() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const schema = z.object({
    idProduto: z.number(),
    nome: z.string().min(1, "Obrigatório"),
    cpf: z
      .string({ required_error: "Obrigatório" })
      .min(1, "Obrigatório")
      .refine((val) => !val.includes("_"), {
        message: "Obrigatório",
      }),
    telefone: z
      .string({ required_error: "Obrigatório" })
      .min(1, "Obrigatório")
      .refine((val) => !val.includes("_"), {
        message: "Obrigatório",
      }),
    endereco: z.string().min(1, "Obrigatório"),
    email: z.string().min(1, "Obrigatório").email("E-mail inválido"),
    numeroCartao: z
      .string({ required_error: "Obrigatório" })
      .min(1, "Obrigatório")
      .refine((val) => !val.includes("_"), {
        message: "Obrigatório",
      }),
    dataValidadeCartao: z
      .string({ required_error: "Obrigatório" })
      .min(1, "Obrigatório")
      .refine((val) => !val.includes("_"), {
        message: "Obrigatório",
      }),
    cvv: z
      .string({ required_error: "Obrigatório" })
      .min(1, "Obrigatório")
      .refine((val) => !val.includes("_"), {
        message: "Obrigatório",
      }),
  });

  const defaultValues = {
    idProduto: state.idProduto,
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CompraProdutoForm>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: realizarCompra,
    onSuccess: () => {
      toast.success("Compra realizada com sucesso!");
      navigate("/");
    },
  });

  const handleEnvioForm = handleSubmit(async (dadosForm: CompraProdutoForm) => {
    mutation.mutateAsync(dadosForm);
  });

  return (
    <div className="grid grid-cols-5 items-center justify-center md:items-start md:flex-row gap-8">
      <div className="mt-44 h-full px-5">
        <ProdutoAComprar
          imagem={`data:image/png;base64, ${state.imagem}`}
          nome={state.nome}
          preco={state.preco as number}
          quantidade={1}
        />
      </div>
      <div className="px-8 col-span-4">
        <CardForm titulo="Realizar Compra" centralizarTitulo={false} className="w-full">
          <form onSubmit={handleEnvioForm} className="mt-7">
            <div className="flex flex-col lg:flex-row gap-7 lg:gap-14">
              <div className="flex flex-col gap-y-5 w-full">
                <Text name="nome" register={register} placeholder="Nome Completo" erro={errors.nome} />
                <CPF name="cpf" control={control} placeholder="CPF" erro={errors.cpf} />
                <Text name="endereco" register={register} placeholder="Endereço" erro={errors.endereco} />
                <Telefone name="telefone" control={control} placeholder="Telefone" erro={errors.telefone} />
              </div>
              <div className="flex flex-col gap-y-5 w-full">
                <Text name="email" register={register} placeholder="E-mail" erro={errors.email} />
                <NumeroCartao
                  name="numeroCartao"
                  control={control}
                  placeholder="Número do cartão"
                  erro={errors.numeroCartao}
                />
                <DataValidadeCartao
                  name="dataValidadeCartao"
                  control={control}
                  placeholder="Data de Validade"
                  erro={errors.dataValidadeCartao}
                />
                <CVVCartao name="cvv" control={control} placeholder="CVV" erro={errors.cvv} />
              </div>
            </div>
            <div className="flex gap-5 w-fit ml-auto mt-8">
              <Button cor="branco">
                <Link to="/" className="px-4">
                  Voltar
                </Link>
              </Button>
              <Button submit carregando={mutation.isLoading} className="min-w-[135px]">
                <span className="px-4 text-white">Comprar</span>
              </Button>
            </div>
          </form>
        </CardForm>
      </div>
    </div>
  );
}
