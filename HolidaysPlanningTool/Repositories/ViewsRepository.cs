using Models;
using UnitOfWork;

namespace Repositories
{
    public class ViewsRepository : AbstractIndependentRepository<View>, IViewRepository
    {
        public ViewsRepository(DatabaseDbContext dbContext) : base(dbContext)
        {
        }

        public override void Update(View entity, int dif)
        {
            DbContext.Database.ExecuteSqlCommand(
               $"UPDATE travels.\"Travels\" SET \"ViewsCount\" = \"ViewsCount\"+{dif} WHERE \"Id\" = {entity.TravelId} ");
            Update(entity);
        }

        public override View Insert(View entity, int dif)
        {
            DbContext.Database.ExecuteSqlCommand(
                $"UPDATE travels.\"Travels\" SET \"ViewsCount\" = \"ViewsCount\"+{dif} WHERE \"Id\" = {entity.TravelId} ");
            return Insert(entity);
        }
    }
}