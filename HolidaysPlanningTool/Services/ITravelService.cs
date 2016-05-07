using System.Collections.Generic;
using System.Security.Principal;
using Models;
using Repositories;

namespace Services
{
    public interface ITravelService:IEntityService<Travel>, ICreateByIdentity<Travel>
    {
        Travel GetById(int id);
        IList<Travel> GetRecentTravels(int count);
        IList<Travel> GetUsersTravels(IIdentity user, int skip, int count);
        IList<Travel> GetRecentViewedTravels(IIdentity user, int skip, int take);
        IList<Travel> GetLikedTravels(IIdentity user, int skip, int take);
        IList<Travel> SearchTravels(string phrase, int skip, int take);
    }
}