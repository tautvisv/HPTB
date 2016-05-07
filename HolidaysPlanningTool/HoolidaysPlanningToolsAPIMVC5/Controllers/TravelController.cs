using System.Security.Principal;
using System.Web.Http;
using Microsoft.Ajax.Utilities;
using Microsoft.AspNet.Identity;
using Models;
using Services;

namespace HoolidaysPlanningToolsAPIMVC5.Controllers
{
    [AllowAnonymous]
    [RoutePrefix(Constants.Constants.WebApiPrefix + "Travel")]
    public class TravelController : AbstractApiController
    {
        protected readonly ITravelService TravelService;
        public TravelController(ITravelService travelService)
        {
            this.TravelService = travelService;
        }

        public IHttpActionResult PostTravel([FromBody]Travel travel)
        {
            //var userId = ide.GetUserId();
            TravelService.Create(travel, User.Identity);
            return Ok(travel);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult GetTravelById(int id)
        {
            var travel = TravelService.GetById(id);
            return Results(travel);
        }
        [HttpGet]
        [Route("Recent/{count}")]
        [Route("Recent")]
        public IHttpActionResult GetRecentTravels(int count = 4)
        {
            var travels = TravelService.GetRecentTravels(count);
            return Results(travels);
        }
        [Authorize]
        [HttpGet]
        [Route("Viewed/Page/{page}/Count/{count}")]
        [Route("Viewed")]
        public IHttpActionResult GetViewedTravels(int page=0, int count = 10)
        {
            var skipElementCount = page*count;
            var user = User.Identity;
            var travels = TravelService.GetRecentViewedTravels(user, skipElementCount, count);
            return Results(travels);
        }
        [Authorize]
        [HttpGet]
        [Route("Liked/Page/{page}/Count/{count}")]
        [Route("Liked")]
        public IHttpActionResult GetLikedTravels(int page=0, int count = 10)
        {
            var skipElementCount = page*count;
            var user = User.Identity;
            var travels = TravelService.GetLikedTravels(user, skipElementCount, count);
            return Results(travels);
        }
        [HttpGet]
        [Route("Search/{phrase}/Page/{page}/Count/{count}")]
        [Route("Search/Page/{page}/Count/{count}")]
        public IHttpActionResult GetSearchedTravels(int page, int count, string phrase = "")
        {
            var skipElementCount = page*count;
            var travels = TravelService.SearchTravels(phrase, skipElementCount, count);
            return Results(travels);
        }
        [HttpGet]
        [Route("User/Page/{page}/Count/{count}")]
        [Route("User")]
        public IHttpActionResult GetUserCreatedTravels(int page = 0, int count = 5)
        {
            var skipElementCount = page*count;
            var user = User.Identity;
            var travels = TravelService.GetUsersTravels(user, skipElementCount, count);
            return Results(travels);
        }

    }
}
