namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate4 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "Name", c => c.String(maxLength: 128));
            AddColumn("dbo.Users", "Surname", c => c.String(maxLength: 128));
            AddColumn("dbo.Users", "Address", c => c.String());
            AddColumn("dbo.Users", "Email", c => c.String(maxLength: 128));
            AddColumn("dbo.Users", "About", c => c.String());
            AddColumn("dbo.Users", "ExtraInfo", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "ExtraInfo");
            DropColumn("dbo.Users", "About");
            DropColumn("dbo.Users", "Email");
            DropColumn("dbo.Users", "Address");
            DropColumn("dbo.Users", "Surname");
            DropColumn("dbo.Users", "Name");
        }
    }
}
