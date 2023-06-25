using Azure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Buffers.Text;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using Yani.Models.Account;
using Yani.Models.Database;
using Yani.Services;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace Yani.Controllers
{
    public class AccountController : Controller
    {
        private readonly SmsService _smsService;
        private readonly BeShopContext _context;

        public AccountController(SmsService smsService, BeShopContext context)
        {
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
        public async Task<IActionResult> Register(Register model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            using SHA256 sha256Hash = SHA256.Create();
            byte[] pbytes = Encoding.UTF8.GetBytes(model.Password);
            byte[] bytes = sha256Hash.ComputeHash(pbytes);
            string passwordHash = BitConverter.ToString(bytes).Replace("-", "");
            string username;
            do
            {
                username = new Random().Next(1, 99999999).ToString("D9");
            } while (await _context.UserLogin.AnyAsync(u => u.Username == username));

            UserLogin userLogin = new UserLogin()
            {
                PasswordHash = Convert.ToHexString(bytes),
                Email = model.Email,
                PasswordHistory = passwordHash,
                IsEmailVerified = false,
                LastLoginDate = DateTime.Now,
                Username = username,
            };

            Users user = new Users()
            {
                FirstName = model.Name,
                LastName = model.Family,
                Gender = model.Gender == "1" ? true : false,
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            userLogin.UserId = user.UserId;
            _context.UserLogin.Add(userLogin);
            await _context.SaveChangesAsync();

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userLogin.Username),
                new Claim(ClaimTypes.Email, userLogin.Email),
                new Claim(ClaimTypes.NameIdentifier, userLogin.LoginId.ToString())
            };
            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            await HttpContext.SignInAsync("Cookies", new ClaimsPrincipal(identity));
            // Redirect to the home page
            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginWithPassword model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var userLogin = await _context.UserLogin.SingleOrDefaultAsync(u => u.Username == model.Username || u.Email == model.Username);

            if (userLogin is null)
            {
                ModelState.AddModelError("Username", "نام کاربری یا ایمیل وجود ندارد");
                return View(model);
            }

            using SHA256 sha256Hash = SHA256.Create();
            byte[] pbytes = Encoding.UTF8.GetBytes(model.Password);
            byte[] bytes = sha256Hash.ComputeHash(pbytes);
            string passwordHash = BitConverter.ToString(bytes).Replace("-", "");

            if (userLogin.PasswordHash != passwordHash)
            {
                ModelState.AddModelError("Password", "رمز عبور وارد شده نامعتبر است");
                return View(model);
            }


            var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, userLogin.Username),
                    new Claim(ClaimTypes.Email, userLogin.Email),
                    new Claim(ClaimTypes.NameIdentifier, userLogin.LoginId.ToString())
                };
            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            await HttpContext.SignInAsync("Cookies", new ClaimsPrincipal(identity));

            if (userLogin == null)
            {
                ModelState.AddModelError("Username", "خطای داخلی سرور لطفا مجدد تلاش کنید.");
                return View(model);
            }

            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        public async Task<IActionResult> LoginWithPhoneNumber(LoginWithPhoneNumber model)
        {
            // Validate the phone number and OTP   
            string verifyCode = HttpContext.Session.GetString("VerifyCode") ?? "";
            if (verifyCode == model.Otp)
            {
                string phoneNumber = _smsService.NormalizePhone(model.PhoneNumber);
                string username;
                do
                {
                    username = new Random().Next(1, 99999999).ToString("D9");
                } while (await _context.UserLogin.AnyAsync(u => u.Username == username));


                UserLogin userLogin = await _context.UserLogin.FirstOrDefaultAsync(x => x.Phone == phoneNumber) ?? new UserLogin() { Phone = phoneNumber };
                userLogin.LastLoginDate = DateTime.Now;
                userLogin.Username = userLogin.Username ?? username;
                userLogin.Email = userLogin.Email ?? $"{userLogin.Username}@{HttpContext.Request.Host.Value}";
                if (userLogin.LoginId != null)
                {
                    _context.UserLogin.Update(userLogin);
                }
                else
                {
                    _context.UserLogin.Add(userLogin);
                }
                await _context.SaveChangesAsync();

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, userLogin.Username),
                    new Claim(ClaimTypes.Email, userLogin.Email),
                    new Claim(ClaimTypes.NameIdentifier, userLogin.LoginId.ToString())
                };
                var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                await HttpContext.SignInAsync("Cookies", new ClaimsPrincipal(identity));
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
            await HttpContext.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }
    }
}
