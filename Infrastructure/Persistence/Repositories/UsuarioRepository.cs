using Microsoft.AspNetCore.Identity;
using Infrastructure.Persistence.Entities;
using Infrastructure.Persistence.Repositories.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Infrastructure.Persistence.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly UserManager<Usuario> _userManager;

        public UsuarioRepository(UserManager<Usuario> userManager)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        }

        public async Task<IdentityResult> Cadastrar(Usuario usuario, string senha)
        {
            return await _userManager.CreateAsync(usuario, senha);
        }

        public async Task<bool> ValidarUsuario(string email, string senha)
        {
            var usuario = await _userManager.FindByNameAsync(email);
            
            return usuario != null && await _userManager.CheckPasswordAsync(usuario, senha);
        }

        public async Task<string> GerarTokenAutenticacao(string email, string secretKey, string validIssuer, string validAudience, int expiresIn)
        {
            var usuario = await _userManager.FindByNameAsync(email);

            var signingCredentials = GetSigningCredentials(secretKey);
            var claims = await GetClaims(usuario);
            var tokenOptions = GenerateTokenOptions(signingCredentials, claims, validIssuer, validAudience, expiresIn);

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        private SigningCredentials GetSigningCredentials(string secretKey)
        {
            var key = Encoding.UTF8.GetBytes(secretKey);
            var secret = new SymmetricSecurityKey(key);
            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private async Task<List<Claim>> GetClaims(Usuario usuario)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, usuario.UserName)
            };
            // var roles = await _userManager.GetRolesAsync(usuario);
            // foreach (var role in roles)
            // {
            //     claims.Add(new Claim(ClaimTypes.Role, role));
            // }
            return claims;
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims, string validIssuer, string validAudience, int expiresIn)
        {
            var tokenOptions = new JwtSecurityToken
            (
                issuer: validIssuer,
                audience: validAudience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(expiresIn)),
                signingCredentials: signingCredentials
            );
            return tokenOptions;
        }
    }
}