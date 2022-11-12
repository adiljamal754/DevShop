using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace DevShop.Services
{
    public class SMSService
    {
        public void sendSMS(string tel,string username)
        {
            string accountSid = Environment.GetEnvironmentVariable("AC6a5a1fef51e6ff7e860443030e632359");
            string authToken = Environment.GetEnvironmentVariable("ce18033ec283b03ad5e44783f5880780");

            string msg = "";


            TwilioClient.Init("AC6a5a1fef51e6ff7e860443030e632359", "ce18033ec283b03ad5e44783f5880780");
            if (DateTime.Now.Hour < 12)
            {
                msg = "Bom Dia";
            } else if(DateTime.Now.Hour > 12)
            {
                msg = "Boa Tarde";
            }
            else
            {
                msg = "Boa noite";
            }
            var message = MessageResource.Create(
                    from: new Twilio.Types.PhoneNumber("+18176704689"),
                    body: msg + " " + username + "!!  A sua subscrição foi concluida com sucesso! Seja bem-vindo." ,
                    to: new Twilio.Types.PhoneNumber("+258824975011")
                );

            Console.WriteLine(message.Sid);
        }
    }
}
