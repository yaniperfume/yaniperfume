using System.ComponentModel.DataAnnotations;

namespace Yani.Models.Account
{
    public class LoginWithPassword
    {
        [Required(ErrorMessage = "نام کاربری الزامی است.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "پسوورد الزامی است.")]
        public string Password { get; set; }
    }
}
