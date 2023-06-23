import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type ButtonProps = {
  submit?: boolean;
  carregando?: boolean;
  disabled?: boolean;
  disabledTitle?: string;
  acao?: (...params: (number | object | string)[]) => void;
  cor?: "azulEscuro" | "branco";
  className?: string;
  children: React.ReactNode;
};

export default function Button({
  submit,
  carregando,
  disabled,
  disabledTitle,
  acao,
  cor = "azulEscuro",
  className,
  children,
}: ButtonProps) {
  return (
    <div className="w-full">
      <button
        type={submit ? "submit" : "button"}
        onClick={acao}
        disabled={carregando || disabled}
        title={disabled ? disabledTitle : undefined}
        className={`px-5 py-2 rounded-full w-full disabled:bg-gray-200 disabled:cursor-not-allowed
        disabled:text-[var(--preto-texto)] hover:brightness-110 border ${
          cor === "azulEscuro"
            ? "text-white bg-[var(--azul-escuro-primario)] border-[var(--azul-escuro-primario)]"
            : "text[-var(--azul-escuro-primario)] border-black hover:bg-gray-50"
        } ${className}`}
      >
        {carregando ? <AiOutlineLoading3Quarters className="animate-spin mx-auto w-5 h-6" /> : children}
      </button>
    </div>
  );
}
