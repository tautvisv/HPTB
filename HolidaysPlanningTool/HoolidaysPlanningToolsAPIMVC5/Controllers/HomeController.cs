﻿using System.Web.Mvc;

namespace HoolidaysPlanningToolsAPIMVC5.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
