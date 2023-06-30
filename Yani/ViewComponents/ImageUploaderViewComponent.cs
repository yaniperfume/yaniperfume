using Microsoft.AspNetCore.Mvc;
using Yani.Models.Components;

namespace Yani.ViewComponents
{ 
    public class ImageUploaderViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke(ImageUploaderModel model)
        {
            return View(model);
        } 
    }
}
