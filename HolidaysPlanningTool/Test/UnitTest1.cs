using System;
using System.Data;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Npgsql;

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
}
