using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using HolidaysPlanningToolWeb.Models;

namespace HolidaysPlanningToolWeb.Controllers
{
    [Produces("application/json")]
    [Route("api/Mock")]
    public class MockController : Controller
    {


        public MockController()
        {
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


        protected override void Dispose(bool disposing)
        {

        }
        
    }
}