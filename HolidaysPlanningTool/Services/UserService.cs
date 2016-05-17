using System;
using IRepositories;
using IServices;
using Models;

namespace Services
{
    public class UserService : EntityService<User>, IUserService
    {
        private readonly IUserRepository Repository;
        public UserService(IUnitOfWork.IUnitOfWork unitOfWork, IUserRepository repository) : base(unitOfWork, repository)
        {
            Repository = repository;
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

        public bool Exist(string username, string email)
        {
            return Repository.Exist(username, email);
        }
    }

}