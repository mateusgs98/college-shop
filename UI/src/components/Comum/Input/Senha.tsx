import React, { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import MensagemErroForm from "../../MensagemErroForm";

type SenhaProps = {
  register: UseFormRegister<any>;
  erro?: FieldError;
  name: string;
  placeholder: string;
};

export default function Senha({ register, erro, name, placeholder }: SenhaProps) {
  const [exibirSenha, setExibirSenha] = useState(false);

  return (
    <div className="flex flex-col gap-0.5 w-full relative">
      <input
        type={exibirSenha ? "text" : "password"}
        id={name}
        placeholder=" "
        {...register(name)}
        className={`block rounded-lg pl-2.5 pr-6 pb-2.5 pt-5 w-full text-sm text-[var(--preto-texto)] 
        bg-white border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
          peer ${erro ? "erroBorda focus:outline-[var(--border-error)]" : ""}`}
      />
      <label
        className="pl-0.5 absolute text-sm text-[var(--cinza-texto)] duration-300 transform 
          -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 text-[#7e7c7c]
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
          peer-focus:scale-75 peer-focus:-translate-y-4 cursor-text"
        htmlFor={name}
      >
        {placeholder}
      </label>

      <button
        type="button"
        onClick={() => setExibirSenha((valorAnterior) => !valorAnterior)}
        className="absolute top-4 right-2.5 text-red-500"
      >
        {exibirSenha ? (
          <AiFillEyeInvisible className="w-5 h-5 text-[var(--cinza-texto)]" />
        ) : (
          <AiFillEye className="w-5 h-5 text-[var(--cinza-texto)]" />
        )}
      </button>
      {erro ? <MensagemErroForm erro={erro.message} /> : null}
    </div>
  );
}
