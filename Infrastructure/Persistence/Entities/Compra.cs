using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Persistence.Entities
{
    [Table("Compra", Schema = "dbo")]
    public class Compra
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        [ForeignKey("Produto")]
        public int IdProduto { get; set; }
        public virtual Produto Produto { get; set; }

        [MaxLength(200)]
        public string Nome { get; set; }

        public string Cpf { get; set; }

        public string Endereco { get; set; }

        public string Telefone { get; set; }

        [MaxLength(200)]
        public string Email { get; set; }

        public string Status { get; set; }
        
        public decimal Valor { get; set; }

        public DateTime Data { get; set; }
    }
}