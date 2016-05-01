using Models;
using UnitOfWork;

namespace Repositories
{
    public interface ITravelRepository : IGenericRepository<Travel>
    {
        
    }
    public class TravelsRepository: GenericRepository<Travel>, ITravelRepository
    {
        public TravelsRepository(DatabaseDbContext context) : base(context)
        {
        }
    }
}
