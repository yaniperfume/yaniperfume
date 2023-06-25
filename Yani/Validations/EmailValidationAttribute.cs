using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using Yani.Models.Database;

namespace Yani.Validations
{
    public class EmailValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var _dbContext = (BeShopContext)validationContext?.GetService(typeof(BeShopContext)) ?? null;
            if (_dbContext is null)
            {
                return new ValidationResult("خطای داخلی سرور دوباره تلاش کنید.");
            }
            var email = value as string;
            if (!string.IsNullOrEmpty(email))
            {
                var emailAttribute = new EmailAddressAttribute();
                if (!emailAttribute.IsValid(email))
                {
                    return new ValidationResult("ایمیل وارد شده درست نمی باشد.");
                }
                if (_dbContext.UserLogin.Any(u => u.Email == email))
                {
                    return new ValidationResult("ایمیل وارد شده قبلا انتخاب شده است.");
                }
            }

            return ValidationResult.Success;
        }
    }
}