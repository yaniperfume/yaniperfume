using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Yani.Models.Dashboard;
using Yani.Models.Database;
using Yani.Services;

namespace Yani.Controllers
{
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    public class DashboardController : Controller
    {
        private readonly BeShopContext _context;
        private readonly VisitorService _visitorService;
        private readonly OrderService _orderService;
        private readonly TicketService _ticketService;
        private readonly UserService _userService;
        private readonly ProductService _productService;
        private readonly UploadService _uploadService;

        public DashboardController(BeShopContext context, VisitorService visitorService, OrderService orderService, TicketService ticketService, UserService userService,
             ProductService productService, UploadService uploadService)
        {
            _context = context;
            _visitorService = visitorService;
            _orderService = orderService;
            _ticketService = ticketService;
            _userService = userService;
            _productService = productService;
            _uploadService = uploadService;
        }
        // GET: Admin
        public async Task<IActionResult> Index()
        {
            List<KeyValuePair<string, string>> pages = new List<KeyValuePair<string, string>>();
            ViewData["Title"] = "داشبورد";
            ViewData["Pages"] = pages;


            var visitorsCount = _visitorService.GetVisitorsCount();
            var visitorsChange = _visitorService.GetTotalVisitorsChange();

            var pendingOrdersChange = _orderService.GetPendingOrdersChange();
            var pendingOrdersCount = _orderService.GetPendingOrdersCount();

            var ordersCount = _orderService.GetOrdersCount();
            var totalOrdersChange = _orderService.GetTotalOrdersChange();

            var openTicketsCount = _ticketService.GetOpenTicketsCount();
            var openTicketsChange = _ticketService.GetOpenTicketsChange();

            var userReviews = _userService.GetUsersRating();

            var dashboardBoxes = new DashboardBoxesModel
            {
                TotalOrders = new BoxModel() { Percentage = totalOrdersChange.ToString("+#.##%;-#.##%"), Value = ordersCount.ToString() },
                PendingOrders = new BoxModel() { Percentage = pendingOrdersChange.ToString("+#.##%;-#.##%"), Value = pendingOrdersCount.ToString() },
                TotalVisitors = new BoxModel() { Percentage = visitorsChange.ToString("+#.##%;-#.##%"), Value = visitorsCount.ToString() },
                OpenTickets = new BoxModel() { Percentage = openTicketsChange.ToString("+#.##%;-#.##%"), Value = openTicketsCount.ToString() },
            };
            var gender = _userService.GetGender();
            var recommendedProducts = _productService.GetHighestScoreProducts(5);
            var dashboardModel = new DashboardModel()
            {
                BoxesModel = dashboardBoxes,
                UsersStars = userReviews,
                UsersByGender = gender,
                RecommendedProducts = recommendedProducts,
            };

            return View(dashboardModel);
        }

        [HttpGet]
        public async Task<IActionResult> GetDailyVisits()
        {
            var dailyVisits = _visitorService.GetDailyVisits();

            return Json(dailyVisits);
        }

        [HttpGet]
        public async Task<IActionResult> GetPendingOrders()
        {
            var pendingOrders = _orderService.GetPendingOrders();

            return Json(pendingOrders);
        }

        [HttpGet]
        public async Task<IActionResult> GetMonthlySales()
        {
            var dailyVisits = _orderService.GetMonthlySales();
            return Json(dailyVisits);
        }

        [HttpGet]
        public IActionResult GetBrands(int draw, int start, int length, string searchValue, string orderColumn, string orderDirection)
        {
            var brands = _context.Brand.ToList();
            if (!string.IsNullOrEmpty(searchValue))
            {
                brands = brands.Where(b => b.BrandName.Contains(searchValue)).ToList();
            }
            if (!string.IsNullOrEmpty(orderColumn))
            {
                var propertyInfo = typeof(Brand).GetProperty(orderColumn);
                if (propertyInfo != null)
                {
                    if (orderDirection == "asc")
                    {
                        brands = brands.OrderBy(b => propertyInfo.GetValue(b)).ToList();
                    }
                    else
                    {
                        brands = brands.OrderByDescending(b => propertyInfo.GetValue(b)).ToList();
                    }
                }
            }
            var totalRecords = brands.Count;
            brands = brands.Skip(start).Take(length).ToList();

            // Create the response object
            var response = new
            {
                draw = draw,
                recordsTotal = totalRecords,
                recordsFiltered = totalRecords,
                data = brands
            };

            return Json(response);
        }

        public async Task<IActionResult> Brands()
        {
            List<KeyValuePair<string, string>> pages = new List<KeyValuePair<string, string>>();
            pages.Add(KeyValuePair.Create("برند‌ها", "Brands"));
            ViewData["Title"] = "برند‌ها";
            ViewData["Pages"] = pages;

            return View();
        }

        [Route("dashboard/brands/add")]
        public async Task<IActionResult> AddBrand(NewBrand model)
        {
            if (ModelState.IsValid)
            {
                int? loginId = int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var lid) ? lid : null;
                var brand = new Brand
                {
                    BrandName = model.BrandName,
                    ImageUrl = _uploadService.UploadFile(model.Image),
                    CreatedBy = loginId,
                    UpdatedBy = loginId,
                    UpdateDate = DateTime.Now,
                    CreatedDate = DateTime.Now,
                };

                _context.Brand.Add(brand);
                _context.SaveChanges();

                return RedirectToAction("Brands");
            }

            List<KeyValuePair<string, string>> pages = new List<KeyValuePair<string, string>>();
            pages.Add(KeyValuePair.Create("برند‌ها", "Brands"));
            pages.Add(KeyValuePair.Create("برند‌ جدید", "AddBrand"));
            ViewData["Title"] = "برند‌ جدید";
            ViewData["Pages"] = pages;

            return View(model);
        }

        public async Task<IActionResult> Groups()
        {
            List<KeyValuePair<string, string>> pages = new List<KeyValuePair<string, string>>();
            pages.Add(KeyValuePair.Create("گروه‌ها", "Groups"));
            ViewData["Title"] = "گروه‌ها";
            ViewData["Pages"] = pages;

            return View();
        }

        [Route("dashboard/groups/add")]
        public async Task<IActionResult> AddGroup()
        {
            List<KeyValuePair<string, string>> pages = new List<KeyValuePair<string, string>>();
            pages.Add(KeyValuePair.Create("گروه‌ها", "Groups"));
            pages.Add(KeyValuePair.Create("گروه‌ جدید", "AddGroup"));
            ViewData["Title"] = "گروه‌ جدید";
            ViewData["Pages"] = pages;

            return View();
        }

        public async Task<IActionResult> Products()
        {
            List<KeyValuePair<string, string>> pages = new List<KeyValuePair<string, string>>();
            pages.Add(KeyValuePair.Create("کالا‌ها", "Products"));
            ViewData["Title"] = "کالا‌ها";
            ViewData["Pages"] = pages;

            return View();
        }

        [Route("dashboard/products/add")]
        public async Task<IActionResult> AddProduct()
        {
            List<KeyValuePair<string, string>> pages = new List<KeyValuePair<string, string>>();
            pages.Add(KeyValuePair.Create("کالا‌ها", "Products"));
            pages.Add(KeyValuePair.Create("کالا‌ جدید", "AddProduct"));
            ViewData["Title"] = "کالا‌ جدید";
            ViewData["Pages"] = pages;

            return View();
        }

        [Route("dashboard/orders/{id?}/{sort?}/{type?}")]
        [Route("dashboard/orders/{type}")]
        public async Task<IActionResult> Orders(string id = null, string sort = null, string type = null)
        {

            return View();
        }

        public async Task<IActionResult> Gifts()
        {

            return View();
        }

        [Route("dashboard/gifts/add")]
        public async Task<IActionResult> AddGift()
        {

            return View();
        }

        public async Task<IActionResult> Offers()
        {

            return View();
        }

        [Route("dashboard/offers/add")]
        public async Task<IActionResult> AddOffer()
        {

            return View();
        }

        [Route("dashboard/orders/{id?}/{sort?}/{type?}")]
        [Route("dashboard/orders/{type}")]
        public async Task<IActionResult> Users(string id = null, string sort = null, string type = null)
        {

            return View();
        }

        [Route("dashboard/orders/{id?}/{sort?}/{type?}")]
        [Route("dashboard/orders/{type}")]
        public async Task<IActionResult> Tickets(string id = null, string sort = null, string type = null)
        {

            return View();
        }

        public async Task<IActionResult> Reports()
        {

            return View();
        }

        public async Task<IActionResult> SaleReports()
        {

            return View();
        }

        public async Task<IActionResult> UserReports()
        {

            return View();
        }

        public async Task<IActionResult> SuportReports()
        {

            return View();
        }

        public async Task<IActionResult> BlogReports()
        {

            return View();
        }

        public async Task<IActionResult> Files()
        {

            return View();
        }

        public async Task<IActionResult> Language()
        {

            return View();
        }

        [Route("dashboard/orders/{type?}")]
        public async Task<IActionResult> UserTickets(string type = null)
        {

            return View();
        }

        public async Task<IActionResult> AddUserTickets()
        {

            return View();
        }

        public async Task<IActionResult> UserOrders()
        {

            return View();
        }

        public async Task<IActionResult> UserTrack()
        {

            return View();
        }
    }
}
