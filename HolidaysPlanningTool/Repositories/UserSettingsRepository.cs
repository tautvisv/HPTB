using System.Data.Entity;
using System.Linq;
using Models;
using UnitOfWork;

namespace Repositories
{
    public interface IUserSettingsRepository:IGenericRepository<User>
    {
        User GetByUserId(string userId);
    }

    public class UserSettingsRepository : GenericRepository<User>, IUserSettingsRepository
    {
        public UserSettingsRepository(DatabaseDbContext context) : base(context)
        {
        }

        public User GetByUserId(string userId)
        {
            var user = _dbset.FirstOrDefault(x => x.UserId == userId);
            return user;
        }
    }
}
