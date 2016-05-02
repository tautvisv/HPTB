using System.Data.Entity;
using System.Linq;
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

        public override Travel GetById(int id)
        {
            var travel = _dbset
                .Include(x => x.Author).Include(x => x.EndDay.Point).Include(x => x.StartDay.Point).Include(x => x.Comments).Include(x => x.WayPoints.Select(w => w.TravelDays.Select(d => d.Point))).Include(x => x.WayPoints.Select(w => w.Point))
                .SingleOrDefault(x => x.Id == id);
            return travel;
        }
    }
}
