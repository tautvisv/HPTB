using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using FileProcessingLib;
using HoolidaysPlanningToolsAPIMVC5.Managers;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using Models;
using Repositories;

namespace HoolidaysPlanningToolsAPIMVC5.Controllers
{

    public class UserLoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
    [AllowAnonymous]
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        protected readonly IUserService UserService;
        public UserController(IUserService userService)
        {
            UserService = userService;
        }

        [HttpGet]
        [Route("login")]
        public object GetTest()
        {
            return UserService.GetAll().ToList();
        }
        [HttpPost]
        [OverrideAuthentication]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalCookie)]
        [AllowAnonymous]
        [Route("login")]
        public object PostLogin([FromBody]UserLoginModel userLoginModel)
        {

            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);

            //AuthenticationTicket ticket = AccessTokenFormat.Unprotect(model.ExternalAccessToken);

            //if (ticket == null || ticket.Identity == null || (ticket.Properties != null
            //    && ticket.Properties.ExpiresUtc.HasValue
            //    && ticket.Properties.ExpiresUtc.Value < DateTimeOffset.UtcNow))
            //{
            //    return BadRequest("External login failure.");
            //}

            //AccountController.ExternalLoginData externalData = AccountController.ExternalLoginData.FromIdentity(ticket.Identity);

            //if (externalData == null)
            //{
            //    return BadRequest("The external login is already associated with an account.");
            //}

            //IdentityResult result = await UserManager.AddLoginAsync(User.Identity.GetUserId(),
            //    new UserLoginInfo(externalData.LoginProvider, externalData.ProviderKey));

            //if (!result.Succeeded)
            //{
            //    return GetErrorResult(result);
            //}

            return Ok();
        }
        [HttpPost]
        [Route("register")]
        public IHttpActionResult PostRegister([FromBody]User user)
        {
            if (string.IsNullOrEmpty(user.Password) || string.IsNullOrEmpty(user.Username))
            {
                return BadRequest("Password or Username is missing");
            }
            UserService.Create(user);
            return Ok();
        }
    }
}
