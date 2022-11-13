using DevShop.Models;
using DevShop.Services;
using Microsoft.AspNetCore.Mvc;

namespace DevShop.Controllers
{
    public class UsersController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly SMSService _SMSService;
        private readonly UserService _userService;


        public UsersController(ILogger<HomeController> logger, SMSService sMSService, UserService userService)
        {
            _logger = logger;
            _SMSService = sMSService;
            _userService = userService;

        }


        public IActionResult Login()
        {
            return View();
        }
        public IActionResult SignUp()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult SignUp(User user)
        {
            _userService.AddUser(user);
            _SMSService.sendSMS(user.Contact, user.Username);
            return RedirectToAction("Index", "Home");
            // View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View();
        }
    }
}
