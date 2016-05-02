using System.Security.Principal;
using Models;

namespace Services
{
    //TODO merge it
    public interface ICreateByIdentity<in T> where T : Entity
    {
        void Create(T travel, IIdentity identity);
    }
    public interface ICreateByIdentityR<T> where T : Entity
    {
        T Create(T TEntity, IIdentity identity);
    }
}