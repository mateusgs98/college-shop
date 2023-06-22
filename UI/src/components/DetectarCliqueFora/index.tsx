import React, { useEffect } from "react";

type DetectarCliqueForaProps = {
  children: React.ReactNode;
  onClicarFora: (event: Event) => void;
  refElemento: React.MutableRefObject<any>;
  esconderAoClicarEsc?: (event: Event) => void;
};

const DetectarCliqueFora = ({ children, onClicarFora, refElemento, esconderAoClicarEsc }: DetectarCliqueForaProps) => {
  useEffect(() => {
    function handleCliqueFora(event: Event) {
      if (refElemento.current && !refElemento.current.contains(event.target)) {
        onClicarFora(event);
      }
    }
    function handleCliqueEsc(event: KeyboardEvent) {
      if (event.key === "Escape" && esconderAoClicarEsc) {
        esconderAoClicarEsc(event);
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    }

    document.addEventListener("click", handleCliqueFora, true);
    if (esconderAoClicarEsc) {
      document.addEventListener("keydown", handleCliqueEsc, true);
    }

    return () => {
      document.removeEventListener("click", handleCliqueFora, true);
    };
  }, [refElemento]);

  return children;
};

export default DetectarCliqueFora;
