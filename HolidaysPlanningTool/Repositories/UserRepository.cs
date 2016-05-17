using System.Linq;
using System.Security.Cryptography;
using System.Text;
using IRepositories;
using Models;
using UnitOfWork;

namespace Repositories
{
    public class UserRepository:GenericRepository<User>, IUserRepository
    {
        public UserRepository(DatabaseDbContext context) : base(context)
        {
        }

        public User GetById(string userId)
        {
            return _dbset.Find(userId);
        }

        public bool Exist(string username, string email)
        {
            var user = _dbset.FirstOrDefault(x => x.Username.Equals(username) || x.Email.Equals(email));
            return user != null;
        }
    }

}
