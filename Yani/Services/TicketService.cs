using Microsoft.EntityFrameworkCore;
using System.Net.Sockets;
using Yani.Models.Database;

namespace Yani.Services
{
    public class TicketService
    {
        private readonly BeShopContext _context;

        public TicketService(BeShopContext context)
        {
            _context = context;
        }

        public IQueryable<SupportTickets> GetOpenTickets()
        {
            return _context.SupportTickets.AsNoTracking().Where(x => x.IsTicketOpen ?? true);
        }

        public int GetOpenTicketsCount()
        {
            return GetOpenTickets().Count();
        }

        public List<SupportTickets> GetYesterdayTickets()
        {
            var yesterdayUtc = DateTimeOffset.UtcNow.AddDays(-1).Date;
            return _context.SupportTickets.AsNoTracking().Where(x => x.Timestamp.HasValue && x.Timestamp.Value.Date == yesterdayUtc).ToList();
        }

        public int GetYesterdayTicketsCount()
        {
            return GetYesterdayTickets().Count();
        }

        public double GetOpenTicketsChange()
        {
            var todayUtc = DateTimeOffset.UtcNow.Date;
            var yesterdayUtc = todayUtc.AddDays(-1);

            var tickets = _context.SupportTickets.AsNoTracking();
            var openTickets = tickets.Count(x => x.IsTicketOpen ?? true);
            var yesterdayTicketsCount = GetYesterdayTickets().Count();

            return yesterdayTicketsCount == 0 ? 0 : (openTickets - yesterdayTicketsCount) / (double)yesterdayTicketsCount * 100;
        }
    }
}
