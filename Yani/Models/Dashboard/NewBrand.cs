using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace Yani.Models.Dashboard
{
    public class NewBrand
    {
        [Required(ErrorMessage = "نام برند الزامی است.")]
        [StringLength(50, ErrorMessage = "نام برند نمی تواند بیشتر از 50 کاراکتر باشد.")]
        public string BrandName { get; set; }

        [Display(Name = "تگ های سئو")]
        public List<string>? Tags { get; set; }
        
        [Display(Name = "توضیحات برند")]
        public string? BrandDescription { get; set; }

        [Display(Name = "تصویر برند")]
        public IFormFile? Image { get; set; }
    }
}
