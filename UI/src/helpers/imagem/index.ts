export function converterImagemParaBase64(imagem: File): Promise<string> {
  return new Promise((resolve) => {
    const leitor = new FileReader();
    leitor.readAsDataURL(imagem);

    leitor.onloadend = () => resolve(leitor.result as string);
  });
}
