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
using IServices;
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
    public class UserRegisterModel
    {
        [Required]
        [Display(Name = "Username")]
        public string Username { get; set; }
        [Required]
        [Display(Name = "Name")]
        public string Name { get; set; }
        [Display(Name = "Surname")]
        public string Surname { get; set; }

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

        public User CreateUser()
        {
            var result = new User();
            result.Username = Username;
            result.Email = Email;
            result.Name = Name;
            result.Surname = Surname;
            return result;
        }
    }
    [Authorize]
    [RoutePrefix(Constants.Constants.WebApiPrefix + "User")]
    public class UserController : ApiController
    {
        private ApplicationUserManager _userManager;
        protected readonly IUserService UserService;
        public UserController(IUserService userService)
        {
            UserService = userService;
        }

        [HttpGet]
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
        public async Task<IHttpActionResult> Register(UserRegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (UserService.Exist(model.Username, model.Email))
            {
                return BadRequest("Vartotojo prisijungimo vardas arba paštas jau naudojamas");
            }

            var user = new IdentityUser { UserName = model.Username, Email = model.Email };

            IdentityResult result = await UserManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }
            var newUser = model.CreateUser();
            newUser.UserId = user.Id;
            UserService.Create(newUser);

            return Ok("Ok");
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
        [HttpPost]
        [Route("Logout")]
        public IHttpActionResult Logout()
        {
            this.Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
            return this.Ok(new { message = "Logout successful." });
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
