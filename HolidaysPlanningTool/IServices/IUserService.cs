using Models;

namespace IServices
{
    public interface IUserService : IEntityService<User>
    {
        bool Exist(string username, string email);
    }

}