using System.ComponentModel.DataAnnotations;

namespace Yani.Models.Account
{
    public class LoginWithPhoneNumber
    {
        // Properties for phone number and OTP login form
        [Required(ErrorMessage = "شماره همراه الزامی است.")]
        public string PhoneNumber { get; set; }
        public string Otp { get; set; }
    }
}
