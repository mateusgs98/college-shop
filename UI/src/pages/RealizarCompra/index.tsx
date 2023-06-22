import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
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
import { CompraProdutoForm } from "../../services/Compra";

export default function RealizarCompra() {
  const schema = z.object({
    idProduto: z.string().min(1, "Obrigatório"),
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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CompraProdutoForm>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const handleEnvioForm = handleSubmit(async (dadosForm: CompraProdutoForm) => {
    //
  });

  return (
    <div className="flex flex-col items-center md:items-start md:flex-row gap-8">
      <div className="mt-5 mb-[-32px] md:mb-0 md:mt-10 lg:mt-20">
        <ProdutoAComprar
          imagem="https://images-americanas.b2w.io/produtos/01/00/item/6732/3/6732326_1GG.jpg"
          nome="Livro de Cálculo"
          preco={49.9}
          quantidade={1}
        />
      </div>
      <div className="px-8 flex-1">
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
              <Button submit>
                <span className="px-4 text-white">Comprar</span>
              </Button>
            </div>
          </form>
        </CardForm>
      </div>
    </div>
  );
}
