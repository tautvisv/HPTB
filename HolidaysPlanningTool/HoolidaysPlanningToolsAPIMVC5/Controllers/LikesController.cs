using System.Web.Http;
using IServices;
using Microsoft.AspNet.Identity;
using Models;

namespace HoolidaysPlanningToolsAPIMVC5.Controllers
{
    [RoutePrefix(Constants.Constants.WebApiPrefix + "Likes")]
    public class LikesController : AbstractCounterController<Like>
    {
        protected readonly ILikeService LikeService;

        public LikesController(ILikeService likeService) : base(likeService)
        {
            LikeService = likeService;
        }

        [Authorize]
        [HttpPost]
        public override IHttpActionResult PostView(Like like)
        {
            var userId = User.Identity.GetUserId();
            var exist = Service.Exist(userId, like.TravelId);
            if (exist != null)
            {
                var dif = like.Status - exist.Status;
                exist.TravelId = like.TravelId;
                exist.Status = like.Status;
                Service.Update(exist, dif);
            }
            else
            {
                like.UserId = userId;
                Service.Insert(like, (int)like.Status);
            }
            return Results(like.Status);

        }
        [Authorize]
        [HttpGet]
        [Route("TravelLike/{travelId}")]
        public IHttpActionResult GetLikeByTravel(int travelId)
        {
            var userId = User.Identity.GetUserId();
            var result = LikeService.GetTravelLikeByUser(userId, travelId);
            return Results(result);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("TravelInformation/{travelId}")]
        public IHttpActionResult GetTravelInformation(int travelId)
        {
            var user = User.Identity;
            var likeModel = LikeService.GetTravelLikesModel(user?.GetUserId(), travelId);
            return Results(likeModel);
        }
        
    }
}
