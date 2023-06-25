using System.ComponentModel.DataAnnotations;

namespace Yani.Validations
{
    public class GenderValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null || (value.ToString() != "0" && value.ToString() != "1"))
            {
                return new ValidationResult("جنسیت معتبر نیست.");
            }

            return ValidationResult.Success;
        }
    }
}
