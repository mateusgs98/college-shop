using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Persistence.Entities
{
    [Table("Produto", Schema = "dbo")]
    public class Produto
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        [ForeignKey("Usuario")]
        public int IdUsuario { get; set; }
        public virtual Usuario Usuario { get; set; }

        [MaxLength(200)]
        public string Nome { get; set; }
        
        public decimal Valor { get; set; }

        [MaxLength(200)]
        public string Categoria { get; set; }
        
        [MaxLength(200)]
        public string? Descricao { get; set; }
        
        [MaxLength(200)]
        public string? Fabricante { get; set; }
        
        public int QtdDisponivel { get; set; }
        
        public byte[] Imagem { get; set; }
        
        public DateTime? DataExclusao { get; set; }
    }
}