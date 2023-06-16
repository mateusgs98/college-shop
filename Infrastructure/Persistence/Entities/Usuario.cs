using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Persistence.Entities
{
    [Table("Usuario", Schema = "dbo")]
    public class Usuario : IdentityUser
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        
        [MaxLength(200)]
        public string NomeCompleto { get; set; }
        
        public DateTime? DataNascimento { get; set; }
    }
}