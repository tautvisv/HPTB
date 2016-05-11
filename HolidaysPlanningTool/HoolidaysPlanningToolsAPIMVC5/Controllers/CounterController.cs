using System.Web.Http;
using IRepositories;
using Microsoft.AspNet.Identity;
using Models;
using Repositories;

namespace HoolidaysPlanningToolsAPIMVC5.Controllers
{
    public abstract class CounterController<TEntity> : AbstractApiController
        where TEntity : Entity, ITravelItem, IUserItem, IDateNow
    {
        protected readonly IAbstractIndependentRepository<TEntity> Repository;

        protected CounterController(IAbstractIndependentRepository<TEntity> viewsRepository)
        {
            Repository = viewsRepository;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("Travel/{id}")]
        public IHttpActionResult GetViewsByTravel(int id)
        {
            var views = Repository.GetAllByTravel(id);
            return Results(views);
        }

        [Authorize]
        [HttpGet]
        [Route("User")]
        [Route("User/Limit/{limit}")]
        public IHttpActionResult GetViewsByUser(int limit = 50)
        {
            var id = User.Identity.GetUserId();
            var views = Repository.GetAllByUser(id);
            return Results(views);
        }

        public abstract IHttpActionResult PostView(TEntity like);

    }
}