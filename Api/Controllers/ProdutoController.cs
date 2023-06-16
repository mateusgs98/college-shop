using Microsoft.AspNetCore.Mvc;
using Infrastructure.Persistence.Repositories.Interfaces;
using Infrastructure.Persistence.Entities;
using Domain.DTOs.Produto;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/produto")]
    [Authorize]
    public class ProdutoController : ControllerBase
    {
        private readonly IProdutoRepository _produtoRepository;

        public ProdutoController(IProdutoRepository produtoRepository)
        {
            _produtoRepository = produtoRepository ?? throw new ArgumentNullException(nameof(produtoRepository));
        }

        [HttpGet("obterPorUsuario/{idUsuario}")]
        public async Task<IResult> ObterPorUsuario([FromRoute]int idUsuario)
        {
            var produtos = await _produtoRepository.ObterPorUsuario(idUsuario);
            var produtosDto = produtos.Select(p => new PesquisarProduto
            {
                Imagem = p.Imagem,
                Nome = p.Nome,
                Valor = p.Valor
            }).ToList();

            return Results.Ok(produtosDto);
        }

        [HttpGet("obterPorId/{idProduto}")]
        public async Task<IResult> ObterPorId([FromRoute]int idProduto)
        {
            var produto = await _produtoRepository.ObterPorId(idProduto);
            var produtoDto = new CadastrarEditarProduto
            {
                Id = produto.Id,
                IdUsuario = produto.IdUsuario,
                Nome = produto.Nome,
                Valor = produto.Valor,
                Categoria = produto.Categoria,
                Descricao = produto.Descricao,
                Fabricante = produto.Fabricante,
                QtdDisponivel = produto.QtdDisponivel,
                Imagem = produto.Imagem
            };

            return Results.Ok(produtoDto);
        }

        [HttpGet("obterTodos")]
        public async Task<IResult> ObterTodos()
        {
            var produtos = await _produtoRepository.ObterTodos();
            var produtosDto = produtos.Select(p => new PesquisarProduto
            {
                Imagem = p.Imagem,
                Nome = p.Nome,
                Valor = p.Valor
            }).ToList();

            return Results.Ok(produtosDto);
        }

        [HttpPost("cadastrar")]
        public async Task<IResult> Cadastrar([FromBody]CadastrarEditarProduto produto)
        {
            var produtoEntity = new Produto
            {
                IdUsuario = produto.IdUsuario,
                Nome = produto.Nome,
                Valor = produto.Valor,
                Categoria = produto.Categoria,
                Descricao = produto.Descricao,
                Fabricante = produto.Fabricante,
                QtdDisponivel = produto.QtdDisponivel,
                Imagem = produto.Imagem
            };

            var produtoResultante = await _produtoRepository.Cadastrar(produtoEntity);

            return Results.Ok(produtoResultante);
        }

        [HttpPut("editar")]
        public async Task<IResult> Editar([FromBody]CadastrarEditarProduto produto)
        {
            var produtoEntity = new Produto
            {
                Id = produto.Id,
                IdUsuario = produto.IdUsuario,
                Nome = produto.Nome,
                Valor = produto.Valor,
                Categoria = produto.Categoria,
                Descricao = produto.Descricao,
                Fabricante = produto.Fabricante,
                QtdDisponivel = produto.QtdDisponivel,
                Imagem = produto.Imagem
            };

            var produtoResultante = await _produtoRepository.Editar(produtoEntity);

            return Results.Ok(produtoResultante);
        }

        [HttpDelete("excluir/{idProduto}")]
        public async Task<IResult> Excluir([FromRoute]int idProduto)
        {
            await _produtoRepository.Excluir(idProduto);

            return Results.Ok();
        }
    }
}