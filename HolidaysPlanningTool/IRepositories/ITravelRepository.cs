using System.Collections.Generic;
using Models;

namespace IRepositories
{
    public interface ITravelRepository : IGenericRepository<Travel>
    {
        IList<Travel> GetNewestTravels(int count);
        PagedResult<Travel> GetUsersTravels(string userId, int skip, int take);
        PagedResult<Travel> GetTravelsByLikes(string userId, int skip, int take);
        PagedResult<Travel> GetTravelsByViews(string userId, int skip, int take);
        PagedResult<Travel> Search(string phrase, int skip, int take);
    }
}