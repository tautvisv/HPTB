﻿using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(HoolidaysPlanningToolsAPIMVC5.Startup))]

namespace HoolidaysPlanningToolsAPIMVC5
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
