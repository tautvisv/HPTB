using Models;

namespace IRepositories
{
    public interface ILikeRepository: IAbstractIndependentRepository<Like>
    {
        Like GetTravelLikeByUser(string userId, int travelId);
        TravelLikeModel GetTravelLikesModel(string userId, int travelId);
    }
}