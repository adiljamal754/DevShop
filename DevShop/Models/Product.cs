namespace DevShop.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string description { get; set; }
        public string catefory { get; set; }
        public string picUrl { get; set; }
        public bool inPromotion { get; set; }
        public bool inStock { get; set; }
        public int quantityStock { get; set; }
    }
}
