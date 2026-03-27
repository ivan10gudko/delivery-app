import { Pool } from 'pg';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: true });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Cleaning database...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.shop.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.coupon.deleteMany();

  console.log('Seeding categories...');
  const catBurgers = await prisma.category.create({ data: { name: 'Burgers' } });
  const catPizza = await prisma.category.create({ data: { name: 'Pizza' } });
  const catDrinks = await prisma.category.create({ data: { name: 'Drinks' } });
  const catDesserts = await prisma.category.create({ data: { name: 'Desserts' } });
  const catSushi = await prisma.category.create({ data: { name: 'Sushi' } });

  console.log('Seeding shops...');
  const mcDonny = await prisma.shop.create({ data: { name: 'Mc Donny', rating: 4.8 } });
  const cfk = await prisma.shop.create({ data: { name: 'CFK', rating: 4.2 } });
  const pizzaHub = await prisma.shop.create({ data: { name: 'Pizza Hub', rating: 4.5 } });
  const sushiMaster = await prisma.shop.create({ data: { name: 'Sushi Master', rating: 4.9 } });

  console.log('Seeding coupons...');
  await prisma.coupon.createMany({
    data: [
      { code: 'SAVE10', discountPercent: 10 },
      { code: 'BIGSALE20', discountPercent: 20 },
      { code: 'WELCOME5', discountPercent: 5 },
      { code: 'FREEFOOD', discountPercent: 15 },
    ]
  });

  console.log('Seeding products with');
  await prisma.product.createMany({
    data: [
      // Mc Donny
      { name: 'Big Big Burger', price: 15.5, shopId: mcDonny.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/burger,product' },
      { name: 'Small Big Burger', price: 10.0, shopId: mcDonny.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/cheeseburger' },
      { name: 'Cola Zero', price: 2.5, shopId: mcDonny.id, categoryId: catDrinks.id, image: 'https://loremflickr.com/400/400/soda,drink' },
      { name: 'Apple Pie', price: 4.0, shopId: mcDonny.id, categoryId: catDesserts.id, image: 'https://loremflickr.com/400/400/pie,dessert' },
      { name: 'Cheeseburger', price: 8.5, shopId: mcDonny.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/burger' },

      // CFK
      { name: 'Chicken Bucket', price: 20.0, shopId: cfk.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/friedchicken' },
      { name: 'Spicy Wings', price: 12.0, shopId: cfk.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/chickenwings' },
      { name: 'Orange Juice', price: 3.5, shopId: cfk.id, categoryId: catDrinks.id, image: 'https://loremflickr.com/400/400/juice' },
      { name: 'Ice Cream', price: 5.5, shopId: cfk.id, categoryId: catDesserts.id, image: 'https://loremflickr.com/400/400/icecream' },

      // Pizza Hub
      { name: 'Margherita Pizza', price: 18.0, shopId: pizzaHub.id, categoryId: catPizza.id, image: 'https://loremflickr.com/400/400/pizza,margherita' },
      { name: 'Pepperoni Supreme', price: 22.5, shopId: pizzaHub.id, categoryId: catPizza.id, image: 'https://loremflickr.com/400/400/pepperoni,pizza' },
      { name: 'Hawaiian Pizza', price: 19.0, shopId: pizzaHub.id, categoryId: catPizza.id, image: 'https://loremflickr.com/400/400/hawaiian,pizza' },
      { name: 'Sprite 0.5L', price: 2.5, shopId: pizzaHub.id, categoryId: catDrinks.id, image: 'https://loremflickr.com/400/400/sprite,drink' },

      // Sushi Master
      { name: 'California Roll', price: 14.0, shopId: sushiMaster.id, categoryId: catSushi.id, image: 'https://loremflickr.com/400/400/sushi,roll' },
      { name: 'Philadelphia Roll', price: 17.5, shopId: sushiMaster.id, categoryId: catSushi.id, image: 'https://loremflickr.com/400/400/sushi' },
      { name: 'Miso Soup', price: 6.0, shopId: sushiMaster.id, categoryId: catSushi.id, image: 'https://loremflickr.com/400/400/misosoup' },
      { name: 'Green Tea', price: 3.0, shopId: sushiMaster.id, categoryId: catDrinks.id, image: 'https://loremflickr.com/400/400/greentea' },
    ]
  });

  console.log('Seed completed successfully with images!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });