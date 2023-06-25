using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using System.Globalization;
using Yani.Models.Dashboard;
using Yani.Models.Database;

namespace Yani.Services
{
    public class OrderService
    {
        private readonly BeShopContext _context;

        public OrderService(BeShopContext context)
        {
            _context = context;
        }

        public int GetOrdersCount()
        {
            return _context.Orders.AsNoTracking().Count(x => x.TrackingNumber.HasValue);
        }

        public int GetPendingOrdersCount()
        {
            return _context.Orders.AsNoTracking().Count(x => !x.ShippedDate.HasValue && x.TrackingNumber.HasValue);
        }

        public int GetYesterdayOrdersCount()
        {
            var yesterdayUtc = DateTime.UtcNow.AddDays(-1).Date;
            return _context.Orders.AsNoTracking()
                .Count(x => x.OrderDate.Date == yesterdayUtc && x.TrackingNumber.HasValue);
        }

        public int GetYesterdayPendingOrdersCount()
        {
            var yesterdayUtc = DateTime.UtcNow.AddDays(-1).Date;
            return _context.Orders.AsNoTracking()
                .Count(x => (!x.ShippedDate.HasValue && x.TrackingNumber.HasValue) &&  x.OrderDate.Date == yesterdayUtc);
        }

        public List<PendingOrders> GetPendingOrders()
        {
            var orders = _context.Orders
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                .Where(o => o.TrackingNumber != null && o.ShippedDate == null && o.DeliveredDate == null)
                .ToList();

            var orderViewModels = new List<PendingOrders>();

            foreach (var order in orders)
            {
                var orderViewModel = new PendingOrders
                {
                    UserName = $"{order.User.FirstName} {order.User.LastName}",
                    TotalPrice = order.TotalCost,
                    TimeElapsed = (DateTime.UtcNow - order.OrderDate).TotalSeconds,
                    HasCoupon = order.CouponId != null,
                    ProductImageUrl = order.OrderItems.FirstOrDefault()?.Product.ImageUrl ?? "/images/product/product-1.png",
                };

                orderViewModels.Add(orderViewModel);
            }

            return orderViewModels;
        }

        public double GetTotalOrdersChange()
        {
            var yesterdayUtc = DateTime.UtcNow.AddDays(-1).Date;
            var ordersCount = _context.Orders.AsNoTracking().Count(x => x.TrackingNumber.HasValue);
            var yesterdayOrdersCount = _context.Orders.AsNoTracking()
                .Count(x => x.OrderDate.Date == yesterdayUtc && x.TrackingNumber.HasValue);
            var totalOrdersChange = (ordersCount - yesterdayOrdersCount) / (double)yesterdayOrdersCount * 100;
            return totalOrdersChange;
        }

        public double GetPendingOrdersChange()
        {
            var yesterdayUtc = DateTime.UtcNow.AddDays(-1).Date;
            var pendingOrdersCount = _context.Orders.AsNoTracking().Count(x => !x.ShippedDate.HasValue && x.TrackingNumber.HasValue);
            var yesterdayPendingOrdersCount = _context.Orders.AsNoTracking()
                .Count(x => !x.ShippedDate.HasValue && x.OrderDate.Date == yesterdayUtc && x.TrackingNumber.HasValue);
            var pendingOrdersChange = (pendingOrdersCount - yesterdayPendingOrdersCount) / (double)yesterdayPendingOrdersCount * 100;
            return pendingOrdersChange;
        }

        public List<MonthlySales> GetMonthlySales()
        {
            var today = DateTime.Today;
            var twelveMonthsAgo = today.AddMonths(-5);
            var persianCalendar = new PersianCalendar();
            var persianCulture = new CultureInfo("fa-IR");
            var monthlySales = _context.Orders
                .Where(o => o.TrackingNumber != null && o.OrderDate >= twelveMonthsAgo)
                .GroupBy(o => new DateTime(o.OrderDate.Year, o.OrderDate.Month, 1))
                .Select(GetMonthlySalesByMonth)
                .OrderBy(g => g.Month)
                .ToList();

            return monthlySales;

            MonthlySales GetMonthlySalesByMonth(IGrouping<DateTime, Orders> g)
            {
                var persianDate = new DateTime(persianCalendar.GetYear(g.Key),
                                               persianCalendar.GetMonth(g.Key),
                                               persianCalendar.GetDayOfMonth(g.Key),
                                               persianCalendar);
                var persianMonthName = persianCulture.DateTimeFormat.GetMonthName(persianCalendar.GetMonth(g.Key));
                return new MonthlySales() { Month = $"{persianCalendar.GetYear(g.Key)}/{persianMonthName}", TotalCost = g.Sum(o => o.TotalCost) };
            }
        }
    }
}