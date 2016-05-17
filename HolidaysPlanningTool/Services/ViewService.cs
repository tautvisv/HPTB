using System.Collections.Generic;
using IRepositories;
using IServices;
using Models;

namespace Services
{
    public class ViewService : GeneralService<View>, IViewService
    {
        private readonly IViewRepository Repository;

        public ViewService(IViewRepository repository) : base(repository)
        {
            Repository = repository;
        }
    }

    public class LikeService : GeneralService<Like>, ILikeService
    {
        private readonly ILikeRepository Repository;

        public LikeService(ILikeRepository repository):base(repository)
        {
            Repository = repository;
        }

        public Like GetTravelLikeByUser(string userId, int travelId)
        {
            return Repository.GetTravelLikeByUser(userId, travelId);
        }

        public TravelLikeModel GetTravelLikesModel(string userId, int travelId)
        {
            return Repository.GetTravelLikesModel(userId, travelId);
        }
    }

    public abstract class GeneralService<TEntity>: IAbstractIndependentService<TEntity> where TEntity : Entity, ITravelItem, IUserItem, IDateNow
    {
        private readonly IAbstractIndependentRepository<TEntity> Repository;
        protected GeneralService(IAbstractIndependentRepository<TEntity> repository)
        {
            this.Repository = repository;
        }

        public IList<TEntity> GetAllByTravel(int travelId)
        {
            return Repository.GetAllByTravel(travelId);
        }

        public IList<TEntity> GetAllByUser(string userId)
        {
            return Repository.GetAllByUser(userId);
        }

        public void Update(TEntity entity)
        {
            Repository.Update(entity);
        }

        public TEntity Insert(TEntity entity)
        {
            return Repository.Insert(entity);
        }

        public TEntity Exist(string userId, int travelId)
        {
            return Repository.Exist(userId, travelId);
        }

        public void Update(TEntity entity, int dif)
        {
            Repository.Update(entity, dif);
        }

        public TEntity Insert(TEntity entity, int dif)
        {
            return Repository.Insert(entity,dif);
        }
    }
}