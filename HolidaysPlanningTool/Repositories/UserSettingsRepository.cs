using System.Linq;
using IRepositories;
using Models;
using UnitOfWork;

namespace Repositories
{
    public class UserSettingsRepository : GenericRepository<User>, IUserSettingsRepository
    {
        public UserSettingsRepository(DatabaseDbContext context) : base(context)
        {
        }

        public override void Edit(User user)
        {

            _entities.Database.ExecuteSqlCommand(
               $"UPDATE dbo.\"AspNetUsers\" SET \"Email\" = '{user.Email}' WHERE \"Id\" = '{user.UserId}' ");
            base.Edit(user);
        }

        public User GetByUserId(string userId)
        {
            var user = _dbset.FirstOrDefault(x => x.UserId == userId);
            return user;
        }
        public bool Exist(string username, string email)
        {
            var user = _dbset.FirstOrDefault(x => x.Email.Equals(email) && !x.Username.ToLower().Equals(username.ToLower()));
            return user != null;
        }
    }
}
