namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class travelSearchKeyword : DbMigration
    {
        public override void Up()
        {
            AddColumn("travels.Travels", "KeyWords", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("travels.Travels", "KeyWords");
        }
    }
}
