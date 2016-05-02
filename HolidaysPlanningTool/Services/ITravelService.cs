using System.Security.Principal;
using Models;
using Repositories;

namespace Services
{
    public interface ITravelService:IEntityService<Travel>, ICreateByIdentity<Travel>
    {
        Travel GetById(int id);
    }
}