using IPE.SmsIrClient.Models.Requests;
using IPE.SmsIrClient;
using Yani.Models.Database;
using IPE.SmsIrClient.Models.Results;
using System.Text.RegularExpressions;

namespace Yani.Services
{
    public class SmsService
    {
        private readonly BeShopContext _context;
        private readonly SmsIr _sms;

        public SmsService(BeShopContext context)
        {
            _context = context;
            _sms = new SmsIr("u955Mq7KYYJr82TjbzLggrAIg9vJYgTg8n3ryXsr5B5twzO10r5cPZoRDNHzrSfu");
        }

        public async Task<SmsIrResult<VerifySendResult>> SendCode(string mobile, string code)
        {
            var data = await _sms.VerifySendAsync(mobile, 100000, new VerifySendParameter[] { new VerifySendParameter("Code", code) });


            var newSms = new Sms
            {
                Cost = data.Data.Cost,
                MessageId = data.Data.MessageId,
                Message = data.Message,
                Status = data.Status,
                Sender = mobile
            };

            try
            {
                _context.Sms.Add(newSms);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                _ = e;
            }
            return data;
        }
        public bool IsValidPhone(string Phone)
        {
            if (string.IsNullOrEmpty(Phone))
                return false;
            var r = new Regex(@"^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$");
            return r.IsMatch(Phone);
        }
        public string NormalizePhone(string phone)
        {
            if (string.IsNullOrEmpty(phone))
                return null;

            var r = new Regex(@"^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$");
            var match = r.Match(phone);

            if (match.Success)
            {
                // Extract the 11-digit phone number
                string phoneNumber = match.Groups[1].Value;

                // Normalize the phone number to the format "+9890000000"
                phoneNumber = "+989" + phoneNumber.Substring(1);

                return phoneNumber;
            }
            else
            {
                // The phone number is not valid
                return null;
            }
        }
    }
}
