using System.Collections.Generic;
using Models;

namespace Repositories
{
    public interface ILikeRepository: IAbstractIndependentRepository<Like>
    {
        Like GetTravelLikeByUser(string userId, int travelId);
        TravelLikeModel GetTravelLikesModel(string userId, int travelId);
    }
}