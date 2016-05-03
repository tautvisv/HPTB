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
    }
}