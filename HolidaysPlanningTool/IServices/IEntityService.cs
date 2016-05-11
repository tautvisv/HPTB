using System.Collections.Generic;
using Models;

namespace IServices
{
    public interface IEntityService<T> : IService
        where T : Entity
    {
        void Create(T entity);
        void Delete(T entity);
        IEnumerable<T> GetAll();
        void Update(T entity);
    }
}