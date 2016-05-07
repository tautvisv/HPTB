using Models;
using UnitOfWork;

namespace Repositories
{
    public class PointRepository : GenericRepository<Point>, IPointRepository
    {
        public PointRepository(DatabaseDbContext context) : base(context)
        {
        }
    }
    public class TravelDayRepositoryRepository : GenericRepository<TravelDayPlan>, ITravelDayRepository
    {
        public TravelDayRepositoryRepository(DatabaseDbContext context) : base(context)
        {
        }
    }

    public interface ITravelDayRepository: IGenericRepository<TravelDayPlan>
    {
    }
}
