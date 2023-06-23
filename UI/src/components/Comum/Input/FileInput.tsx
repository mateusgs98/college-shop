import React from "react";
import { FieldError, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { AiFillCloseCircle } from "react-icons/ai";
import MensagemErroForm from "../../MensagemErroForm/index";

type FileProps = {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  erro?: FieldError;
  name: string;
  placeholder: string;
};

export default function FileInput({ register, watch, setValue, erro, name, placeholder }: FileProps) {
  return (
    <div>
      {!watch(name) || watch(name).length === 0 ? (
        <div>
          <input type="file" id={name} {...register(name)} className="hidden" />
          <label
            htmlFor={name}
            className={`block md:inline text-center md:text-left cursor-pointer px-5 py-2 rounded-full 
            hover:brightness-110 border text-white bg-[var(--azul-escuro-primario)] border-[var(--azul-escuro-primario)]
            ${erro ? "erroBorda focus:outline-[var(--erro-borda)]" : ""}`}
          >
            {placeholder}
          </label>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <span>{watch(name)[0].name}</span>
          <button type="button" onClick={() => setValue(name, null)}>
            <AiFillCloseCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="mt-3">{erro ? <MensagemErroForm erro={erro.message} /> : null}</div>
    </div>
  );
}
