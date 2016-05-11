using Models;

namespace IServices
{
    public interface ICommentsService : IEntityService<Comment>, ICreateByIdentityR<Comment>
    {
    }
}