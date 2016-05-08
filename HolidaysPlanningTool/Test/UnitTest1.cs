using System;
using System.Data;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Npgsql;
using Repositories;
using UnitOfWork;
using GoogleImageParser = GoogleImageParser.GoogleImageParser;

namespace Test
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestConnection()
        {
            //var conn = new NpgsqlConnection("Server=127.0.0.1;Port=5432;User Id=joe;Password=secret;Database=joedata;");
            var conn = new NpgsqlConnection("Server=localhost;Port=5432; User Id=postgres;Password=admin;Database=ktu_bakalauras;");
            conn.Open();
            conn.Close();
        }
    }
    [TestClass]
    public class LikesRepositoryTest
    {
        [TestMethod]
        public void TestTravelLikes_user()
        {
            //var conn = new NpgsqlConnection("Server=127.0.0.1;Port=5432;User Id=joe;Password=secret;Database=joedata;");
            var db = new DatabaseDbContext();
            var likesRepository = new LikesRepository(db);
            var result = likesRepository.GetTravelLikesModel("eb1e60a8-f2a9-4d8c-8f0c-67fb6d336223", 14);
            db.Database.Log = Console.WriteLine;
            Console.WriteLine($"Likes: {result.LikesCount}, Dislikes {result.DislikesCount}, User: {result.UserLikeStatus}");
            Assert.IsNotNull(result);
        }
        [TestMethod]
        public void TestTravelLikes_null()
        {
            //var conn = new NpgsqlConnection("Server=127.0.0.1;Port=5432;User Id=joe;Password=secret;Database=joedata;");
            var db = new DatabaseDbContext();
            var likesRepository = new LikesRepository(db);
            var result = likesRepository.GetTravelLikesModel(null, 14);
            db.Database.Log = Console.WriteLine;
            Console.WriteLine($"Likes: {result.LikesCount}, Dislikes {result.DislikesCount}, User: {result.UserLikeStatus}");
            Assert.IsNotNull(result);
        }
        [TestMethod]
        public void TestTravelLikes_0()
        {
            //var conn = new NpgsqlConnection("Server=127.0.0.1;Port=5432;User Id=joe;Password=secret;Database=joedata;");
            var db = new DatabaseDbContext();
            var likesRepository = new LikesRepository(db);
            var result = likesRepository.GetTravelLikesModel(null, 0);
            db.Database.Log = Console.WriteLine;
            Assert.IsNull(result);
        }
    }

    [TestClass]
    public class GoogleImageDownloaderTests
    {
        private const string SaveLocation = "D:\\test";
        [TestMethod]
        public void Download1()
        {
            var downloader = new global::GoogleImageParser.GoogleImageParser(SaveLocation);
            downloader.Parse(54.8985207f, 23.90359650000005f);
        }
        [TestMethod]
        public void Download2()
        {
            var downloader = new global::GoogleImageParser.GoogleImageParser(SaveLocation);
            downloader.Parse(54.98707007894878f, 23.722534105181694f);
        }
        [TestMethod]
        public void Download4()
        {
            var downloader = new global::GoogleImageParser.GoogleImageParser(SaveLocation);
            downloader.Parse(55.70329479999999f, 21.1442793999999f);
        }
        [TestMethod]
        public void Download5()
        {
            var downloader = new global::GoogleImageParser.GoogleImageParser(SaveLocation);
            downloader.Parse(54.27404566896125f, 23.52111814543605f);
        }
    }

}
