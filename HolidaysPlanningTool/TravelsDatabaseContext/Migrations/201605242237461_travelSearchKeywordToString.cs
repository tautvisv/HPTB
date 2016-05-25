namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class travelSearchKeywordToString : DbMigration
    {
        public override void Up()
        {
            AlterColumn("travels.Travels", "KeyWords", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("travels.Travels", "KeyWords", c => c.Int(nullable: false));
        }
    }
}
