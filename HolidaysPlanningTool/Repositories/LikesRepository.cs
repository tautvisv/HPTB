using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net.Sockets;
using Models;
using UnitOfWork;

namespace Repositories
{
    public class LikesRepository: AbstractIndependentRepository<Like>, ILikeRepository
    {
        public LikesRepository(DatabaseDbContext dbContext) : base(dbContext)
        {
        }

        public Like GetTravelLikeByUser(string userId, int travelId)
        {
            return DDbset.FirstOrDefault(x => x.UserId.Equals(userId) && x.TravelId.Equals(travelId));
        }

        public override void Update(Like entity, int dif)
        {
            DbContext.Database.ExecuteSqlCommand($"UPDATE travels.\"Travels\" SET \"LikesCount\" = \"LikesCount\"+{dif} WHERE \"Id\" = {entity.TravelId} ");
            Update(entity);
        }

        public override Like Insert(Like entity, int dif)
        {
            DbContext.Database.ExecuteSqlCommand($"UPDATE travels.\"Travels\" SET \"LikesCount\" = \"LikesCount\"+{dif} WHERE \"Id\" = {entity.TravelId} ");
            return Insert(entity);
        }

        public TravelLikeModel GetTravelLikesModel(string userId, int travelId)
        {
            var result = (from likes in DbContext.Likes
                where likes.TravelId.Equals(travelId)
                group likes by likes.TravelId into counter
                select new TravelLikeModel
                {
                    LikesCount = counter.Count(x => x.Status == LikeStatuses.Like),
                    DislikesCount = counter.Count(x => x.Status == LikeStatuses.Dislike),
                    UserLikeStatus = counter.Where(u => u.UserId.Equals(userId)).Select(x=>x.Status).FirstOrDefault()
                }).FirstOrDefault() ?? new TravelLikeModel
                {
                    DislikesCount = 0,
                    LikesCount = 0,
                    UserLikeStatus = LikeStatuses.Neultral
                };
            return result;
        }
    }
}
