using DevShop.Models;
using DevShop.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;

namespace DevShop.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly SMSService _SMSService;
        private readonly UserService _userService;

        //Api
        private readonly string endpoint = "https://localhost:7200/api/Products";
        private readonly HttpClient client = null;

        

        public HomeController(ILogger<HomeController> logger, SMSService sMSService, UserService userService)
        {
            _logger = logger;
            _SMSService = sMSService;
            _userService = userService;

            client = new HttpClient();
            client.BaseAddress = new Uri(endpoint);
        }


        public async Task<IActionResult> Index()
        {
            try
            {
                List<Product> products = null;

                var response = await client.GetAsync(endpoint);


                if (response.IsSuccessStatusCode)
                {
                    var jsonString = await response.Content.ReadAsStringAsync();

                    //converte o json q recebe da abi e converte em um objeto
                    products = JsonConvert.DeserializeObject<List<Product>>(jsonString);

                }
                else
                {
                    ModelState.AddModelError(null, "Erro");
                }
                return View(products);
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                throw ex;
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult SignUp(User user)
        {
          _userService.AddUser(user);
          _SMSService.sendSMS(user.Contact, user.Username);
            return RedirectToAction(nameof(Index));
            // View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}