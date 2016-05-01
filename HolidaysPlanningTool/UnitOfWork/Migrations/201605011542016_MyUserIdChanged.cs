namespace UnitOfWork.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MyUserIdChanged : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("travels.Comments", "AuthorId", "travels.Users");
            DropForeignKey("travels.Travels", "AuthorId", "travels.Users");
            DropIndex("travels.Comments", new[] { "AuthorId" });
            DropIndex("travels.Users", new[] { "UserId" });
            DropIndex("travels.Travels", new[] { "AuthorId" });
            DropPrimaryKey("travels.Users");
            AlterColumn("travels.Comments", "AuthorId", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("travels.Users", "UserId", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("travels.Travels", "AuthorId", c => c.String(nullable: false, maxLength: 128));
            AddPrimaryKey("travels.Users", "UserId");
            CreateIndex("travels.Comments", "AuthorId");
            CreateIndex("travels.Users", "UserId", unique: true);
            CreateIndex("travels.Travels", "AuthorId");
            AddForeignKey("travels.Comments", "AuthorId", "travels.Users", "UserId", cascadeDelete: true);
            AddForeignKey("travels.Travels", "AuthorId", "travels.Users", "UserId", cascadeDelete: true);
            DropColumn("travels.Users", "Id");
        }
        
        public override void Down()
        {
            AddColumn("travels.Users", "Id", c => c.Int(nullable: false, identity: true));
            DropForeignKey("travels.Travels", "AuthorId", "travels.Users");
            DropForeignKey("travels.Comments", "AuthorId", "travels.Users");
            DropIndex("travels.Travels", new[] { "AuthorId" });
            DropIndex("travels.Users", new[] { "UserId" });
            DropIndex("travels.Comments", new[] { "AuthorId" });
            DropPrimaryKey("travels.Users");
            AlterColumn("travels.Travels", "AuthorId", c => c.Int(nullable: false));
            AlterColumn("travels.Users", "UserId", c => c.String(nullable: false));
            AlterColumn("travels.Comments", "AuthorId", c => c.Int(nullable: false));
            AddPrimaryKey("travels.Users", "Id");
            CreateIndex("travels.Travels", "AuthorId");
            CreateIndex("travels.Users", "UserId", unique: true);
            CreateIndex("travels.Comments", "AuthorId");
            AddForeignKey("travels.Travels", "AuthorId", "travels.Users", "UserId", cascadeDelete: true);
            AddForeignKey("travels.Comments", "AuthorId", "travels.Users", "UserId", cascadeDelete: true);
        }
    }
}
