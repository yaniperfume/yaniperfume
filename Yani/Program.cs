using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Yani.Models.Database;
using Yani.Services;

namespace Yani
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<BeShopContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("BeShopConnection") ?? throw new InvalidOperationException("Connection string 'BeShopConnection' not found.")));

            builder.Services.AddScoped<VisitorService>();
            builder.Services.AddScoped<OrderService>();
            builder.Services.AddScoped<TicketService>();
            builder.Services.AddScoped<UserService>();
            builder.Services.AddScoped<ProductService>();
            builder.Services.AddScoped<UploadService>();
            builder.Services.AddScoped<SmsService>();
            // Add services to the container.
            builder.Services.AddControllersWithViews();
            builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(options =>
            {
                options.Cookie.HttpOnly = true;
                //options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.Cookie.SameSite = SameSiteMode.Lax;
                options.Cookie.Name = CookieAuthenticationDefaults.AuthenticationScheme;
                options.Cookie.IsEssential = true;
                options.LoginPath = "/Account/Login";
                options.LogoutPath = "/Account/Logout";
                options.AccessDeniedPath = "/Account/AccessDenied";
                options.ExpireTimeSpan = TimeSpan.FromMinutes(20);
            }); 
            builder.Services.AddDistributedMemoryCache();

            builder.Services.AddSession(options =>
            {
                options.Cookie.Name = ".BeShop.Session";
                options.IdleTimeout = TimeSpan.FromMinutes(6);
                options.Cookie.IsEssential = true;
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseSession();
            app.UseAuthentication();
            app.UseAuthorization();

            //app.UseStatusCodePagesWithReExecute("/Error/{0}");
            //app.Map("/Error", errorApp =>
            //{
            //    errorApp.UseExceptionHandler("/Error/500");
            //    errorApp.UseStatusCodePagesWithReExecute("/Error/{0}");
            //});
            //app.UseExceptionHandler("/Error/500");

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Dashboard}/{action=Index}");

            app.Run();
        }
    }
}