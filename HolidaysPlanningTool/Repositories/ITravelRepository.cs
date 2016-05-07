using System.Collections.Generic;
using Models;

namespace Repositories
{
    public interface ITravelRepository : IGenericRepository<Travel>
    {
        IList<Travel> GetNewestTravels(int count);
        IList<Travel> GetUsersTravels(string userId, int skip, int take);
        IList<Travel> GetTravelsByLikes(string userId, int skip, int take);
        IList<Travel> GetTravelsByViews(string userId, int skip, int take);
        IList<Travel> Search(string phrase, int skip, int take);
    }
}