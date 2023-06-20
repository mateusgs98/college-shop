using Infrastructure.Persistence.Entities;
using Infrastructure.Persistence.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories
{
    public class CompraRepository : ICompraRepository
    {
        private readonly ApplicationDBContext _context;

        public CompraRepository(ApplicationDBContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Compra> RealizarCompra(Compra compra)
        {
            await _context.Compras.AddAsync(compra);
            await _context.SaveChangesAsync();

            return compra;
        }
    }
}