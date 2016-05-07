using System.Data.Entity;
using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Repositories;
using Services;
using SimpleInjector;
using SimpleInjector.Integration.WebApi;
using UnitOfWork;

namespace HoolidaysPlanningToolsAPIMVC5
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            CreateInjectorContainer();
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void CreateInjectorContainer()
        {
            var container = new Container();
            container.Options.DefaultScopedLifestyle = new WebApiRequestLifestyle();

            // Register your types, for instance:
            // container.Register<DbContext>(() => new DatabaseDbContext(System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString), Lifestyle.Scoped);
            //System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString
            container.Register<DatabaseDbContext>(() => new DatabaseDbContext("name=DefaultConnection"), Lifestyle.Scoped);
            container.Register<IUnitOfWork, UnitOfWork.UnitOfWork>(Lifestyle.Scoped);
            container.Register<IUserRepository, UserRepository>(Lifestyle.Scoped);
            container.Register<IUserService, UserService>(Lifestyle.Scoped);
            container.Register<IUserSettingsRepository, UserSettingsRepository>(Lifestyle.Scoped);
            container.Register<IUserSettingsService, UserSettingsService>(Lifestyle.Scoped); 
            container.Register<ITravelService, TravelsService>(Lifestyle.Scoped); 
            container.Register<ITravelRepository, TravelsRepository>(Lifestyle.Scoped); 
            container.Register<ITravelDayRepository, TravelDayRepositoryRepository>(Lifestyle.Scoped); 
            container.Register<IPointRepository, PointRepository>(Lifestyle.Scoped); 
            container.Register<ICommentsRepository, CommentsRepository>(Lifestyle.Scoped); 
            container.Register<ICommentsService, CommentsService>(Lifestyle.Scoped); 
            container.Register<IViewRepository, ViewsRepository>(Lifestyle.Scoped); 
            container.Register<ILikeRepository, LikesRepository>(Lifestyle.Scoped); 

            // This is an extension method from the integration package.
            container.RegisterWebApiControllers(GlobalConfiguration.Configuration);
            

            container.Verify();

            GlobalConfiguration.Configuration.DependencyResolver =
                new SimpleInjectorWebApiDependencyResolver(container);
        }
    }
}
