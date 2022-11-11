using DevShop.Data;
using DevShop.Models;

namespace DevShop.Services
{
    public class UserService
    {
        private readonly DevShopContext _context;

        public UserService(DevShopContext context)
        {
            _context = context;
        }

        public List<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        public void AddUser(User user)
        {
            _context.Add(user);
            _context.SaveChanges();
        }

    }
}
