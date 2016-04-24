namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate3 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Users", "siaipLukas");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Users", "siaipLukas", c => c.String());
        }
    }
}
