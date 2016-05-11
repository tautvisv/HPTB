using System;
using System.Collections.Generic;
using IRepositories;
using IServices;
using Models;

namespace Services
{
    public abstract class EntityService<T> : IEntityService<T> where T : Entity
    {
        protected IUnitOfWork.IUnitOfWork _unitOfWork;
        protected IGenericRepository<T> _repository;

        protected EntityService(IUnitOfWork.IUnitOfWork unitOfWork, IGenericRepository<T> repository)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
        }


        public virtual void Create(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            BeforeCreate(entity);
            _repository.Add(entity);
            _unitOfWork.Commit();
        }

        protected virtual void BeforeCreate(T entity)
        {
        }

        public virtual void Update(T entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));
            _repository.Edit(entity);
            _unitOfWork.Commit();
        }

        public virtual void Delete(T entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));
            _repository.Delete(entity);
            _unitOfWork.Commit();
        }

        public virtual IEnumerable<T> GetAll()
        {
            return _repository.GetAll();
        }
    }
}