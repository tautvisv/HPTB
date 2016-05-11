namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class userSettingsModelChanged : DbMigration
    {
        public override void Up()
        {
            AlterColumn("travels.Users", "UserId", c => c.String());
            DropColumn("travels.Users", "Password");
        }
        
        public override void Down()
        {
            AddColumn("travels.Users", "Password", c => c.String(nullable: false));
            AlterColumn("travels.Users", "UserId", c => c.String(nullable: false));
        }
    }
}
