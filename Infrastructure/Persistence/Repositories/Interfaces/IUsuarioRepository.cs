using Microsoft.AspNetCore.Identity;
using Infrastructure.Persistence.Entities;

namespace Infrastructure.Persistence.Repositories.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<IdentityResult> Cadastrar(Usuario usuario, string senha);
        Task<bool> ValidarUsuario(string email, string senha);
        Task<string> GerarTokenAutenticacao(string email, string secretKey, string validIssuer, string validAudience, int expiresIn);
    }
}