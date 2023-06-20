import React from "react";

type MensagemErroFormProps = {
  erro: string | undefined;
};

export default function MensagemErroForm({ erro }: MensagemErroFormProps) {
  return (
    <div className="leading-[0px]">
      <span className="text-[var(--vermelho-erro)] text-sm">{erro}</span>
    </div>
  );
}
