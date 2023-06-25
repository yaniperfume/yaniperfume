using Yani.Models.Dashboard;

namespace Yani.Services
{
    public class UploadService
    {
        private readonly IWebHostEnvironment _env;
        public UploadService(IWebHostEnvironment env)
        {
            _env = env;
        }

        public string UploadFile(IFormFile file)
        {
            var uploadDirectory = Path.Combine(_env.WebRootPath, "uploads");
            var fileName = Guid.NewGuid().ToString() + "_" + DateTime.Now.ToString("yyyyMMddHHmmss") + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadDirectory, file.ContentType, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            return filePath;
        }
    }
}
