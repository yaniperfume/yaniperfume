using Yani.Models.Database;

namespace Yani.Services
{
    public class ProductService
    {
        private readonly BeShopContext _dbContext;

        public ProductService(BeShopContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Products> GetHighestScoreProducts(int take)
        {
            var topRatedProducts = GetTopRatedProducts();
            var highestSalesVolumeProducts = GetHighestSalesVolumeProducts();
            var trendingNowProducts = GetTrendingNowProducts();

            var productScores = new Dictionary<Products, int>();
            foreach (var product in topRatedProducts.Concat(highestSalesVolumeProducts).Concat(trendingNowProducts))
            {
                int score = 0;
                if (topRatedProducts.Contains(product))
                    score += 3;
                if (highestSalesVolumeProducts.Contains(product))
                    score += 2;
                if (trendingNowProducts.Contains(product))
                    score += 1;
                productScores[product] = score;
            }

            var highestScoreProducts = productScores.OrderByDescending(x => x.Value)
                                                   .Select(x => x.Key)
                                                   .Take(take)
                .ToList(); ;

            return highestScoreProducts;
        }

        public IEnumerable<Products> GetTopRatedProducts()
        {
            var topRatedProducts = _dbContext.Products
                                    .Join(_dbContext.Reviews, p => p.ProductId, r => r.ProductId, (p, r) => new { Product = p, Review = r })
                                    .Where(x => x.Review.IsApproved)
                                    .GroupBy(x => x.Product)
                                    .Select(g => new
                                    {
                                        Product = g.Key,
                                        AverageRating = g.Average(x => x.Review.Rating)
                                    })
                                    .OrderByDescending(x => x.AverageRating)
                                    .Take(5)
                                    .Select(x => x.Product)
                .ToList(); ;
            return topRatedProducts;
        }

        public IEnumerable<Products> GetHighestSalesVolumeProducts()
        {
            var result = _dbContext.OrderItems
                        .GroupBy(oi => oi.ProductId)
                        .Select(g => new { ProductID = g.Key, TotalQuantity = g.Sum(oi => oi.Quantity) })
                        .OrderByDescending(x => x.TotalQuantity)
                        .Take(5)
                        .Join(_dbContext.Products,
                              x => x.ProductID,
                              p => p.ProductId,
                              (x, p) => p)
                        .ToList();
            return result;
        }

        public IEnumerable<Products> GetTrendingNowProducts()
        {
            var result = _dbContext.OrderItems
                .GroupBy(oi => oi.ProductId)
                .Select(g => new
                {
                    ProductID = g.Key,
                    Last30DaysQuantity = g.Where(oi => oi.Order.OrderDate >= DateTime.Now.AddDays(-30)).Sum(oi => oi.Quantity),
                    Previous30DaysQuantity = g.Where(oi => oi.Order.OrderDate < DateTime.Now.AddDays(-30)).Sum(oi => oi.Quantity)
                })
                .OrderByDescending(x => x.Last30DaysQuantity - x.Previous30DaysQuantity)
                .Take(10)
                .Join(_dbContext.Products,
                      x => x.ProductID,
                      p => p.ProductId,
                      (x, p) => p)
                .ToList(); ;

            return result;
        }

        public IEnumerable<Products> GetProductsByBrand(int brandID)
        {
            return _dbContext.Products
                .Where(p => p.BrandId == brandID)
                .ToList(); ;
        }

        public Products GetProductById(int productId)
        {
            var product = _dbContext.Products.FirstOrDefault(p => p.ProductId == productId);
            return product;
        } 
    }
}
