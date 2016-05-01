namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class userSettingsModelChangedAgain : DbMigration
    {
        public override void Up()
        {
            AlterColumn("travels.Users", "UserId", c => c.String(nullable: false));
            CreateIndex("travels.Users", "UserId", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("travels.Users", new[] { "UserId" });
            AlterColumn("travels.Users", "UserId", c => c.String());
        }
    }
}
