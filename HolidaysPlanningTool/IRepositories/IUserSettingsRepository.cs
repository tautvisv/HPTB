using Models;

namespace IRepositories
{
    public interface IUserSettingsRepository:IGenericRepository<User>
    {
        User GetByUserId(string userId);
        bool Exist(string username, string email);
    }
}