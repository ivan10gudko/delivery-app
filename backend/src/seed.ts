import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Очищення бази перед посівом (опціонально)
  await prisma.orderItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.shop.deleteMany();

  // 2. Створення категорій (Middle Level) [cite: 89]
  const burgerCat = await prisma.category.create({ data: { name: 'Burgers' } });
  const drinkCat = await prisma.category.create({ data: { name: 'Drinks' } });

  // 3. Створення магазинів із рейтингом [cite: 104]
  const mcDonny = await prisma.shop.create({
    data: { name: 'Mc Donny', rating: 4.8 }
  });
  const cfk = await prisma.shop.create({
    data: { name: 'CFK', rating: 4.2 }
  });

  // 4. Додавання товарів (Base Level) [cite: 52]
  await prisma.product.createMany({
    data: [
      { name: 'Big Big Burger', price: 15.5, shopId: mcDonny.id, categoryId: burgerCat.id },
      { name: 'Small Big Burger', price: 10.0, shopId: mcDonny.id, categoryId: burgerCat.id },
      { name: 'Cola', price: 2.5, shopId: mcDonny.id, categoryId: drinkCat.id },
      { name: 'Chicken Bucket', price: 20.0, shopId: cfk.id, categoryId: burgerCat.id },
    ]
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });