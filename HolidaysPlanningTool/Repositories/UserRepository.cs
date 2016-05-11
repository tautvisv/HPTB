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
    //tODO do somethning
    public class Stuff
    {
        public static string Hash(string input)
        {
            using (SHA1Managed sha1 = new SHA1Managed())
            {
                var hash = sha1.ComputeHash(Encoding.UTF8.GetBytes(input));
                var sb = new StringBuilder(hash.Length * 2);

                foreach (byte b in hash)
                {
                    // can be "x2" if you want lowercase
                    sb.Append(b.ToString("X2"));
                }

                return sb.ToString();
            }
        }

    }

}
