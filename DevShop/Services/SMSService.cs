using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace DevShop.Services
{
    public class SMSService
    {
        public void sendSMS(string tel,string username)
        {
            string msg = "";


            TwilioClient.Init("AC6a5a1fef51e6ff7e860443030e632359", "thoken");
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
