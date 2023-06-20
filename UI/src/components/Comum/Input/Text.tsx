import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import FormErrorMessage from "../../MensagemErroForm/index";

type TextProps = {
  register: UseFormRegister<any>;
  erro?: FieldError;
  name: string;
  placeholder: string;
};

export default function Text({ register, erro, name, placeholder }: TextProps) {
  return (
    <div className="flex flex-col gap-0.5 w-full relative">
      <input
        type="text"
        id={name}
        placeholder=" "
        {...register(name)}
        className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-[var(--preto-texto)] 
        bg-white border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
          peer ${erro ? "erroBorda focus:outline-[var(--erro-borda)]" : ""}`}
      />
      <label
        className="pl-0.5 absolute text-sm text-[var(--cinza-texto)] duration-300 transform 
          -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 text-[#7e7c7c]
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
          peer-focus:scale-75 peer-focus:-translate-y-4"
        htmlFor={name}
      >
        {placeholder}
      </label>

      {erro ? <FormErrorMessage erro={erro.message} /> : null}
    </div>
  );
}
