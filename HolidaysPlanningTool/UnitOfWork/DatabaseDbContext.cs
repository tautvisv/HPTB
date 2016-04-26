using System.Data.Entity;
using Models;

namespace UnitOfWork
{
    public class DatabaseDbContext : DbContext
    {
        public DatabaseDbContext(string name)
            : base(name)
        {
            this.Configuration.LazyLoadingEnabled = false;
        }
        public DatabaseDbContext()
            : this(@"name=DefaultConnection")
        {
        }
         public DbSet<User> Users { get; set; }
         public DbSet<Point> Points { get; set; }
         public DbSet<TravelPointPlan> TravelPointPlans { get; set; }
         public DbSet<TravelDayPlan> TravelDayPlans { get; set; }
         public DbSet<Travel> Travels { get; set; }
         public DbSet<Comment> Comments { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("travels");
        }

        public int Commit()
        {
            return this.SaveChanges();
        }
    }
}