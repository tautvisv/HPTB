namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class userSettingsModelDescriptionRenamed : DbMigration
    {
        public override void Up()
        {
            AddColumn("travels.Users", "Description", c => c.String());
            DropColumn("travels.Users", "About");
        }
        
        public override void Down()
        {
            AddColumn("travels.Users", "About", c => c.String());
            DropColumn("travels.Users", "Description");
        }
    }
}
