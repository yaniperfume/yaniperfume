namespace Yani.Models.Dashboard
{
    public class PendingOrders
    {
        public string UserName { get; set; }
        public decimal TotalPrice { get; set; }
        public double TimeElapsed { get; set; }
        public bool HasCoupon { get; set; }
        public string ProductImageUrl { get; set; }
    }
}
