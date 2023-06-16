using System.ComponentModel.DataAnnotations;

namespace Domain.DTOs.Usuario
{
    public class RegistrarUsuario
    {
        [Required(ErrorMessage = "O campo Email é obrigatório")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "O campo Nome Completo é obrigatório")]
        public string? NomeCompleto { get; set; }

        [Required(ErrorMessage = "O campo Senha é obrigatório")]
        public string? Senha { get; set; }
    }
}