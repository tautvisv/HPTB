namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TravelWithUrlArray : DbMigration
    {
        public override void Up()
        {
            DropColumn("travels.Travels", "ImageUrl");
        }
        
        public override void Down()
        {
            AddColumn("travels.Travels", "ImageUrl", c => c.String());
        }
    }
}
