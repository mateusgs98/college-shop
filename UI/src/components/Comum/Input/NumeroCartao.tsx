import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import MensagemErroForm from "../../MensagemErroForm";

type NumeroCartaoProps = {
  control: Control<any>;
  placeholder: string;
  name: string;
  erro?: FieldError;
};

export default function NumeroCartao({ control, placeholder, name, erro }: NumeroCartaoProps) {
  return (
    <div className="w-full flex flex-col gap-0.5">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <div className="relative">
            <PatternFormat
              format="#### #### #### ####"
              mask="_"
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              autoComplete="off"
              aria-autocomplete="list"
              placeholder=" "
              className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-[var(--preto-texto)] 
                bg-white border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0
                peer ${erro ? "erroBorda focus:outline-[var(--erro-borda)]" : ""}`}
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
          </div>
        )}
      />
      {erro ? <MensagemErroForm erro={erro.message} /> : null}
    </div>
  );
}
