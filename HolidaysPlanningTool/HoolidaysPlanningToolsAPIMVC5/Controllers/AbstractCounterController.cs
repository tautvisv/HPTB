using System.Web.Http;
using IServices;
using Microsoft.AspNet.Identity;
using Models;

namespace HoolidaysPlanningToolsAPIMVC5.Controllers
{
    public abstract class AbstractCounterController<TEntity> : AbstractApiController
        where TEntity : Entity, ITravelItem, IUserItem, IDateNow
    {
        protected readonly IAbstractIndependentService<TEntity> Service;

        protected AbstractCounterController(IAbstractIndependentService<TEntity> service)
        {
            Service = service;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("Travel/{id}")]
        public IHttpActionResult GetViewsByTravel(int id)
        {
            var views = Service.GetAllByTravel(id);
            return Results(views);
        }

        [Authorize]
        [HttpGet]
        [Route("User")]
        [Route("User/Limit/{limit}")]
        public IHttpActionResult GetViewsByUser(int limit = 50)
        {
            var id = User.Identity.GetUserId();
            var views = Service.GetAllByUser(id);
            return Results(views);
        }

        public abstract IHttpActionResult PostView(TEntity like);

    }
}