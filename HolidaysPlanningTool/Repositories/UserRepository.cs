using System;
using System.Data.Entity;
using System.Security.Cryptography;
using System.Text;
using Models;
using UnitOfWork;

namespace Repositories
{
    public interface IUserRepository : IGenericRepository<User>
    {
        
    }
    public class UserRepository:GenericRepository<User>, IUserRepository
    {
        public UserRepository(DatabaseDbContext context) : base(context)
        {
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
    public class UserService : EntityService<User>, IUserService
    {
        public UserService(IUnitOfWork unitOfWork, IUserRepository repository) : base(unitOfWork, repository)
        {
        }

        public override void Create(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
           // user.Password = Stuff.Hash(user.Password);
            _repository.Add(user);
            _unitOfWork.Commit();
        }
    }

    public interface IUserService : IEntityService<User>
    {
        
    }
}
