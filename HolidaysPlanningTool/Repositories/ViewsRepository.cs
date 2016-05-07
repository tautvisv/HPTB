using Models;
using UnitOfWork;

namespace Repositories
{
    public class ViewsRepository : AbstractIndependentRepository<View>, IViewRepository
    {
        public ViewsRepository(DatabaseDbContext dbContext) : base(dbContext)
        {
        }
    }
}