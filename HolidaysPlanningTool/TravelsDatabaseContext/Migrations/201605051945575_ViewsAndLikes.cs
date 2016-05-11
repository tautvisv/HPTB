namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ViewsAndLikes : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "travels.Likes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TravelId = c.Int(nullable: false),
                        Status = c.Int(nullable: false),
                        Date = c.DateTime(nullable: false),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("travels.Travels", t => t.TravelId, cascadeDelete: true)
                .ForeignKey("travels.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.TravelId)
                .Index(t => t.UserId);
            
            CreateTable(
                "travels.Views",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TravelId = c.Int(nullable: false),
                        Date = c.DateTime(nullable: false),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("travels.Travels", t => t.TravelId, cascadeDelete: true)
                .ForeignKey("travels.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.TravelId)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("travels.Views", "UserId", "travels.Users");
            DropForeignKey("travels.Views", "TravelId", "travels.Travels");
            DropForeignKey("travels.Likes", "UserId", "travels.Users");
            DropForeignKey("travels.Likes", "TravelId", "travels.Travels");
            DropIndex("travels.Views", new[] { "UserId" });
            DropIndex("travels.Views", new[] { "TravelId" });
            DropIndex("travels.Likes", new[] { "UserId" });
            DropIndex("travels.Likes", new[] { "TravelId" });
            DropTable("travels.Views");
            DropTable("travels.Likes");
        }
    }
}
