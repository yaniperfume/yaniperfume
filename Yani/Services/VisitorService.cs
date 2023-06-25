using Microsoft.EntityFrameworkCore;
using System.Globalization;
using Yani.Models.Dashboard;
using Yani.Models.Database;

namespace Yani.Services
{
    public class VisitorService
    {
        private readonly BeShopContext _context;

        public VisitorService(BeShopContext context)
        {
            _context = context;
        }

        public int GetVisitorsCount()
        {
            return _context.WebsiteVisitors.AsNoTracking().Count();
        }

        public int GetYesterdayVisitorsCount()
        {
            var yesterdayUtc = DateTime.UtcNow.AddDays(-1).Date;
            return _context.WebsiteVisitors.AsNoTracking()
                .Where(x => x.VisitDate.Date == yesterdayUtc)
                .Count();
        }

        public List<DailyVisit> GetDailyVisits()
        {
            var today = DateTime.Today;
            var sevenDaysAgo = today.AddDays(-6);
            var persianCalendar = new PersianCalendar();
            var persianCulture = new CultureInfo("fa-IR");
            var dailyVisits = _context.WebsiteVisitors
                .Where(wv => wv.VisitDate >= sevenDaysAgo && wv.VisitDate <= today)
                .GroupBy(wv => wv.VisitDate.Date)
                .Select(g => new DailyVisit
                {
                    Day = persianCulture.DateTimeFormat.GetDayName(persianCalendar.GetDayOfWeek(g.Key)),
                    Visits = g.Count()
                })
                .AsEnumerable()
                .OrderBy(g => g.Day)
                .ToList();

            return dailyVisits;
        }

        public double GetTotalVisitorsChange()
        {
            var yesterdayUtc = DateTime.UtcNow.AddDays(-1).Date;
            var visitorsCount = _context.WebsiteVisitors.AsNoTracking().Count();
            var yesterdayVisitorsCount = _context.WebsiteVisitors.AsNoTracking()
                .Where(x => x.VisitDate.Date == yesterdayUtc)
                .Count();
            var totalVisitorsChange = (visitorsCount - yesterdayVisitorsCount) / (double)yesterdayVisitorsCount * 100;
            return totalVisitorsChange;
        }
    }
}
