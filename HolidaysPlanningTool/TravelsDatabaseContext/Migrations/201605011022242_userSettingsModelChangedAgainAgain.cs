namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class userSettingsModelChangedAgainAgain : DbMigration
    {
        public override void Up()
        {
            AddColumn("travels.Users", "Phone", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("travels.Users", "Phone");
        }
    }
}
