﻿using System.Web.Http;
using IServices;
using Models;

namespace HoolidaysPlanningToolsAPIMVC5.Controllers
{
    [Authorize]
    [RoutePrefix(Constants.Constants.WebApiPrefix + "Comments")]
    public class CommentsController : AbstractApiController
    {
        protected readonly ICommentsService CommentService;

        public CommentsController(ICommentsService commentService)
        {
            CommentService = commentService;
        }

        [HttpPost]
        public IHttpActionResult PostComment(Comment comment)
        {
            var newComment = CommentService.Create(comment, User.Identity);
            return Results(newComment);
        }
    }
}
