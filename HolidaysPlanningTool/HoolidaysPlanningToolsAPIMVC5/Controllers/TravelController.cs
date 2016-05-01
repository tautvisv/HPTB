using System.Security.Principal;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Models;
using Services;

namespace HoolidaysPlanningToolsAPIMVC5.Controllers
{
    [Authorize]
    [RoutePrefix(Constants.Constants.WebApiPrefix + "Travel")]
    public class TravelController : ApiController
    {
        protected readonly ITravelService travelService;
        public TravelController(ITravelService travelService)
        {
            this.travelService = travelService;
        }

        public IHttpActionResult PostTravel([FromBody]Travel travel)
        {
            //var userId = ide.GetUserId();
            travelService.Create(travel, User.Identity);
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
        public int GetTest2(int id)
        {
            return id;
        }
    }
}
