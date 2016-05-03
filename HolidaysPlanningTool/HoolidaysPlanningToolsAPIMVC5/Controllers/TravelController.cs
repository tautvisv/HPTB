using System.Security.Principal;
using System.Web.Http;
using Microsoft.Ajax.Utilities;
using Microsoft.AspNet.Identity;
using Models;
using Services;

namespace HoolidaysPlanningToolsAPIMVC5.Controllers
{
    [Authorize]
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

        [HttpGet]
        [Route("test")]
        public int GetTest()
        {
            return 5;
        }
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
    }
}
