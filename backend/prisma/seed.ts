import { Pool } from 'pg';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: true });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const getFoodImg = (tags: string, id: number) => 
  `https://loremflickr.com/400/400/${tags},product?lock=${id}`;

async function main() {
  console.log('Cleaning database...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.shop.deleteMany();
  await prisma.coupon.deleteMany();

  console.log(' Seeding categories...');
  const catBurgers = await prisma.category.create({ data: { name: 'Burgers' } });
  const catPizza = await prisma.category.create({ data: { name: 'Pizza' } });
  const catDrinks = await prisma.category.create({ data: { name: 'Drinks' } });
  const catDesserts = await prisma.category.create({ data: { name: 'Desserts' } });
  const catSushi = await prisma.category.create({ data: { name: 'Sushi' } });

  console.log(' Seeding shops...');
  const mcDonny = await prisma.shop.create({ data: { name: 'Mc Donny', rating: 4.8 } });
  const cfk = await prisma.shop.create({ data: { name: 'CFK', rating: 3.8 } });
  const pizzaHub = await prisma.shop.create({ data: { name: 'Pizza Hub', rating: 2.5 } });
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

  console.log('Products generating');

  const products = [
    { 
        name: 'Classic Double Burger', price: 12.99, shopId: mcDonny.id, categoryId: catBurgers.id, 
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80' 
    },
    { 
        name: 'Crispy Bacon Burger', price: 14.50, shopId: mcDonny.id, categoryId: catBurgers.id, 
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=400&q=80' 
    },
    { 
        name: 'Golden French Fries', price: 4.20, shopId: mcDonny.id, categoryId: catBurgers.id, 
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80' 
    },
    { 
        name: 'Caramel Glazed Donut', price: 3.80, shopId: mcDonny.id, categoryId: catDesserts.id, 
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80' 
    },

    { 
        name: 'Spicy Chicken Wings', price: 15.00, shopId: cfk.id, categoryId: catBurgers.id, 
        image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=400&q=80' 
    },
    { 
        name: 'Crunchy Chicken Strips', price: 11.20, shopId: cfk.id, categoryId: catBurgers.id, 
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80' 
    },
    { 
        name: 'Fresh Caesar Salad', price: 9.50, shopId: cfk.id, categoryId: catBurgers.id, 
        image: 'https://cookieandkate.com/images/2021/05/caesar-salad-in-bowl.jpg' 
    },

    { 
        name: 'Pepperoni Feast', price: 19.90, shopId: pizzaHub.id, categoryId: catPizza.id, 
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80' 
    },
    { 
        name: 'Four Cheese Special', price: 21.00, shopId: pizzaHub.id, categoryId: catPizza.id, 
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80' 
    },
    { 
        name: 'BBQ Chicken Pizza', price: 22.50, shopId: pizzaHub.id, categoryId: catPizza.id, 
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80' 
    },

    { 
        name: 'Premium Philadelphia', price: 18.00, shopId: sushiMaster.id, categoryId: catSushi.id, 
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80' 
    },
    { 
        name: 'Dragon Roll Supreme', price: 24.00, shopId: sushiMaster.id, categoryId: catSushi.id, 
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=400&q=80' 
    },
    { 
        name: 'Salmon Nigiri Set', price: 14.50, shopId: sushiMaster.id, categoryId: catSushi.id, 
        image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=400&q=80&h=400' 
    }
  ];

  for (let i = 1; i <= 25; i++) {
    products.push({
      name: `Chef Special Burger #${i}`,
      price: parseFloat((Math.random() * 10 + 10).toFixed(2)),
      shopId: mcDonny.id,
      categoryId: catBurgers.id,
      image: `https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80`
    });
  }

  await prisma.product.createMany({ data: products });

  console.log(' Seed finished! ');
}

main()
  .catch((e) => {
    console.error(' Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });