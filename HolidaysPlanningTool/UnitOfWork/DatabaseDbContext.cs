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
            //HeroRepository = new HeroesRepository(this);
            //PlayerRepository = new PlayerStatisticsRepository(this);
            //MatchRepository = new MatchRepository(this);
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

        //public IHeroRepository HeroRepository { get; private set; }
        //public IPlayerRepository PlayerRepository { get; private set; }
        //public IMatchRepository MatchRepository { get; private set; }
        public int Commit()
        {
            return this.SaveChanges();
        }
    }
}