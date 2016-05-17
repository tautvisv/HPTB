using System.Web.Http;
using IServices;
using Microsoft.AspNet.Identity;
using Models;

namespace HoolidaysPlanningToolsAPIMVC5.Controllers
{
    [AllowAnonymous]
    [RoutePrefix(Constants.Constants.WebApiPrefix + "Views")]
    public class ViewsController : AbstractCounterController<View>
    {
        protected readonly IViewService ViewsService;

        public ViewsController(IViewService viewsService) : base(viewsService)
        {
            ViewsService = viewsService;
        }

        [Authorize]
        [HttpPost]
        public override IHttpActionResult PostView(View view)
        {
            var userId = User.Identity.GetUserId();
            view.UserId = userId;
            var exist = Service.Exist(view.UserId, view.TravelId);
            if (exist != null)
            {
                Service.Update(exist);
            }
            else
            {
                Service.Insert(view,1);
            }
            return Results(new { exist });
        }

    }
}