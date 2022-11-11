using DevShop.Models;
using Microsoft.EntityFrameworkCore;

namespace DevShop.Data
{
    public class DevShopContext : DbContext
    {
        public DevShopContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; } 
    }
}
