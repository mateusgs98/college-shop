using Microsoft.AspNetCore.Mvc;
using Infrastructure.Persistence.Repositories.Interfaces;
using Infrastructure.Persistence.Entities;
using Domain.DTOs.Usuario;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/usuario")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IConfiguration _configuration;

        public UsuarioController(IUsuarioRepository usuarioRepository, IConfiguration configuration)
        {
            _usuarioRepository = usuarioRepository ?? throw new ArgumentNullException(nameof(usuarioRepository));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        [HttpPost("cadastrar")]
        public async Task<IResult> Cadastrar([FromBody]RegistrarUsuario usuario)
        {
            var usuarioEntity = new Usuario
            {
                Email = usuario.Email,
                UserName = usuario.Email,
                NomeCompleto = usuario.NomeCompleto
            };

            var resultado = await _usuarioRepository.Cadastrar(usuarioEntity, usuario.Senha);

            if (!resultado.Succeeded)
                return Results.BadRequest(resultado);

            return Results.Ok();
        }

        [HttpPost("login")]
        public async Task<IResult> Login([FromBody]LoginUsuario usuario)
        {
            var usuarioValidado = await _usuarioRepository.ValidarUsuario(usuario.Email, usuario.Senha);
            if (!usuarioValidado)
                return Results.Unauthorized();

            var jwtConfig = _configuration.GetSection("JwtConfig");
            var token = await _usuarioRepository.GerarTokenAutenticacao(usuario.Email, jwtConfig["secret"], 
                jwtConfig["validIssuer"], jwtConfig["validAudience"], Convert.ToInt32(jwtConfig["expiresIn"]));

            var usuarioLogado = _usuarioRepository.ObterPorEmail(usuario.Email);

            return Results.Ok(new { token, idUsuario = usuarioLogado.Id });
        }

        [HttpGet("logoff")]
        public async Task<IResult> Logoff()
        {
            return Results.Ok();
        }
    }
}