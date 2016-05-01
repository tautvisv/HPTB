using System.Collections.Generic;
using System.Web;
using System.Web.Http;
using FileProcessingLib;
using HoolidaysPlanningToolsAPIMVC5.Managers;
using Microsoft.AspNet.Identity;

namespace HoolidaysPlanningToolsAPIMVC5.Controllers
{


    [Authorize]
    //[RoutePrefix("api/{Type: regex(Mock | PhotoUpload)}")]
    // [RoutePrefix("api/{controllername:regex(^Mock|PhotoUpload$)}")]
    [RoutePrefix(Constants.Constants.WebApiPrefix + "PhotoUpload")]
    //[RoutePrefix("api/[controller]")]
    public class PhotoUploadController : ApiController
    {
        private readonly IStreamSaver fileManager;
        public PhotoUploadController()
        {
            fileManager = new ImageManager(HttpContext.Current.Server.MapPath("~"), @"\nuotraukosjega");
        }

        [HttpGet]
        [Route("testf")]
        public int GetTest()
        {
            return 15;
        }

        [Route("UploadUserPhoto")]
        [HttpPost]
        public string PostUploadUserPhoto()
        {
            var file = HttpContext.Current.Request.Files.Count > 0 ? HttpContext.Current.Request.Files[0] : null;
            if (file == null) return "";

            using (var fileStream = file.InputStream)
            {
                var filenName = file.FileName.Replace(' ', '_');
                var filePath = fileManager.Save(fileStream, filenName);
                fileManager.SaveAsMinified(filePath, filenName);
                return filePath;
            }

        }
        [Route("UploadFiles")]
        [HttpPost]
        public IList<string> PostUploadFiles()
        {
            var photosList = new List<string>();
            for(var i = 0; i < HttpContext.Current.Request.Files.Count; i++)
            {
                HttpPostedFile file = HttpContext.Current.Request.Files[i];
                var filePath = fileManager.Save(file.InputStream, file.FileName);
                photosList.Add(filePath);
            }
            return photosList;
        }
        // GET: api/5
        [Route(("{id}"))]
        [HttpGet]
        public object GetController([FromUri] string id)
        {
            var identity = User.Identity.GetUserId();
            return Ok(identity);
        }


        // POST: api/
        [Route(("{id}"))]
        [HttpPost]
        public object PostController([FromUri] string id, [FromBody] object userSettings)
        {
            return Ok(userSettings);
        }

    }
}
