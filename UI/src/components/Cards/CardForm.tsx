import React from "react";

type CardsFormProps = {
  titulo: string;
  children: React.ReactNode;
};

export default function CardForm({ titulo, children }: CardsFormProps) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-180px)]">
      <div className="shadow-lg py-6 px-12 bg-[#f4f4f5] border border-black sm:rounded-lg">
        <h2 className="text-4xl text-center">{titulo}</h2>
        {children}
      </div>
    </div>
  );
}
