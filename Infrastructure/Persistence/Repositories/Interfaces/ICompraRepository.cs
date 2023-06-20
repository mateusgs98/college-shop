using Infrastructure.Persistence.Entities;

namespace Infrastructure.Persistence.Repositories.Interfaces
{
    public interface ICompraRepository
    {
        Task<Compra> RealizarCompra(Compra compra); 
    }
}