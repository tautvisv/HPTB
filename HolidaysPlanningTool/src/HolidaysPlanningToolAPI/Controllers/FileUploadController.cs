using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Http;
using Microsoft.Net.Http.Headers;
using System.IO;
using System.Linq;
using EmptyProject;


namespace HolidaysPlanningToolAPI.Controllers
{
   

    [Route("api/Mock")]
    [Route("api/[controller]")]
    public class FileUploadController : Controller
    {
        //public System.Drawing.Image ScaleImage(System.Drawing.Image image, int maxHeight)
        //{
        //    var ratio = (double)maxHeight / image.Height;
        //    var newWidth = (int)(image.Width * ratio);
        //    var newHeight = (int)(image.Height * ratio);
        //    var newImage = new System.Drawing.Bitmap(newWidth, newHeight);
        //    using (var g = Graphics.FromImage(newImage))
        //    {
        //        g.DrawImage(image, 0, 0, newWidth, newHeight);
        //    }
        //    return newImage;
        //}
        public IActionResult UploadUserPhoto(IFormFile file)
        {
            var a = new EmptyClass("test");
            //Image image = Image.FromStream(file.OpenReadStream(), true, true);
            //var newImage = new Bitmap(1024, 768);
            //using (var g = Graphics.FromImage(newImage))
            //{
            //    g.DrawImage(image, 0, 0, 1024, 768);
            //}
            return Ok();
        }
        [HttpPost("UploadFiles")]
        public IActionResult PostUploadFiles(IList<IFormFile> files)
        {
            var fileManager = new FileManager(@"\nuotraukosjega");
            var filesNames = fileManager.SaveFiles(files);
            var filesSmallNames = fileManager.SaveAsSmallImages(files);
            return Ok(filesSmallNames);
        }

        // GET: api/5
        [HttpGet("{id}")]
        public IActionResult GetController([FromRoute] string id)
        {
            return Ok(69);
        }


        // POST: api/
        [HttpPost("{id}")]
        public IActionResult PostController([FromRoute] string id, [FromBody] object userSettings)
        {
            return Ok(userSettings);
        }

    }
    public class FileManager
    {
        private readonly string SaveLocation;
        private readonly string Root = Directory.GetCurrentDirectory();
        private readonly string[] AllowedExtensions = { "PNG", "png", "JPG", "jpg" };
        public FileManager(string saveLocation)
        {
            if (string.IsNullOrEmpty(saveLocation))
                throw new System.NullReferenceException($"{nameof(saveLocation)} cannot be mepty or null");
            SaveLocation = saveLocation;
            if (!Directory.Exists(Root + SaveLocation))
            {
                DirectoryInfo di = Directory.CreateDirectory(Root + SaveLocation);
            }
        }
        public string SaveFile(IFormFile file)
        {
            var filename = ContentDispositionHeaderValue
                                .Parse(file.ContentDisposition)
                                .FileName
                                .Trim('"');
            var fileLocation = SaveLocation + $@"\{filename}";
            var fullFilename = Root + SaveLocation + fileLocation;
            var size = file.Length;
            file.SaveAs(fullFilename);
            return fileLocation;
        }
        private bool VerifyFileSize(IFormFile file)
        {
            long fileSize = 0;
            using (var reader = file.OpenReadStream())
            {
                //get filesize in kb
                fileSize = (reader.Length / 1024);
            }

            //filesize less than 100MB => true, else => false
            return (fileSize < 102400) ? true : false;
        }
        private bool VerifyFileExtension(string path)
        {
            return AllowedExtensions.Contains(Path.GetExtension(path));
        }

        public IList<string> SaveAsSmallImages(IList<IFormFile> files)
        {
            long size = 0;
            //string wanted_path = Path.GetDirectoryName(Path.GetDirectoryName(Directory.GetCurrentDirectory()));

            var fileNames = new List<string>();
            foreach (var file in files)
            {
                var newFileName = SaveAsImage(file);
                fileNames.Add(newFileName);
            }
            return fileNames;
        }
        public string SaveAsImage(IFormFile file)
        {

            var filename = "min." + ContentDispositionHeaderValue
                                .Parse(file.ContentDisposition)
                                .FileName
                                .Trim('"');
            var fileLocation = SaveLocation + $@"\{filename}";
            var fullFilename = Root + SaveLocation + fileLocation;
            var size = file.Length;

            using (var stream = file.OpenReadStream())
            {
                //SaveAsBitmap(stream, fileLocation);
            }
            return filename;
        }
        public IList<string> SaveFiles(IList<IFormFile> files)
        {
            long size = 0;
            //string wanted_path = Path.GetDirectoryName(Path.GetDirectoryName(Directory.GetCurrentDirectory()));

            var fileNames = new List<string>();
            foreach (var file in files)
            {
                var newFileName = SaveFile(file);
                fileNames.Add(newFileName);
            }
            return fileNames;
        }
    }
}
