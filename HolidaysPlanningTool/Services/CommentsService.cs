using System;
using System.Security.Principal;
using IRepositories;
using IServices;
using Microsoft.AspNet.Identity;
using Models;

namespace Services
{
    public class CommentsService : EntityService<Comment>, ICommentsService
    {
        protected readonly IUserRepository UserRepository;
        public CommentsService(IUnitOfWork.IUnitOfWork unitOfWork, ICommentsRepository repository, IUserRepository userRepository) : base(unitOfWork, repository)
        {
            UserRepository = userRepository;
        }

        public Comment Create(Comment comment, IIdentity identity)
        {
            if (identity == null)
            {
                throw new ArgumentNullException(nameof(identity));
            }
            comment.AuthorId = identity.GetUserId();
            comment.Date = DateTime.UtcNow;
            var newComment = _repository.Add(comment);
            comment.Author = UserRepository.GetById(comment.AuthorId);
            this._unitOfWork.Commit();
            return newComment;
        }
    }
}