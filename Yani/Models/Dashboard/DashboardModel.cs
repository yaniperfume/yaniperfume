using Yani.Models.Database;

namespace Yani.Models.Dashboard
{
    public class DashboardModel
    {
        public DashboardBoxesModel BoxesModel { get; set; }
        public UsersRating UsersStars { get; set; }
        public Gender UsersByGender { get; set; }
        public IEnumerable<Products> RecommendedProducts { get; set; }
    }
}
