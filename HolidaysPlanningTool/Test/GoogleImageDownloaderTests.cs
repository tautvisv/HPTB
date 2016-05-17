using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Test
{
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