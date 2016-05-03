using Models;

namespace Repositories
{
    public interface ICommentsRepository : IGenericRepository<Comment>, IParentCount
    {
    }

    public interface IParentCount
    {
        int GetCount(int parentId);
    }
}