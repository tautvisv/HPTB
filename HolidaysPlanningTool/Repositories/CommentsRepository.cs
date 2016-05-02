using Models;
using UnitOfWork;

namespace Repositories
{
    public class CommentsRepository:GenericRepository<Comment>, ICommentsRepository
    {
        public CommentsRepository(DatabaseDbContext context) : base(context)
        {
        }
    }
}
