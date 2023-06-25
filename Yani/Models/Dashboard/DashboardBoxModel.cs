namespace Yani.Models.Dashboard
{
    public class BoxModel
    {
        public string Percentage { get; set; }
        public string Value { get; set; }
    }
    public class DashboardBoxesModel
    {
        public BoxModel TotalOrders { get; set; }
        public BoxModel PendingOrders { get; set; }
        public BoxModel TotalVisitors { get; set; }
        public BoxModel OpenTickets { get; set; }
    }
}
