namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TravelModelChanged : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("travels.Travels", "EndDayId", "travels.TravelDayPlans");
            DropForeignKey("travels.Travels", "StartDayId", "travels.TravelDayPlans");
            DropIndex("travels.Travels", new[] { "StartDayId" });
            DropIndex("travels.Travels", new[] { "EndDayId" });
            AddColumn("travels.Travels", "Description", c => c.String());
            AlterColumn("travels.Travels", "StartDayId", c => c.Int());
            AlterColumn("travels.Travels", "EndDayId", c => c.Int());
            CreateIndex("travels.Travels", "StartDayId");
            CreateIndex("travels.Travels", "EndDayId");
            AddForeignKey("travels.Travels", "EndDayId", "travels.TravelDayPlans", "Id");
            AddForeignKey("travels.Travels", "StartDayId", "travels.TravelDayPlans", "Id");
            DropColumn("travels.Travels", "Descrription");
        }
        
        public override void Down()
        {
            AddColumn("travels.Travels", "Descrription", c => c.String());
            DropForeignKey("travels.Travels", "StartDayId", "travels.TravelDayPlans");
            DropForeignKey("travels.Travels", "EndDayId", "travels.TravelDayPlans");
            DropIndex("travels.Travels", new[] { "EndDayId" });
            DropIndex("travels.Travels", new[] { "StartDayId" });
            AlterColumn("travels.Travels", "EndDayId", c => c.Int(nullable: false));
            AlterColumn("travels.Travels", "StartDayId", c => c.Int(nullable: false));
            DropColumn("travels.Travels", "Description");
            CreateIndex("travels.Travels", "EndDayId");
            CreateIndex("travels.Travels", "StartDayId");
            AddForeignKey("travels.Travels", "StartDayId", "travels.TravelDayPlans", "Id", cascadeDelete: true);
            AddForeignKey("travels.Travels", "EndDayId", "travels.TravelDayPlans", "Id", cascadeDelete: true);
        }
    }
}
