namespace Domain.DTOs.Produto
{
    public class PesquisarProduto
    {
        public int Id { get; set; }
        public byte[] Imagem { get; set; }
        public string Nome { get; set; }
        public decimal Valor { get; set; }
        public string Categoria { get; set;}
    }
}