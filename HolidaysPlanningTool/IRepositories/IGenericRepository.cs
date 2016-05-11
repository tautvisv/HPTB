using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Models;

namespace IRepositories
{
    public interface IGenericRepository<T> where T : Entity
    {
        T GetById(int id);
        IEnumerable<T> GetAll();
        IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate);
        T Add(T entity);
        T Delete(T entity);
        void Edit(T entity);
        void Save();
    }
}