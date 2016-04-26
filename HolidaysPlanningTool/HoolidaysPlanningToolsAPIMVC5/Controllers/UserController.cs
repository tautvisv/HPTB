using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using HoolidaysPlanningToolsAPIMVC5.Models;
using HoolidaysPlanningToolsAPIMVC5.Providers;
using HoolidaysPlanningToolsAPIMVC5.Results;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Models;
using Owin;
using OwinAuth;
using Repositories;

namespace HoolidaysPlanningToolsAPIMVC5.Controllers
{
    public class UserLoginModel
    {
        [Required]
        [Display(Name = "Username")]
        public string Username { get; set; }

        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
    [Authorize]
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        private ApplicationUserManager _userManager;
        protected readonly IUserService UserService;
        public UserController(IUserService userService)
        {
            UserService = userService;
        }

        [HttpGet]
        [Authorize]
        [Route("loginauth")]
        public object GetTestAuth()
        {
            return UserService.GetAll().ToList();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("login")]
        public object GetTest()
        {
            return UserService.GetAll().ToList();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(UserLoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new IdentityUser { UserName = model.Username, Email = model.Email };

            IdentityResult result = await UserManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("LoginAts")]
        public async Task<HttpResponseMessage> LoginUser(UserLoginModel model)
        {
            // Invoke the "token" OWIN service to perform the login: /api/token
            // Ugly hack: I use a server-side HTTP POST because I cannot directly invoke the service (it is deeply hidden in the OAuthAuthorizationServerHandler class)
            var request = HttpContext.Current.Request;
            var tokenServiceUrl = request.Url.GetLeftPart(UriPartial.Authority) + request.ApplicationPath + "/Token";
            using (var client = new HttpClient())
            {
                var requestParams = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("grant_type", "password"),
                new KeyValuePair<string, string>("username", model.Username),
                new KeyValuePair<string, string>("password", model.Password)
            };
                var requestParamsFormUrlEncoded = new FormUrlEncodedContent(requestParams);
                var tokenServiceResponse = await client.PostAsync(tokenServiceUrl, requestParamsFormUrlEncoded);
                var responseString = await tokenServiceResponse.Content.ReadAsStringAsync();
                var responseCode = tokenServiceResponse.StatusCode;
                var responseMsg = new HttpResponseMessage(responseCode)
                {
                    Content = new StringContent(responseString, Encoding.UTF8, "application/json")
                };
                return responseMsg;
            }
        }
        // GET api/Account/ExternalLogin
        [OverrideAuthentication]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalCookie)]
        [AllowAnonymous]
        [Route("ExternalLogin", Name = "ExternalLogin")]
        public async Task<IHttpActionResult> GetExternalLogin()
        {

            string provider = "";
            string error = null;
            if (error != null)
            {
                return Redirect(Url.Content("~/") + "#error=" + Uri.EscapeDataString(error));
            }

            if (!User.Identity.IsAuthenticated)
            {
                return new ChallengeResult(provider, this);
            }

            ExternalLoginData externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);

            if (externalLogin == null)
            {
                return InternalServerError();
            }

            if (externalLogin.LoginProvider != provider)
            {
                Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                return new ChallengeResult(provider, this);
            }

            IdentityUser user = await UserManager.FindAsync(new UserLoginInfo(externalLogin.LoginProvider,
                externalLogin.ProviderKey));

            bool hasRegistered = user != null;

            if (hasRegistered)
            {
                Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);

                //ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(UserManager,
                //   OAuthDefaults.AuthenticationType);
                //ClaimsIdentity cookieIdentity = await user.GenerateUserIdentityAsync(UserManager,
                //    CookieAuthenticationDefaults.AuthenticationType);

                //AuthenticationProperties properties = ApplicationOAuthProvider.CreateProperties(user.UserName);
                //Authentication.SignIn(properties, oAuthIdentity, cookieIdentity);
            }
            else
            {
                IEnumerable<Claim> claims = externalLogin.GetClaims();
                ClaimsIdentity identity = new ClaimsIdentity(claims, OAuthDefaults.AuthenticationType);
                Authentication.SignIn(identity);
            }

            return Ok();
        }

        //[HttpPost]
        //[OverrideAuthentication]
        //[HostAuthentication(DefaultAuthenticationTypes.ExternalCookie)]
        //[AllowAnonymous]
        //[Route("login")]
        //public object PostLogin([FromBody]UserLoginModel userLoginModel)
        //{

        //    //if (!ModelState.IsValid)
        //    //{
        //    //    return BadRequest(ModelState);
        //    //}

        //    //Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);

        //    //AuthenticationTicket ticket = AccessTokenFormat.Unprotect(model.ExternalAccessToken);

        //    //if (ticket == null || ticket.Identity == null || (ticket.Properties != null
        //    //    && ticket.Properties.ExpiresUtc.HasValue
        //    //    && ticket.Properties.ExpiresUtc.Value < DateTimeOffset.UtcNow))
        //    //{
        //    //    return BadRequest("External login failure.");
        //    //}

        //    //AccountController.ExternalLoginData externalData = AccountController.ExternalLoginData.FromIdentity(ticket.Identity);

        //    //if (externalData == null)
        //    //{
        //    //    return BadRequest("The external login is already associated with an account.");
        //    //}

        //    //IdentityResult result = await UserManager.AddLoginAsync(User.Identity.GetUserId(),
        //    //    new UserLoginInfo(externalData.LoginProvider, externalData.ProviderKey));

        //    //if (!result.Succeeded)
        //    //{
        //    //    return GetErrorResult(result);
        //    //}

        //    return Ok();
        //}
        //[HttpPost]
        //[Route("register")]
        //public IHttpActionResult PostRegister([FromBody]User user)
        //{
        //    if (string.IsNullOrEmpty(user.Password) || string.IsNullOrEmpty(user.Username))
        //    {
        //        return BadRequest("Password or Username is missing");
        //    }
        //    UserService.Create(user);
        //    return Ok();
        //}


        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        private class ExternalLoginData
        {
            public string LoginProvider { get; set; }
            public string ProviderKey { get; set; }
            public string UserName { get; set; }

            public IList<Claim> GetClaims()
            {
                IList<Claim> claims = new List<Claim>();
                claims.Add(new Claim(ClaimTypes.NameIdentifier, ProviderKey, null, LoginProvider));

                if (UserName != null)
                {
                    claims.Add(new Claim(ClaimTypes.Name, UserName, null, LoginProvider));
                }

                return claims;
            }

            public static ExternalLoginData FromIdentity(ClaimsIdentity identity)
            {
                if (identity == null)
                {
                    return null;
                }

                Claim providerKeyClaim = identity.FindFirst(ClaimTypes.NameIdentifier);

                if (providerKeyClaim == null || String.IsNullOrEmpty(providerKeyClaim.Issuer)
                    || String.IsNullOrEmpty(providerKeyClaim.Value))
                {
                    return null;
                }

                if (providerKeyClaim.Issuer == ClaimsIdentity.DefaultIssuer)
                {
                    return null;
                }

                return new ExternalLoginData
                {
                    LoginProvider = providerKeyClaim.Issuer,
                    ProviderKey = providerKeyClaim.Value,
                    UserName = identity.FindFirstValue(ClaimTypes.Name)
                };
            }
        }
    }

}




//public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
//{
//    public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
//    {
//        string clientId;
//        string clientSecret;

//        if (context.TryGetBasicCredentials(out clientId, out clientSecret))
//        {
//            // validate the client Id and secret against database or from configuration file.  
//            context.Validated();
//        }
//        else
//        {
//            context.SetError("invalid_client", "Client credentials could not be retrieved from the Authorization header");
//            context.Rejected();
//        }
//    }
//    public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
//    {
//        UserManager<IdentityUser> userManager = context.OwinContext.GetUserManager<UserManager<IdentityUser>>();
//        IdentityUser user;
//        try
//        {
//            user = await userManager.FindAsync(context.UserName, context.Password);
//        }
//        catch
//        {
//            // Could not retrieve the user due to error.  
//            context.SetError("server_error");
//            context.Rejected();
//            return;
//        }
//        if (user != null)
//        {
//            ClaimsIdentity identity = await userManager.CreateIdentityAsync(
//                                                    user,
//                                                    DefaultAuthenticationTypes.ExternalBearer);
//            context.Validated(identity);
//        }
//        else
//        {
//            context.SetError("invalid_grant", "Invalid User Id or password'");
//            context.Rejected();
//        }
//    }
//}
//public class MyUserManager: UserManager<IdentityUser>
//{
//    private void ConfigureOAuth(IAppBuilder app)
//    {
//        app.CreatePerOwinContext<OwinAuthDbContext>(() => new OwinAuthDbContext());
//        app.CreatePerOwinContext<UserManager<IdentityUser>>(CreateManager);


//        app.UseOAuthAuthorizationServer(new OAuthAuthorizationServerOptions
//        {
//            TokenEndpointPath = new PathString("/oauth/token"),
//            Provider = new AuthorizationServerProvider(),
//            AccessTokenExpireTimeSpan = TimeSpan.FromHours(2),
//            AllowInsecureHttp = true,

//        });
//        app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
//    }

//    private static UserManager<IdentityUser> CreateManager(IdentityFactoryOptions<UserManager<IdentityUser>> options, IOwinContext context)
//    {
//        var userStore = new UserStore<IdentityUser>(context.Get<OwinAuthDbContext>());
//        var owinManager = new UserManager<IdentityUser>(userStore);
//        return owinManager;
//    }

//    public MyUserManager(IUserStore<IdentityUser> store) : base(store)
//    {
//    }
//}