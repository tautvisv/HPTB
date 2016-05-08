using System.Drawing;
using System.IO;
using System.Net;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Models;
using Repositories;

namespace HoolidaysPlanningToolsAPIMVC5.Controllers
{
    [AllowAnonymous]
    [RoutePrefix(Constants.Constants.WebApiPrefix + "Views")]
    public class ViewsController : CounterController<View>
    {
        protected readonly IViewRepository ViewsRepository;

        public ViewsController(IViewRepository viewsRepository) : base(viewsRepository)
        {
            ViewsRepository = viewsRepository;
        }

        [Authorize]
        [HttpPost]
        public override IHttpActionResult PostView(View view)
        {
            var userId = User.Identity.GetUserId();
            view.UserId = userId;
            var exist = Repository.Exist(view.UserId, view.TravelId);
            if (exist != null)
            {
                Repository.Update(exist);
            }
            else
            {
                Repository.Insert(view,1);
            }
            return Results(new { exist });
        }

    }
}