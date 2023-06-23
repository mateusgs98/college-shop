import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { z } from "zod";
import CardForm from "../../components/Cards/CardForm";
import Button from "../../components/Comum/Button";
import FileInput from "../../components/Comum/Input/FileInput";
import NumberInput from "../../components/Comum/Input/NumberInput";
import Text from "../../components/Comum/Input/Text";
import { AuthContext } from "../../contexts/AuthContext/authContext";
import { converterImagemParaBase64 } from "../../helpers/imagem";
import { cadastrarProduto } from "../../services/Produto";
import { CadastroProdutoForm } from "../../services/Produto/types";

export default function CadastroProduto() {
  const { idUsuario } = useContext(AuthContext);

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
    qtdDisponivel: z.string({ required_error: "Obrigatório" }).min(1, "Obrigatório"),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<CadastroProdutoForm>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: cadastrarProduto,
    onSuccess: (dadosResposta) => {
      if (dadosResposta.data.value?.errors) {
        toast.error("Não foi possível cadastrar o produto, tente novamente.");
        return;
      }

      toast.success("Produto cadastrado com sucesso!");
      reset({
        categoria: "",
        descricao: "",
        fabricante: "",
        imagem: undefined,
        nome: "",
        qtdDisponivel: "",
        valor: "",
      });
    },
    onError: () => {
      toast.error("Não foi possível obter os produtos, tente novamente.");
    },
  });

  const handleEnvioForm = handleSubmit(async (dadosForm: CadastroProdutoForm) => {
    const imagemBase64 = await converterImagemParaBase64(dadosForm.imagem[0]);
    const imagemBase64Formatada = imagemBase64.split("data:image/png;base64,")[1];
    mutation.mutateAsync({
      ...dadosForm,
      imagem: imagemBase64Formatada,
      idUsuario: idUsuario as number,
      valor: Number(dadosForm.valor.replaceAll(".", "").replaceAll(",", ".")),
      qtdDisponivel: Number(dadosForm.qtdDisponivel.replaceAll(".", "").replaceAll(",", ".")),
    });
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
          <Link to="/meus-produtos" className="w-full">
            <Button cor="branco">Voltar</Button>
          </Link>
          <Button submit carregando={mutation.isLoading}>
            Salvar
          </Button>
        </div>
      </form>
    </CardForm>
  );
}
