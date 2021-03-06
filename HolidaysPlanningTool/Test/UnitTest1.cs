﻿using System;
using System.Data;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Models;
using Npgsql;
using Repositories;
using UnitOfWork;
using GoogleImageParser = GoogleImageParser.GoogleImageParser;

namespace Test
{
    [TestClass]
    public class DbConnectionTests
    {
        [TestMethod]
        public void TestConnection()
        {
            //var conn = new NpgsqlConnection("Server=127.0.0.1;Port=5432;User Id=joe;Password=secret;Database=joedata;");
            var conn = new NpgsqlConnection("Server=localhost;Port=5432; User Id=postgres;Password=admin;Database=ktu_bakalauras;");
            conn.Open();
            conn.Close();
        }

        [TestMethod]
        public void TestKTUConnection()
        {
            //var conn = new NpgsqlConnection("Server=127.0.0.1;Port=5432;User Id=joe;Password=secret;Database=joedata;");
            // Server = localhost; Port = 5432; User Id = postgres; Password = admin; Database = ktu_bakalauras;
            var conn = new MySql.Data.MySqlClient.MySqlConnection(@"Server = db.if.ktu.lt; User Id = tauvai; Password = eivuShooYaeZagh1; Database = tauvai");
            conn.Open();
            conn.Close();
        }
        [TestMethod]
        public void TestHerokuConnection()
        {
            //var conn = new NpgsqlConnection("Server=127.0.0.1;Port=5432;User Id=joe;Password=secret;Database=joedata;");
            // Server = localhost; Port = 5432; User Id = postgres; Password = admin; Database = ktu_bakalauras;
            var conn = new NpgsqlConnection(@"Server= ec2-54-228-189-127.eu-west-1.compute.amazonaws.com; Port=5432; User Id = npoqopmgckqucr; Password = m5Cr9iDtIjlqzqeHhyagJxFXZ1;
Database = dahvv335igg0cu; SSL Mode=Require;");
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
            Assert.IsNotNull(result);
            Assert.AreEqual(LikeStatuses.Neultral, result.UserLikeStatus);
        }
    }
}
