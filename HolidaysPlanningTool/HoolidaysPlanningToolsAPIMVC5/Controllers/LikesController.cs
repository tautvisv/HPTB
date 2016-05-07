using System.Web.Http;
using Microsoft.AspNet.Identity;
using Models;
using Repositories;

namespace HoolidaysPlanningToolsAPIMVC5.Controllers
{
    [AllowAnonymous]
    [RoutePrefix(Constants.Constants.WebApiPrefix + "Likes")]
    public class LikesController : CounterController<Like>
    {
        protected readonly ILikeRepository LikeRepository;

        public LikesController(ILikeRepository likeRepository) : base(likeRepository)
        {
            LikeRepository = likeRepository;
        }

        [Authorize]
        [HttpPost]
        public override IHttpActionResult PostView(Like like)
        {
            var userId = User.Identity.GetUserId();
            var exist = Repository.Exist(userId, like.TravelId);
            if (exist != null)
            {
                exist.TravelId = like.TravelId;
                exist.Status = like.Status;
                Repository.Update(exist);
            }
            else
            {
                like.UserId = userId;
                Repository.Insert(like);
            }
            return Results(like.Status);

        }
        [Authorize]
        [HttpGet]
        [Route("TravelLike/{travelId}")]
        public IHttpActionResult GetLikeByTravel(int travelId)
        {
            var userId = User.Identity.GetUserId();
            var result = LikeRepository.GetTravelLikeByUser(userId, travelId);
            return Results(result);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("TravelInformation/{travelId}")]
        public IHttpActionResult GetTravelInformation(int travelId)
        {
            var user = User.Identity;
            var likeModel = LikeRepository.GetTravelLikesModel(user?.GetUserId(), travelId);
            return Results(likeModel);
        }
        
    }
}
