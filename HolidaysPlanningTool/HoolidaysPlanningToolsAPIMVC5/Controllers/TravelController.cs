using System.Web;
using System.Web.Http;
using IServices;
using Models;

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
            TravelService.ImageParser = new GoogleImageParser.GoogleImageParser(HttpContext.Current.Server.MapPath("~"));
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
        public IHttpActionResult GetViewedTravels(int page=1, int count = 10)
        {
            if (page < 1 || count > 100)
            {
                return BadRequest($"{nameof(page)} must be positive number. {nameof(count)} must be less than 100.");
            }
            var user = User.Identity;
            var travels = TravelService.GetRecentViewedTravels(user, page, count);
            return Results(travels);
        }
        [Authorize]
        [HttpGet]
        [Route("Liked/Page/{page}/Count/{count}")]
        [Route("Liked")]
        public IHttpActionResult GetLikedTravels(int page=1, int count = 10)
        {

            if (page < 1 || count > 100)
            {
                return BadRequest($"{nameof(page)} must be positive number. {nameof(count)} must be less than 100.");
            }
            var user = User.Identity;
            var travels = TravelService.GetLikedTravels(user, page, count);
            return Results(travels);
        }
        [HttpGet]
        [Route("Page/{page}/Count/{count}/Search/{phrase}")]
        [Route("Page/{page}/Count/{count}/Search")]
        public IHttpActionResult GetSearchedTravels(int page, int count, string phrase = "")
        {
            if (page < 1 || count > 100)
            {
                return BadRequest($"{nameof(page)} must be positive number. {nameof(count)} must be less than 100.");
            }
            if (phrase == "null") phrase = ""; 
            var travels = TravelService.SearchTravels(phrase, page, count);
            return Results(travels);
        }
        [HttpGet]
        [Route("User/Page/{page}/Count/{count}")]
        [Route("User")]
        public IHttpActionResult GetUserCreatedTravels(int page = 1, int count = 5)
        {
            if (page < 1 || count > 100)
            {
                return BadRequest($"{nameof(page)} must be positive number. {nameof(count)} must be less than 100.");
            }
            var user = User.Identity;
            var travels = TravelService.GetUsersTravels(user, page, count);
            return Results(travels);
        }

    }
}
