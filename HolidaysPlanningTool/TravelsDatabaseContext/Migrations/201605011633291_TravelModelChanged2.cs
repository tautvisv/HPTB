namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TravelModelChanged2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("travels.Points", "Address", c => c.String());
            AlterColumn("travels.TravelDayPlans", "TravelId", c => c.Int());
            CreateIndex("travels.TravelDayPlans", "TravelId");
            AddForeignKey("travels.TravelDayPlans", "TravelId", "travels.Travels", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("travels.TravelDayPlans", "TravelId", "travels.Travels");
            DropIndex("travels.TravelDayPlans", new[] { "TravelId" });
            AlterColumn("travels.TravelDayPlans", "TravelId", c => c.Int(nullable: false));
            DropColumn("travels.Points", "Address");
        }
    }
}
