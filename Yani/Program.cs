using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Configuration;
using Yani.Extentions;
using Yani.Models;
using Yani.Models.Database;
using Yani.Services;
using Yani.Validations;

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
            builder.Services.AddBeShopIdentity(builder.Configuration.GetConnectionString("BeShopConnection") ?? throw new InvalidOperationException("Connection string 'BeShopConnection' not found."));

            builder.Services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
                options.LoginPath = "/Account/Login";
                options.LogoutPath = "/Account/Logout";
                options.AccessDeniedPath = "/Account/AccessDenied";
                options.SlidingExpiration = true;
            });

            builder.Services.AddScoped<UserManager<IdentityUser>>();
            builder.Services.AddScoped<SignInManager<IdentityUser>>();
            builder.Services.AddScoped<RoleManager<IdentityRole>>();

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
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseSession();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseStatusCodePagesWithReExecute("/Error/{0}");
            app.Map("/Error", errorApp =>
            {
                errorApp.UseExceptionHandler("/Error/500");
                errorApp.UseStatusCodePagesWithReExecute("/Error/{0}");
            });
            app.UseExceptionHandler("/Error/500");
            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Dashboard}/{action=Index}");

            app.Run();
        }
    }
}