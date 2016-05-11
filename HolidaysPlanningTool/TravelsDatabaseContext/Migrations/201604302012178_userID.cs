namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class userID : DbMigration
    {
        public override void Up()
        {
            AddColumn("travels.Users", "UserId", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("travels.Users", "UserId");
        }
    }
}
