using System.Collections.Generic;
using Models;

namespace IServices
{
    public interface IViewService: IAbstractIndependentService<View>
    {

    }
    public interface ILikeService: IAbstractIndependentService<Like>
    {
        Like GetTravelLikeByUser(string userId, int travelId);
        TravelLikeModel GetTravelLikesModel(string userId, int travelId);
    }

    public interface IAbstractIndependentService<TEntity> where TEntity : Entity, ITravelItem, IUserItem, IDateNow
    {
        IList<TEntity> GetAllByTravel(int travelId);
        IList<TEntity> GetAllByUser(string userId);
        void Update(TEntity entity);
        TEntity Insert(TEntity entity);
        TEntity Exist(string userId, int travelId);
        void Update(TEntity entity, int dif);
        TEntity Insert(TEntity entity, int dif);
    }
}