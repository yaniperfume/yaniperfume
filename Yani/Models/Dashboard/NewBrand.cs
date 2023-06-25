using System.ComponentModel.DataAnnotations;

namespace Yani.Models.Dashboard
{
    public class NewBrand
    {
        [Required(ErrorMessage = "نام برند الزامی است.")]
        [StringLength(50, ErrorMessage = "نام برند نمی تواند بیشتر از 50 کاراکتر باشد.")]
        public string BrandName { get; set; }

        public List<string> Tags { get; set; }

        [Display(Name = "توضیحات برند")]
        public string BrandDescription { get; set; }

        [Display(Name = "تصویر برند")]
        public IFormFile BrandImage { get; set; }
    }
}
