using System.ComponentModel.DataAnnotations;

namespace Domain.DTOs
{
    public class LoginUsuario
    {
        [Required(ErrorMessage = "O campo Email é obrigatório")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "O campo Senha é obrigatório")]
        public string? Senha { get; set; }
    }
}