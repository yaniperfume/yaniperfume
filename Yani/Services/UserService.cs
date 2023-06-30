using Yani.Models.Dashboard;
using Yani.Models.Database;

namespace Yani.Services
{
    public class UserService
    {
        private readonly BeShopContext _dbContext;

        public UserService(BeShopContext dbContext)
        {
            _dbContext = dbContext;
        }

        public UsersRating GetUsersRating()
        {
            var query = from r in _dbContext.Reviews
                        where r.IsApproved == true
                        group r by 1 into g
                        select new UsersRating
                        {
                            OneStar = g.Count(x => x.Rating == 1),
                            TwoStar = g.Count(x => x.Rating == 2),
                            ThreeStar = g.Count(x => x.Rating == 3),
                            FourStar = g.Count(x => x.Rating == 4),
                            FiveStar = g.Count(x => x.Rating == 5),
                            OverallStar = (int)Math.Round(g.Average(x => x.Rating) ?? 0.0d, MidpointRounding.AwayFromZero),
                            Total = g.Count()
                        };

            return query.FirstOrDefault() ?? new UsersRating() { FiveStar = 0, FourStar = 0, OneStar = 0, OverallStar = 0, ThreeStar = 0, Total = 0, TwoStar = 0 };
        }

        public Gender GetGender()
        {
            var genderCounts = _dbContext.Users
                .GroupBy(u => u.Gender)
                .Select(g => new
                {
                    Gender = g.Key,
                    Count = g.Count()
                })
                .ToDictionary(g => g.Gender, g => g.Count);

            return new Gender
            {
                Male = genderCounts.GetValueOrDefault(true),
                Female = genderCounts.GetValueOrDefault(false)
            };
        }
    }
}
