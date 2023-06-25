using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.RegularExpressions;
using Yani.Models.Account;
using Yani.Models.Database;
using Yani.Services;

namespace Yani.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly SmsService _smsService;
        private readonly BeShopContext _context;

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, SmsService smsService, BeShopContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _smsService = smsService;
            _context = context;
        }

        public IActionResult Index()
        {
            return RedirectToAction("Index", "Dashboard");
        }

        [HttpGet]
        public async Task<IActionResult> Login()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginWithPassword model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null)
            {
                ModelState.AddModelError(string.Empty, "Invalid login attempt");
                return View(model);
            }

            var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);
            if (result.Succeeded)
            {
                return RedirectToAction("Index", "Home");
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Invalid login attempt");
                return View(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> LoginWithPhoneNumber(LoginWithPhoneNumber model)
        {
            // Validate the phone number and OTP   
            string verifyCode = HttpContext.Session.GetString("VerifyCode") ?? "";
            if (verifyCode == model.Otp)
            {
                string phoneNumber = _smsService.NormalizePhone(model.PhoneNumber);
                UserLogin userLogin = await _context.UserLogin.FirstOrDefaultAsync(x => x.Phone == phoneNumber) ?? new UserLogin() { Phone = phoneNumber };
                userLogin.LastLoginDate = DateTime.Now;
                userLogin.Username = userLogin.Username ?? new Random().Next(10000000, 99999999).ToString();
                userLogin.Email = userLogin.Email ?? $"{userLogin.Username}@{HttpContext.Request.Host.Value}";
                if (userLogin.LoginId != null)
                {
                    _context.Update(userLogin);
                }
                else
                {
                    _context.Add(userLogin);
                }
                IdentityUser idu = new IdentityUser();
                idu.Id = userLogin.LoginId.ToString();
                idu.PhoneNumber = userLogin.Phone;
                idu.UserName = userLogin.Username;
                idu.Email = userLogin.Email;
                await _signInManager.SignInAsync(idu, true);

                // Redirect to the home page
                return RedirectToAction("Index", "Home");

            }

            // Sign in the user

            // If sign-in fails, return an error message
            ModelState.AddModelError(string.Empty, "شماره همراه یا کد یکبار مصرف نادرست است.");
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> SendOtp(string phoneNumber)
        {
            phoneNumber = _smsService.NormalizePhone(phoneNumber);
            if (!_smsService.IsValidPhone(phoneNumber))
            {
                return Json(false);
            }

            // generates a random integer between 1 and 99999
            Random rand = new Random();
            int randomNumber = rand.Next(1, 100000);
            // formats the integer as a 5-digit string with leading zeros
            string code = randomNumber.ToString("D5");

            // set session 
            HttpContext.Session.SetString("VerifyCode", code);

            // send sms
            var smsIr = await _smsService.SendCode(phoneNumber, code);
            if (smsIr.Status == 1)
            {
                return Json(true);
            }

            return Json(false);
        }

        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }
    }
}
