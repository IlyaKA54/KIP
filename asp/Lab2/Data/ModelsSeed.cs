using Microsoft.Extensions.Hosting;
using System.Reflection.Metadata;

namespace Lab2.Models
{
    public static class ModelsSeed
    {
        public static async Task SeedAsync(ModelsContext context)
        {
            try
            {
                context.Database.EnsureCreated();

                if (context.Category.Any())
                {
                    return;
                }
                var categories = new Category[]
                {
                    new Category{Name = "Мотоциклы"},
                    new Category{Name = "Запчасти"},
                    new Category{Name = "Мотоэкипирвока"}
                };
                foreach (Category b in categories)
                {
                    context.Category.Add(b);
                }
                await context.SaveChangesAsync();
                var products = new Product[]
                {
                    new Product {Name = "Кожаная курткка", Description = "Куртка из натуральной кожи", Price = 25000, Quantity = 20, CategoryId = 3},
                    new Product {Name = "Kawasaki Z-750", Description = "Японский мотоцикл, 72 л.с. 2 цилиндпа, объем 750 см3", Price = 450000, Quantity = 3, CategoryId = 1},
                    new Product {Name = "Клапан", Description = "5ST-E243434-00-00", Price = 1500, Quantity = 37, CategoryId = 2},
                };
                foreach (Product p in products)
                {
                    context.Product.Add(p);
                }
                await context.SaveChangesAsync();

            }
            catch
            {
                throw;
            }
        }
    }
}