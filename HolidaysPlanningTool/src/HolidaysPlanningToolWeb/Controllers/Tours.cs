using System.Linq;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.Data.Entity;
using HolidaysPlanningToolWeb.Models;
using HolidaysPlanningToolWeb.ViewModels;
using Microsoft.Extensions.OptionsModel;

namespace HolidaysPlanningToolWeb.Controllers
{

    public class ToursController : Controller
    {
        private readonly IOptions<APIOptions> _options;

        public ToursController(IOptions<APIOptions> options)
        {
            _options = options;
        }

        // GET: Tours
        public IActionResult Index()
        {
            var address = _options.Value.Address;
            var model = new TravelIndexModel(address);
            return View(model);
        }
    }
}
