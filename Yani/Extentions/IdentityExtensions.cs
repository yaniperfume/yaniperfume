using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Yani.Models.Database;

namespace Yani.Extentions
{
    public static class IdentityExtensions
    {
        public static IServiceCollection AddBeShopIdentity(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<BeShopContext>(options => options.UseSqlServer(connectionString));

            services.AddIdentity<IdentityUser, IdentityRole>(options =>
            { 
            })
            .AddEntityFrameworkStores<BeShopContext>()
            .AddDefaultTokenProviders();
            
            return services;
        }
    }
}