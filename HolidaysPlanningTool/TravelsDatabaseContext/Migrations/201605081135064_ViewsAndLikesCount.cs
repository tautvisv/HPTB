namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ViewsAndLikesCount : DbMigration
    {
        public override void Up()
        {
            AddColumn("travels.Travels", "LikesCount", c => c.Int(nullable: false));
            AddColumn("travels.Travels", "ViewsCount", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("travels.Travels", "ViewsCount");
            DropColumn("travels.Travels", "LikesCount");
        }
    }
}
