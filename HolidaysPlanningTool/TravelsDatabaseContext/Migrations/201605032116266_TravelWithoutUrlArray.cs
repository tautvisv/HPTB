namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TravelWithoutUrlArray : DbMigration
    {
        public override void Up()
        {
            AddColumn("travels.Travels", "ImageUrl", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("travels.Travels", "ImageUrl");
        }
    }
}
