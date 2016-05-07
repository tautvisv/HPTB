using System.Collections.Generic;
using Models;

namespace Repositories
{
    public interface IAbstractIndependentRepository<TEntity> where TEntity : Entity, ITravelItem, IUserItem, IDateNow
    {
        int GetCountByTravel(int travelId);
        IList<TEntity> GetAllByUser(string userId);
        IList<TEntity> GetAllByTravel(int travelId);
        int GetCountByUser(string userId);
        void Update(TEntity entity);
        TEntity Insert(TEntity entity);
        TEntity Exist(string userId, int travelId);
    }
}