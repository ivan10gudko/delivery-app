import { Pool } from 'pg';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: true });
const adapter = new PrismaPg(pool);
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
      // --- MC DONNY (15 items for testing scroll) ---
      { name: 'Big Big Burger', price: 15.5, shopId: mcDonny.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/burger,1' },
      { name: 'Small Big Burger', price: 10.0, shopId: mcDonny.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/burger,2' },
      { name: 'Cola Zero', price: 2.5, shopId: mcDonny.id, categoryId: catDrinks.id, image: 'https://loremflickr.com/400/400/soda,1' },
      { name: 'Apple Pie', price: 4.0, shopId: mcDonny.id, categoryId: catDesserts.id, image: 'https://loremflickr.com/400/400/pie,1' },
      { name: 'Cheeseburger', price: 8.5, shopId: mcDonny.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/burger,3' },
      { name: 'Double Cheese', price: 12.0, shopId: mcDonny.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/burger,4' },
      { name: 'Chicken Burger', price: 11.0, shopId: mcDonny.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/burger,5' },
      { name: 'Fish Filet', price: 13.5, shopId: mcDonny.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/burger,6' },
      { name: 'French Fries S', price: 3.0, shopId: mcDonny.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/fries,1' },
      { name: 'French Fries L', price: 5.0, shopId: mcDonny.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/fries,2' },
      { name: 'McNuggets 6pcs', price: 7.5, shopId: mcDonny.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/nuggets,1' },
      { name: 'McNuggets 12pcs', price: 13.0, shopId: mcDonny.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/nuggets,2' },
      { name: 'Orange Soda', price: 2.5, shopId: mcDonny.id, categoryId: catDrinks.id, image: 'https://loremflickr.com/400/400/soda,2' },
      { name: 'Vanilla Shake', price: 6.5, shopId: mcDonny.id, categoryId: catDesserts.id, image: 'https://loremflickr.com/400/400/shake,1' },
      { name: 'Choco Muffin', price: 4.5, shopId: mcDonny.id, categoryId: catDesserts.id, image: 'https://loremflickr.com/400/400/muffin,1' },

      // --- CFK (13 items) ---
      { name: 'Chicken Bucket', price: 20.0, shopId: cfk.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/friedchicken,1' },
      { name: 'Spicy Wings 5pcs', price: 9.0, shopId: cfk.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/chickenwings,1' },
      { name: 'Spicy Wings 10pcs', price: 17.0, shopId: cfk.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/chickenwings,2' },
      { name: 'Orange Juice', price: 3.5, shopId: cfk.id, categoryId: catDrinks.id, image: 'https://loremflickr.com/400/400/juice,1' },
      { name: 'Ice Cream', price: 5.5, shopId: cfk.id, categoryId: catDesserts.id, image: 'https://loremflickr.com/400/400/icecream,1' },
      { name: 'Zinger Burger', price: 12.5, shopId: cfk.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/burger,kfc1' },
      { name: 'Twister Wrap', price: 10.5, shopId: cfk.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/wrap,1' },
      { name: 'Coleslaw Salad', price: 4.5, shopId: cfk.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/salad,1' },
      { name: 'Box Master', price: 15.0, shopId: cfk.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/burger,kfc2' },
      { name: 'Popcorn Chicken', price: 8.0, shopId: cfk.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/chicken,1' },
      { name: 'Gravy Sauce', price: 1.5, shopId: cfk.id, categoryId: catBurgers.id, image: 'https://loremflickr.com/400/400/sauce,1' },
      { name: 'Pepsi 0.5', price: 2.5, shopId: cfk.id, categoryId: catDrinks.id, image: 'https://loremflickr.com/400/400/pepsi,1' },
      { name: 'Donut Choco', price: 3.5, shopId: cfk.id, categoryId: catDesserts.id, image: 'https://loremflickr.com/400/400/donut,1' },

      // --- Pizza Hub ---
      { name: 'Margherita Pizza', price: 18.0, shopId: pizzaHub.id, categoryId: catPizza.id, image: 'https://loremflickr.com/400/400/pizza,1' },
      { name: 'Pepperoni Supreme', price: 22.5, shopId: pizzaHub.id, categoryId: catPizza.id, image: 'https://loremflickr.com/400/400/pizza,2' },
      { name: 'Hawaiian Pizza', price: 19.0, shopId: pizzaHub.id, categoryId: catPizza.id, image: 'https://loremflickr.com/400/400/pizza,3' },
      { name: 'BBQ Chicken Pizza', price: 21.0, shopId: pizzaHub.id, categoryId: catPizza.id, image: 'https://loremflickr.com/400/400/pizza,4' },
      { name: 'Sprite 0.5L', price: 2.5, shopId: pizzaHub.id, categoryId: catDrinks.id, image: 'https://loremflickr.com/400/400/sprite,1' },

      // --- Sushi Master ---
      { name: 'California Roll', price: 14.0, shopId: sushiMaster.id, categoryId: catSushi.id, image: 'https://loremflickr.com/400/400/sushi,1' },
      { name: 'Philadelphia Roll', price: 17.5, shopId: sushiMaster.id, categoryId: catSushi.id, image: 'https://loremflickr.com/400/400/sushi,2' },
      { name: 'Dragon Roll', price: 22.0, shopId: sushiMaster.id, categoryId: catSushi.id, image: 'https://loremflickr.com/400/400/sushi,3' },
      { name: 'Miso Soup', price: 6.0, shopId: sushiMaster.id, categoryId: catSushi.id, image: 'https://loremflickr.com/400/400/soup,1' },
      { name: 'Green Tea', price: 3.0, shopId: sushiMaster.id, categoryId: catDrinks.id, image: 'https://loremflickr.com/400/400/tea,1' },
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