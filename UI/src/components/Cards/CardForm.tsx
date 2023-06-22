import React from "react";

type CardsFormProps = {
  titulo: string;
  centralizarTitulo?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function CardForm({ titulo, className, centralizarTitulo = true, children }: CardsFormProps) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-180px)]">
      <div
        className={`shadow-lg my-8 py-6 px-3 sm:px-6 lg:px-12 bg-[#f4f4f5]
         border border-black sm:rounded-lg ${className}`}
      >
        <h2 className={`font-bold text-4xl ${centralizarTitulo ? "text-center" : "text-left"}`}>{titulo}</h2>
        {children}
      </div>
    </div>
  );
}
