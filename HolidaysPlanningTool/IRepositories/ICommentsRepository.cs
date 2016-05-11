using Models;

namespace IRepositories
{
    public interface ICommentsRepository : IGenericRepository<Comment>, IParentCount
    {
    }
}