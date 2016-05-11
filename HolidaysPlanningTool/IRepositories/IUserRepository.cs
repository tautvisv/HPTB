using Models;

namespace IRepositories
{
    public interface IUserRepository : IGenericRepository<User>
    {
        User GetById(string userId);
        bool Exist(string username, string email);
    }
}