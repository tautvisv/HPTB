using System.Web.Http;
using IRepositories;
using Microsoft.AspNet.Identity;
using Models;
using Repositories;

namespace HoolidaysPlanningToolsAPIMVC5.Controllers
{
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
                var dif = like.Status - exist.Status;
                exist.TravelId = like.TravelId;
                exist.Status = like.Status;
                Repository.Update(exist, dif);
            }
            else
            {
                like.UserId = userId;
                Repository.Insert(like, (int)like.Status);
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
