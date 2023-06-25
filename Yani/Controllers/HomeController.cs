using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Yani.Models;
using Yani.Models.Database;
using Yani.Services;

namespace Yani.Controllers
{
    public class HomeController : Controller
    {  
        private readonly BeShopContext _context;

        public HomeController(  SmsService smsService, BeShopContext context)
        { 
            _context = context;
        }

        public IActionResult Index()
        {
            var currentUser = ViewBag.User;
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}