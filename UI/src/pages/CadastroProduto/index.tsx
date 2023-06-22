import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import CardForm from "../../components/Cards/CardForm";
import Button from "../../components/Comum/Button";
import FileInput from "../../components/Comum/Input/FileInput";
import NumberInput from "../../components/Comum/Input/NumberInput";
import Text from "../../components/Comum/Input/Text";
import { converterImagemParaBase64 } from "../../helpers/imagem";
import { CadastroProdutoForm } from "../../services/Produto/types";

export default function CadastroProduto() {
  const schema = z.object({
    imagem: z.any().refine((arquivo) => arquivo?.length === 1, "Obrigatório"),
    nome: z.string().min(1, "Obrigatório"),
    categoria: z.string().min(1, "Obrigatório"),
    fabricante: z.string().min(1, "Obrigatório"),
    valor: z
      .string({ required_error: "Obrigatório" })
      .min(1, "Obrigatório")
      .refine((val) => val.split("").length !== 1, {
        message: "Obrigatório",
      }),
    descricao: z.string().min(1, "Obrigatório"),
    qtdDisponivel: z
      .string({ required_error: "Obrigatório" })
      .min(1, "Obrigatório")
      .refine((val) => val.split("").length !== 1, {
        message: "Obrigatório",
      }),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<CadastroProdutoForm>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const handleEnvioForm = handleSubmit(async (dadosForm: CadastroProdutoForm) => {
    const imagemBase64 = await converterImagemParaBase64(dadosForm.imagem[0]);
  });

  return (
    <CardForm titulo="Cadastrar Produto" centralizarTitulo={false}>
      <form onSubmit={handleEnvioForm}>
        <div className="my-8">
          <FileInput
            name="imagem"
            register={register}
            watch={watch}
            setValue={setValue}
            placeholder="Inserir imagem"
            erro={errors.imagem}
          />
        </div>
        <div className="grid grid-cols-1 gap-x-5 gap-y-3 lg:gap-x-5 lg:gap-y-5 md:grid-cols-2 xl:grid-cols-3">
          <Text name="nome" register={register} placeholder="Nome" erro={errors.nome} />
          <Text name="categoria" register={register} placeholder="Categoria" erro={errors.categoria} />
          <Text name="fabricante" register={register} placeholder="Fabricante ou Fornecedor" erro={errors.fabricante} />
          <NumberInput name="valor" control={control} placeholder="Valor" erro={errors.valor} />
          <Text name="descricao" register={register} placeholder="Descrição" erro={errors.descricao} />
          <NumberInput
            name="qtdDisponivel"
            control={control}
            placeholder="Quantidade Disponível"
            erro={errors.qtdDisponivel}
          />
        </div>
        <div className="flex flex-col-reverse sm:flex-row gap-x-5 gap-y-3 mt-5 md:mt-20 md:max-w-xs mx-auto lg:ml-auto lg:mr-0">
          <Button cor="branco">
            <Link to="/">Voltar</Link>
          </Button>
          <Button submit>Salvar</Button>
        </div>
      </form>
    </CardForm>
  );
}
