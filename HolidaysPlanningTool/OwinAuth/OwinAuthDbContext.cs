using Microsoft.AspNet.Identity.EntityFramework;

namespace OwinAuth
{

    public class OwinAuthDbContext : IdentityDbContext
    {
        public OwinAuthDbContext()
            : base("name=DefaultConnection")
        {
        }
    }
}
