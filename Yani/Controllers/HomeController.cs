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
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly BeShopContext _context;

        public HomeController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, SmsService smsService, BeShopContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }

        public IActionResult Index()
        {
            var currentUser = _userManager.Users.FirstOrDefault();
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