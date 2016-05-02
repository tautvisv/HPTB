using System.Web.Http;

namespace HoolidaysPlanningToolsAPIMVC5.Controllers
{
    public abstract class AbstractApiController: ApiController
    {
        protected virtual IHttpActionResult Results(object result)
        {
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}