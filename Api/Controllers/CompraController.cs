using Microsoft.AspNetCore.Mvc;
using Infrastructure.Persistence.Repositories.Interfaces;
using Infrastructure.Persistence.Entities;
using Domain.DTOs.Compra;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/compra")]
    [Authorize]
    public class CompraController : ControllerBase
    {
        private readonly ICompraRepository _compraRepository;
        private readonly IProdutoRepository _produtoRepository;

        public CompraController(ICompraRepository compraRepository, IProdutoRepository produtoRepository)
        {
            _compraRepository = compraRepository ?? throw new ArgumentNullException(nameof(compraRepository));
            _produtoRepository = produtoRepository ?? throw new ArgumentNullException(nameof(produtoRepository));
        }

        [HttpPost("realizarCompra")]
        public async Task<IResult> RealizarCompra([FromBody]RealizarCompra compra)
        {
            var produto = await _produtoRepository.ObterPorId(compra.IdProduto);

            var compraEntity = new Compra
            {
                Cpf = compra.Cpf,
                Data = DateTime.Now,
                Email = compra.Email,
                Endereco = compra.Endereco,
                IdProduto = compra.IdProduto,
                Nome = compra.Nome,
                Status = "Aprovada",
                Telefone = compra.Telefone,
                Valor = produto.Valor
            };

            compraEntity = await _compraRepository.RealizarCompra(compraEntity);

            return Results.Ok(compraEntity);
        }
    }
}