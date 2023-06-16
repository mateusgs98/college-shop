using System.ComponentModel.DataAnnotations;

namespace Domain.DTOs.Produto
{
    public class CadastrarEditarProduto
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage = "O campo Imagem é obrigatório")]
        public byte[] Imagem { get; set; }
        
        [Required(ErrorMessage = "O id do usuário é obrigatório")]
        public int IdUsuario { get; set; }
        
        [MaxLength(200, ErrorMessage = "O campo Nome não deve ultrapassar 200 caracteres")]
        [Required(ErrorMessage = "O campo Nome é obrigatório")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O campo Valor é obrigatório")]
        public decimal Valor { get; set; }

        [MaxLength(200, ErrorMessage = "O campo Categoria não deve ultrapassar 200 caracteres")]
        [Required(ErrorMessage = "O campo Categoria é obrigatório")]
        public string Categoria { get; set; }

        [MaxLength(200, ErrorMessage = "O campo Descrição não deve ultrapassar 200 caracteres")]
        public string? Descricao { get; set; }
        
        [MaxLength(200, ErrorMessage = "O campo Fabricante não deve ultrapassar 200 caracteres")]
        public string? Fabricante { get; set; }
        
        [Required(ErrorMessage = "O campo Quantidade Disponível é obrigatório")]
        public int QtdDisponivel { get; set; }
    }
}