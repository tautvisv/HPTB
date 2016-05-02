using Models;
using Repositories;

namespace Services
{
    public interface ICommentsService : IEntityService<Comment>, ICreateByIdentityR<Comment>
    {
    }
}