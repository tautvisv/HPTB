namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "travels.Comments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false),
                        AuthorId = c.Int(nullable: false),
                        Text = c.String(nullable: false),
                        Travel_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("travels.Users", t => t.AuthorId, cascadeDelete: true)
                .ForeignKey("travels.Travels", t => t.Travel_Id)
                .Index(t => t.AuthorId)
                .Index(t => t.Travel_Id);
            
            CreateTable(
                "travels.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Password = c.String(nullable: false),
                        Address = c.String(),
                        Email = c.String(maxLength: 128),
                        About = c.String(),
                        ExtraInfo = c.String(),
                        Username = c.String(nullable: false),
                        Name = c.String(maxLength: 128),
                        Surname = c.String(maxLength: 128),
                        ImageUrl = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Email, unique: true)
                .Index(t => t.Username, unique: true);
            
            CreateTable(
                "travels.Points",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Latitude = c.Single(nullable: false),
                        Longitude = c.Single(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "travels.TravelDayPlans",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        Date = c.DateTime(nullable: false),
                        PointId = c.Int(nullable: false),
                        ImageUrl = c.String(),
                        OrderIndex = c.Int(nullable: false),
                        TravelId = c.Int(nullable: false),
                        Travel_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("travels.Points", t => t.PointId, cascadeDelete: true)
                .ForeignKey("travels.Travels", t => t.Travel_Id)
                .Index(t => t.PointId)
                .Index(t => t.Travel_Id);
            
            CreateTable(
                "travels.TravelPointPlans",
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
                .ForeignKey("travels.Points", t => t.PointId, cascadeDelete: true)
                .ForeignKey("travels.TravelDayPlans", t => t.TravelDayPlan_Id)
                .Index(t => t.PointId)
                .Index(t => t.TravelDayPlan_Id);
            
            CreateTable(
                "travels.Travels",
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
                .ForeignKey("travels.Users", t => t.AuthorId, cascadeDelete: true)
                .ForeignKey("travels.TravelDayPlans", t => t.EndDayId, cascadeDelete: true)
                .ForeignKey("travels.TravelDayPlans", t => t.StartDayId, cascadeDelete: true)
                .Index(t => t.StartDayId)
                .Index(t => t.EndDayId)
                .Index(t => t.AuthorId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("travels.TravelDayPlans", "Travel_Id", "travels.Travels");
            DropForeignKey("travels.Travels", "StartDayId", "travels.TravelDayPlans");
            DropForeignKey("travels.Travels", "EndDayId", "travels.TravelDayPlans");
            DropForeignKey("travels.Comments", "Travel_Id", "travels.Travels");
            DropForeignKey("travels.Travels", "AuthorId", "travels.Users");
            DropForeignKey("travels.TravelPointPlans", "TravelDayPlan_Id", "travels.TravelDayPlans");
            DropForeignKey("travels.TravelPointPlans", "PointId", "travels.Points");
            DropForeignKey("travels.TravelDayPlans", "PointId", "travels.Points");
            DropForeignKey("travels.Comments", "AuthorId", "travels.Users");
            DropIndex("travels.Travels", new[] { "AuthorId" });
            DropIndex("travels.Travels", new[] { "EndDayId" });
            DropIndex("travels.Travels", new[] { "StartDayId" });
            DropIndex("travels.TravelPointPlans", new[] { "TravelDayPlan_Id" });
            DropIndex("travels.TravelPointPlans", new[] { "PointId" });
            DropIndex("travels.TravelDayPlans", new[] { "Travel_Id" });
            DropIndex("travels.TravelDayPlans", new[] { "PointId" });
            DropIndex("travels.Users", new[] { "Username" });
            DropIndex("travels.Users", new[] { "Email" });
            DropIndex("travels.Comments", new[] { "Travel_Id" });
            DropIndex("travels.Comments", new[] { "AuthorId" });
            DropTable("travels.Travels");
            DropTable("travels.TravelPointPlans");
            DropTable("travels.TravelDayPlans");
            DropTable("travels.Points");
            DropTable("travels.Users");
            DropTable("travels.Comments");
        }
    }
}
