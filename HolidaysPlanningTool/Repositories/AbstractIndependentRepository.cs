using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Models;
using UnitOfWork;

namespace Repositories
{
    public abstract class AbstractIndependentRepository<TEntity> : IAbstractIndependentRepository<TEntity> where TEntity: Entity, ITravelItem, IUserItem, IDateNow
    {
        protected readonly DatabaseDbContext DbContext;
        protected readonly IDbSet<TEntity> DDbset;
        protected AbstractIndependentRepository(DatabaseDbContext dbContext)
        {
            DbContext = dbContext;
            DDbset = DbContext.Set<TEntity>();
        }

        public int GetCountByTravel(int travelId)
        {
            var result = DDbset.Count(x => x.TravelId == travelId);
            return result;
        }
        public TEntity Insert(TEntity entity)
        {
            entity.Date = DateTime.UtcNow;
            var result =  DDbset.Add(entity);
            DbContext.Commit();
            return result;
        }

        public TEntity Exist(string userId, int travelId)
        {
            var result = DDbset.FirstOrDefault(x => x.UserId.Equals(userId) && x.TravelId == travelId);
            return result;
        }

        public void Update(TEntity entity)
        {
            entity.Date = DateTime.UtcNow;
            DbContext.Entry(entity).State = EntityState.Modified;
            DbContext.SaveChanges();
        }

        public IList<TEntity> GetAllByUser(string userId)
        {
            var result = DDbset.Where(x => x.UserId == userId).OrderByDescending(x => x.Date).ToList();
            return result;
        }

        public IList<TEntity> GetAllByTravel(int travelId)
        {
            var result = DDbset.Where(x => x.TravelId == travelId).OrderByDescending(x => x.Date).ToList();
            return result;
        }

        public int GetCountByUser(string userId)
        {
            var result = DDbset.Count(x => x.UserId == userId);
            return result;
        }
    }
}