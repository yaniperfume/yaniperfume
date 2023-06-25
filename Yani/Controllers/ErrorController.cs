using Microsoft.AspNetCore.Mvc;

namespace Yani.Controllers
{
    public class ErrorController : Controller
    {
        [HttpGet("/error/{statusCode}")]
        public IActionResult Index(int statusCode)
        {
            if (statusCode == 404)
            {
                return View("NotFound");
            }
            else
            {
                return View("ServerError");
            }
        }
    }
}
