using System.Collections.Generic;
using System.Security.Principal;
using IMisc;
using Models;

namespace IServices
{
    public interface ITravelService:IEntityService<Travel>, ICreateByIdentity<Travel>
    {
        IIMageParser ImageParser { get; set; }
        Travel GetById(int id);
        IList<Travel> GetRecentTravels(int count);
        PagedResult<Travel> GetUsersTravels(IIdentity user, int skip, int count);
        PagedResult<Travel> GetRecentViewedTravels(IIdentity user, int skip, int take);
        PagedResult<Travel> GetLikedTravels(IIdentity user, int skip, int take);
        PagedResult<Travel> SearchTravels(string phrase, int skip, int take);
    }
}