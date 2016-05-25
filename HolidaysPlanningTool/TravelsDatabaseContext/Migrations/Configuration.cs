using System.Data.Entity;
using Npgsql;

namespace UnitOfWork.Migrations
{
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<DatabaseDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;

            //this.SetSqlGenerator(Npgsql,
            //                            new NpgsqlMigrationSqlGenerator());
        }

        protected override void Seed(DatabaseDbContext context)
        {
            //  This method will be called after migrating to the latest version.
            //var n = new User();
            //n.Username = "tct";
            //n.Password = "psw";
            //context.Users.Add(n);
            //context.Commit();
            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }

}
