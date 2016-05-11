using System;
using System.IO;
using System.Net;
using System.Drawing;
using IMisc;

namespace GoogleImageParser
{
    public class GoogleImageParser: IIMageParser
    {
        //HttpContext.Current.Server.MapPath("~")
        private readonly string _location;
        private const string Folder = @"\nuotraukosjega";
        public GoogleImageParser(string location)
        {
            this._location = location;
            if (!Directory.Exists(location + Folder))
            {
                DirectoryInfo di = Directory.CreateDirectory(location + Folder);
            }
        }

        public string Parse(float latitude, float longitude)
        {
            string fileName = null;
            WebRequest request = WebRequest.Create($"https://maps.googleapis.com/maps/api/streetview?size=600x300&location={latitude.ToString().Replace(',','.')},{longitude.ToString().Replace(',', '.')}&heading=100&pitch=18&scale=2");
            using (WebResponse response = request.GetResponse())
            {
                using (Stream responseStream = response.GetResponseStream())
                {
                    if (responseStream != null)
                    {
                        fileName = $@"\google_{latitude}_{longitude}.jpg";
                        var fullPath = _location + Folder + fileName;
                        Console.WriteLine(fullPath);
                        Image img = Image.FromStream(responseStream);
                        img.Save(fullPath);
                    }
                }
            }
            return Folder+fileName;
        }
    }

}
