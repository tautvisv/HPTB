namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class random_stuff : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TravelDayPlans", "TravelId", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.TravelDayPlans", "TravelId");
        }
    }
}
