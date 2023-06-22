using Infrastructure.Persistence.Entities;

namespace Infrastructure.Persistence.Repositories.Interfaces
{
    public interface IProdutoRepository
    {
        Task<Produto> Cadastrar(Produto produto);
        Task<Produto> Editar(Produto produto);
        Task Excluir(int idProduto);
        Task<List<Produto>> ObterPorUsuario(int idUsuario);
        Task<List<List<Produto>>> ObterTodos();
        Task<Produto> ObterPorId(int idProduto);
    }
}