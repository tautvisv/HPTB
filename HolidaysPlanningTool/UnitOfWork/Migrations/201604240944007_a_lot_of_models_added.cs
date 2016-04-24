namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class a_lot_of_models_added : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false),
                        AuthorId = c.Int(nullable: false),
                        Text = c.String(nullable: false),
                        Travel_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.AuthorId, cascadeDelete: true)
                .ForeignKey("dbo.Travels", t => t.Travel_Id)
                .Index(t => t.AuthorId)
                .Index(t => t.Travel_Id);
            
            CreateTable(
                "dbo.Points",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Latitude = c.Single(nullable: false),
                        Longitude = c.Single(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TravelDayPlans",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        Date = c.DateTime(nullable: false),
                        PointId = c.Int(nullable: false),
                        ImageUrl = c.String(),
                        OrderIndex = c.Int(nullable: false),
                        Travel_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Points", t => t.PointId, cascadeDelete: true)
                .ForeignKey("dbo.Travels", t => t.Travel_Id)
                .Index(t => t.PointId)
                .Index(t => t.Travel_Id);
            
            CreateTable(
                "dbo.TravelPointPlans",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        Date = c.DateTime(nullable: false),
                        Duration = c.DateTime(nullable: false),
                        PointId = c.Int(nullable: false),
                        TravelDayPlan_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Points", t => t.PointId, cascadeDelete: true)
                .ForeignKey("dbo.TravelDayPlans", t => t.TravelDayPlan_Id)
                .Index(t => t.PointId)
                .Index(t => t.TravelDayPlan_Id);
            
            CreateTable(
                "dbo.Travels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        StartDayId = c.Int(nullable: false),
                        EndDayId = c.Int(nullable: false),
                        ImageUrl = c.String(),
                        Descrription = c.String(),
                        AuthorId = c.Int(nullable: false),
                        CommentsCount = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.AuthorId, cascadeDelete: true)
                .ForeignKey("dbo.TravelDayPlans", t => t.EndDayId, cascadeDelete: true)
                .ForeignKey("dbo.TravelDayPlans", t => t.StartDayId, cascadeDelete: true)
                .Index(t => t.StartDayId)
                .Index(t => t.EndDayId)
                .Index(t => t.AuthorId);
            
            AddColumn("dbo.Users", "ImageUrl", c => c.String());
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TravelDayPlans", "Travel_Id", "dbo.Travels");
            DropForeignKey("dbo.Travels", "StartDayId", "dbo.TravelDayPlans");
            DropForeignKey("dbo.Travels", "EndDayId", "dbo.TravelDayPlans");
            DropForeignKey("dbo.Comments", "Travel_Id", "dbo.Travels");
            DropForeignKey("dbo.Travels", "AuthorId", "dbo.Users");
            DropForeignKey("dbo.TravelPointPlans", "TravelDayPlan_Id", "dbo.TravelDayPlans");
            DropForeignKey("dbo.TravelPointPlans", "PointId", "dbo.Points");
            DropForeignKey("dbo.TravelDayPlans", "PointId", "dbo.Points");
            DropForeignKey("dbo.Comments", "AuthorId", "dbo.Users");
            DropIndex("dbo.Travels", new[] { "AuthorId" });
            DropIndex("dbo.Travels", new[] { "EndDayId" });
            DropIndex("dbo.Travels", new[] { "StartDayId" });
            DropIndex("dbo.TravelPointPlans", new[] { "TravelDayPlan_Id" });
            DropIndex("dbo.TravelPointPlans", new[] { "PointId" });
            DropIndex("dbo.TravelDayPlans", new[] { "Travel_Id" });
            DropIndex("dbo.TravelDayPlans", new[] { "PointId" });
            DropIndex("dbo.Comments", new[] { "Travel_Id" });
            DropIndex("dbo.Comments", new[] { "AuthorId" });
            DropColumn("dbo.Users", "ImageUrl");
            DropTable("dbo.Travels");
            DropTable("dbo.TravelPointPlans");
            DropTable("dbo.TravelDayPlans");
            DropTable("dbo.Points");
            DropTable("dbo.Comments");
        }
    }
}
