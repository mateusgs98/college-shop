export function converterImagemParaBase64(imagem: File) {
  return new Promise((resolve) => {
    const leitor = new FileReader();
    leitor.readAsDataURL(imagem);

    leitor.onloadend = () => resolve(leitor.result);
  });
}
