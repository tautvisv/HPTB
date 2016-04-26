using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.OAuth;
using Owin;
using HoolidaysPlanningToolsAPIMVC5.Providers;
using HoolidaysPlanningToolsAPIMVC5.Models;
using Microsoft.AspNet.Identity.Owin;
using OwinAuth;

namespace HoolidaysPlanningToolsAPIMVC5
{
    public partial class Startup
    {
        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

        public static string PublicClientId { get; private set; }

        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            // Configure the db context and user manager to use a single instance per request
            //  app.CreatePerOwinContext(OwinAuthDbContext.Create);

            //new
            app.CreatePerOwinContext<OwinAuthDbContext>(() => new OwinAuthDbContext());
            app.CreatePerOwinContext<UserManager<IdentityUser>>(CreateManager);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);

            // Enable the application to use a cookie to store information for the signed in user
            // and to use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);
            
            // Configure the application for OAuth based flow
            PublicClientId = "self";
            OAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/Token"),
                Provider = new ApplicationOAuthProvider(PublicClientId),
                AuthorizeEndpointPath = new PathString("/api/User/ExternalLogin"),
                AccessTokenExpireTimeSpan = TimeSpan.FromHours(30),
                // In production mode set AllowInsecureHttp = false
                AllowInsecureHttp = true
            };

            // Enable the application to use bearer tokens to authenticate users
            app.UseOAuthBearerTokens(OAuthOptions);

            // Uncomment the following lines to enable logging in with third party login providers
            //app.UseMicrosoftAccountAuthentication(
            //    clientId: "",
            //    clientSecret: "");

            //app.UseTwitterAuthentication(
            //    consumerKey: "",
            //    consumerSecret: "");

            //app.UseFacebookAuthentication(
            //    appId: "",
            //    appSecret: "");

            //app.UseGoogleAuthentication(new GoogleOAuth2AuthenticationOptions()
            //{
            //    ClientId = "",
            //    ClientSecret = ""
            //});
        }
        private static UserManager<IdentityUser> CreateManager(IdentityFactoryOptions<UserManager<IdentityUser>> options, IOwinContext context)
        {
            var userStore = new UserStore<IdentityUser>(context.Get<OwinAuthDbContext>());
            var owinManager = new UserManager<IdentityUser>(userStore);
            return owinManager;
        }
    }

    public class WeakPasswordValidator : PasswordValidator
    {
        public WeakPasswordValidator():base()
        {
            this.RequireDigit = false;
            this.RequireLowercase = false;
            this.RequireNonLetterOrDigit = false;
            this.RequireUppercase = false;
            this.RequiredLength = 5;
        }
    }

    //enum PasswordTypeEnum
    //{
    //    Default,
    //    VeryWeak,
    //    VeryStrong,   
    //}
    //public class PasswordValidatorFactory
    //{
    //    public PasswordValidator CreatePasswordValidator(PasswordTypeEnum type)
    //    {
    //        switch (type)
    //        {
    //            case PasswordTypeEnum.Default:
    //                break;
    //            case PasswordTypeEnum.VeryWeak:
    //                break;
    //            case PasswordTypeEnum.VeryStrong:
    //                break;
    //            default:
    //                throw new ArgumentOutOfRangeException(nameof(type), type, null);
    //        }
    //    }
    //}
}
