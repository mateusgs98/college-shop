using System.ComponentModel.DataAnnotations;

namespace Domain.DTOs.Compra
{
    public class RealizarCompra
    {
        public int IdProduto { get; set; }

        [MaxLength(200)]
        public string Nome { get; set; }

        public string Cpf { get; set; }

        public string Telefone { get; set; }

        [MaxLength(200)]
        public string Endereco { get; set; }

        [MaxLength(200)]
        public string Email { get; set; }

        public string NumeroCartao { get; set; }

        public string DataValidadeCartao { get; set; }

        public string Cvv { get; set; }
    }
}