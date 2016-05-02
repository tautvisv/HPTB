using System;
using System.Security.Principal;
using Microsoft.AspNet.Identity;
using Models;
using Repositories;
using UnitOfWork;

namespace Services
{
    public class CommentsService : EntityService<Comment>, ICommentsService
    {
        protected readonly IUserRepository UserRepository;
        public CommentsService(IUnitOfWork unitOfWork, ICommentsRepository repository, IUserRepository userRepository) : base(unitOfWork, repository)
        {
            UserRepository = userRepository;
        }

        public Comment Create(Comment comment, IIdentity identity)
        {
            comment.AuthorId = identity.GetUserId();
            comment.Date = DateTime.UtcNow;
            var newComment = _repository.Add(comment);
            comment.Author = UserRepository.GetById(comment.AuthorId);
            this._unitOfWork.Commit();
            return newComment;
        }
    }
}