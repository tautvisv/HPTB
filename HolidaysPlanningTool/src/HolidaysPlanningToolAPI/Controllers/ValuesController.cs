using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Http;
using Microsoft.Net.Http.Headers;
using System.IO;

namespace HolidaysPlanningToolAPI.Controllers
{
    [Route("api/[controller]")]
    public class FileUploadController : Controller
    {

        [HttpGet("UploadFilesas")]
        public string GetUploadFilesas()
        {
            return "saiciu";
        }

        [HttpPost("UploadFiles")]
        public IActionResult PostUploadFiles(IList<IFormFile> files)
        {
            long size = 0;
            string wanted_path = Path.GetDirectoryName(Path.GetDirectoryName(Directory.GetCurrentDirectory()));
            var fullPath = wanted_path + @"\nuotraukosjega";
            foreach (var file in files)
            {
                var filename = ContentDispositionHeaderValue
                                .Parse(file.ContentDisposition)
                                .FileName
                                .Trim('"');
                if (!Directory.Exists(fullPath)){
                    DirectoryInfo di = Directory.CreateDirectory(fullPath);
                }
                filename = fullPath + $@"\{filename}";
                size += file.Length;
                file.SaveAs(filename);
            }

           return Ok();
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2", "value3" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
