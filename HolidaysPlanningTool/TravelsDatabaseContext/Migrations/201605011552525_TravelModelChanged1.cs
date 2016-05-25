namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TravelModelChanged1 : DbMigration
    {
        public override void Up()
        {
            DropColumn("travels.Travels", "CommentsCount");
        }
        
        public override void Down()
        {
            AddColumn("travels.Travels", "CommentsCount", c => c.Int(nullable: false));
        }
    }
}
