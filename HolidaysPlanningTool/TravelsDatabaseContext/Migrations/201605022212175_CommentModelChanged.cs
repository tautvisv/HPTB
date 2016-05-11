namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CommentModelChanged : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("travels.Comments", "Travel_Id", "travels.Travels");
            DropIndex("travels.Comments", new[] { "Travel_Id" });
            RenameColumn(table: "travels.Comments", name: "Travel_Id", newName: "TravelId");
            AlterColumn("travels.Comments", "TravelId", c => c.Int(nullable: false));
            CreateIndex("travels.Comments", "TravelId");
            AddForeignKey("travels.Comments", "TravelId", "travels.Travels", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("travels.Comments", "TravelId", "travels.Travels");
            DropIndex("travels.Comments", new[] { "TravelId" });
            AlterColumn("travels.Comments", "TravelId", c => c.Int());
            RenameColumn(table: "travels.Comments", name: "TravelId", newName: "Travel_Id");
            CreateIndex("travels.Comments", "Travel_Id");
            AddForeignKey("travels.Comments", "Travel_Id", "travels.Travels", "Id");
        }
    }
}
