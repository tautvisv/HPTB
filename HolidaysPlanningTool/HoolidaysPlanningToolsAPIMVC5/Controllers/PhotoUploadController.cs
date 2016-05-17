using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Http;
using FileProcessingLib;
using HoolidaysPlanningToolsAPIMVC5.Managers;

namespace HoolidaysPlanningToolsAPIMVC5.Controllers
{


    [Authorize]
    //[RoutePrefix("api/{Type: regex(Mock | PhotoUpload)}")]
    // [RoutePrefix("api/{controllername:regex(^Mock|PhotoUpload$)}")]
    [RoutePrefix(Constants.Constants.WebApiPrefix + "PhotoUpload")]
    //[RoutePrefix("api/[controller]")]
    public class PhotoUploadController : AbstractApiController
    {
        private readonly IStreamSaver fileManager;
        public PhotoUploadController()
        {
            fileManager = new ImageManager(HttpContext.Current.Server.MapPath("~"), @"\nuotraukosjega");
        }
        

        [Route("UploadUserPhoto")]
        [HttpPost]
        public string PostUploadUserPhoto()
        {
            var file = HttpContext.Current.Request.Files.Count > 0 ? HttpContext.Current.Request.Files[0] : null;
            if (file == null) return "";

            using (var fileStream = file.InputStream)
            {
                var filenName = "user_" + DateTime.UtcNow.Ticks + "_" + file.FileName.Replace(' ', '_');
                var filePath = fileManager.Save(fileStream, filenName);
                fileManager.SaveAsMinified(filePath, filenName);
                return filePath;
            }

        }
        [Route("UploadTravelPhoto")]
        [HttpPost]
        public IHttpActionResult PostUploadFiles()
        {
            var photosList = new List<string>();
            for(var i = 0; i < HttpContext.Current.Request.Files.Count; i++)
            {
                var file = HttpContext.Current.Request.Files[i];
                var filenName = "user_" + DateTime.UtcNow.Ticks + "_" + file.FileName.Replace(' ', '_');
                var filePath = fileManager.Save(file.InputStream, filenName);
                photosList.Add(filePath);
            }
            return Ok(photosList);
        }

    }
}
