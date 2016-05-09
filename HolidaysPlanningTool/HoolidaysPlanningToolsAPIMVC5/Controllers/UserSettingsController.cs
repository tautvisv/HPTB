using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Models;
using Repositories;
using Services;

namespace HoolidaysPlanningToolsAPIMVC5.Controllers
{
    [Authorize]
    [Route(Constants.Constants.WebApiPrefix + "UserSettings")]
    public class UserSettingsController : AbstractApiController
    {
        protected readonly IUserSettingsService UserSettingsService;
        public UserSettingsController(IUserSettingsService userService)
        {
            UserSettingsService = userService;
        }

        [HttpGet]
        public IHttpActionResult GetUserSettings()
        {
            var id = User.Identity.GetUserId();
            var user = UserSettingsService.GetUserSettings(id);
            return Results(user);
        }
        [HttpPost]
        public IHttpActionResult PostUserSettings([FromBody]User settings)
        {
            if (string.IsNullOrEmpty(settings.Email))
            {
                return BadRequest("El. paštas privalomas");
            }
            settings.Username = User.Identity.Name;
            settings.UserId = User.Identity.GetUserId();
            var exist = UserSettingsService.Exist(settings.Username, settings.Email);
            if (exist)
            {
                return BadRequest("Toks el. paštas jau naudojamas");
            }
            UserSettingsService.Update(settings);
            return Results("Ok");
        }
    }
}