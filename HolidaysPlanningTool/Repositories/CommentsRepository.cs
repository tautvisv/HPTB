using System.Linq;
using Models;
using UnitOfWork;

namespace Repositories
{
    public class CommentsRepository:GenericRepository<Comment>, ICommentsRepository
    {
        public CommentsRepository(DatabaseDbContext context) : base(context)
        {
        }

        public int GetCount(int parentId)
        {
            var count = _dbset.Count(x => x.TravelId == parentId);
            return count;
        }
    }
}
