using System.Net.Http.Headers;

namespace Lab2.Models
{
    public class Category
    {
        public Category()
        {
            Product = new HashSet<Product>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Product> Product { get; set; }
    }
}
