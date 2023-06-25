using System.ComponentModel.DataAnnotations;
using Yani.Validations;

namespace Yani.Models.Account
{
    public class Register
    {
        [Required(ErrorMessage = "نام خود را وارد کنید")]
        public string Name { get; set; }

        [Required(ErrorMessage = "نام خانوادگی خود را وارد کنید")]
        public string Family { get; set; }

        [Required(ErrorMessage = "ایمیل خود را وارد کنید")] 
        [EmailValidation]
        public string Email { get; set; }

        [Required(ErrorMessage = "جنسیت را انتخاب کنید")]
        [GenderValidation(ErrorMessage = "جنسیت معتبر نیست.")]
        public string Gender { get; set; }

        [Required(ErrorMessage = "رمز عبور خود را وارد کنید")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "رمز عبور یکسان نیست")]
        public string Confirm { get; set; }

        [Range(typeof(bool), "true", "true", ErrorMessage = "شرایط را باید قبول کنید")]
        public bool Agreement { get; set; }
    }
}