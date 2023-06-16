using Infrastructure.Persistence.Entities;
using Infrastructure.Persistence.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories
{
    public class ProdutoRepository : IProdutoRepository
    {
        private readonly ApplicationDBContext _context;

        public ProdutoRepository(ApplicationDBContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Produto> Cadastrar(Produto produto)
        {
            await _context.Produtos.AddAsync(produto);
            await _context.SaveChangesAsync();

            return produto;
        }

        public async Task<Produto> Editar(Produto produto)
        {
            var produtoDb = await ObterPorId(produto.Id);
            
            produtoDb.Nome = produto.Nome;
            produtoDb.Valor = produto.Valor;
            produtoDb.Categoria = produto.Categoria;
            produtoDb.Descricao = produto.Descricao;
            produtoDb.Fabricante = produto.Fabricante;
            produtoDb.QtdDisponivel = produto.QtdDisponivel;
            produtoDb.Imagem = produto.Imagem;

            await _context.SaveChangesAsync();

            return produtoDb;
        }

        public async Task Excluir(int idProduto)
        {
            var produto = await ObterPorId(idProduto);

            produto.DataExclusao = DateTime.Now;

            await _context.SaveChangesAsync();
        }

        public async Task<List<Produto>> ObterPorUsuario(int idUsuario)
        {
            return await _context.Produtos.Where(p => 
                p.IdUsuario == idUsuario && p.DataExclusao == null).ToListAsync();
        }

        public async Task<List<Produto>> ObterTodos()
        {
            return await _context.Produtos.Where(p =>
                p.DataExclusao == null).ToListAsync();
        }

        public async Task<Produto> ObterPorId(int idProduto)
        {
            var produto = await _context.Produtos.FindAsync(idProduto);
            if (produto == null)
                throw new Exception("Produto não encontrado.");

            return produto;
        }
    }
}