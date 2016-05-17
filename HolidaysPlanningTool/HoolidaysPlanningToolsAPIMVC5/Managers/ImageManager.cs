using System;
using FileProcessingLib;
using System.IO;
using System.Text.RegularExpressions;
using System.Web.Helpers;

namespace HoolidaysPlanningToolsAPIMVC5.Managers
{

    public class ImageManager : IStreamSaver
    {
        private readonly string SaveLocation;
        private readonly string Root;
        //TODO fix it
        //private readonly string Root = HttpContext.Current.Request.PhysicalApplicationPath;
        private readonly string[] AllowedExtensions = { "PNG", "png", "JPG", "jpg" };
        private const string minFolder = @"\min";
        public ImageManager(string rootPath, string saveLocation)
        {
            Root = rootPath;
            if (string.IsNullOrEmpty(saveLocation))
                throw new System.NullReferenceException($"{nameof(saveLocation)} cannot be mepty or null");
            SaveLocation = saveLocation;
            if (!Directory.Exists(Root + SaveLocation))
            {
                DirectoryInfo di = Directory.CreateDirectory(Root + SaveLocation);
            }
            //if (!Directory.Exists(Root + SaveLocation + minFolder))
            //{
            //    DirectoryInfo di = Directory.CreateDirectory(Root + SaveLocation + minFolder);
            //}
        }
        public string SaveAsMinified(string rootPath, string fileName)
        {
            if (fileName == null) throw new ArgumentNullException(nameof(fileName));
            //(,)[^,]*$
            //TODO move from here
            fileName = Regex.Replace(fileName, @"(.*)([.])(.+)$", m => m.Groups[1].Value + ".min." + m.Groups[3].Value);
            var saveLocationMin = SaveLocation;
            var imageLocationMin = saveLocationMin + $@"\{fileName}";
            var newImage = new WebImage(Root + rootPath);
            newImage.Resize(64, 64);
            newImage.Save(Root + imageLocationMin);
            return imageLocationMin;
        }
        public string Save(Stream file, string fileName)
        {
            WebImage img = new WebImage(file);
            if (!Directory.Exists(Root + SaveLocation))
            {
                DirectoryInfo di = Directory.CreateDirectory(Root + SaveLocation);
            }

            var imageLocation = SaveLocation + $@"\{fileName}";
            img.Save(Root + imageLocation);
            return imageLocation;
        }

    }

}