const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting DB seed...');

  const categories = [
    { name: 'Electronics', description: 'Gadgets, devices and accessories' },
    { name: 'Home & Kitchen', description: 'Household items and kitchenware' },
    { name: 'Books', description: 'Fiction, non-fiction and educational' },
    { name: 'Apparel', description: 'Clothing and accessories' },
  ];

  const createdCategories = {};
  for (const c of categories) {
    const cat = await prisma.category.upsert({
      where: { name: c.name },
      update: { description: c.description },
      create: { name: c.name, description: c.description },
    });
    createdCategories[c.name] = cat;
    console.log('Ensured category:', cat.name);
  }

  const products = [
    {
      title: 'Wireless Bluetooth Headphones',
      description: 'Over-ear comfortable headphones with active noise cancellation and long battery life.',
      sku: 'ELEC-HEAD-001',
      price: '89.99',
      currency: 'USD',
      category: 'Electronics',
      imageUrl: 'https://i.ibb.co.com/KpmwMzML/90f8ff84c54f9e2844761a865ec290e8-png-720x720q80.png',
    },
    {
      title: 'Stainless Steel Cookware Set',
      description: '10-piece durable stainless steel cookware set for all your cooking needs.',
      sku: 'HOME-COOK-010',
      price: '129.95',
      currency: 'USD',
      category: 'Home & Kitchen',
      imageUrl: 'https://i.ibb.co.com/fd5VcMGL/images.jpg',
    },
    {
      title: 'Modern Minimalist T-Shirt',
      description: 'Soft cotton t-shirt with a tailored fit available in multiple colors.',
      sku: 'APP-TSHIRT-002',
      price: '24.50',
      currency: 'USD',
      category: 'Apparel',
      imageUrl: 'https://i.ibb.co.com/hRVpD6x7/images.jpg',
    },
    {
      title: 'The Practical Programmer',
      description: 'Book covering pragmatic techniques and tools for modern software development.',
      sku: 'BOOK-PRAC-101',
      price: '34.00',
      currency: 'USD',
      category: 'Books',
      imageUrl: 'https://i.ibb.co.com/Xfjcr5xK/images.jpg',
    },
    {
      title: 'Portable Charger 10000mAh',
      description: 'Compact power bank with fast-charging support and dual USB ports.',
      sku: 'ELEC-PB-100',
      price: '29.99',
      currency: 'USD',
      category: 'Electronics',
      imageUrl: 'https://i.ibb.co.com/9mqmM0Mg/images.jpg',
    },
  ];

  let created = 0;
  for (const p of products) {
    // ensure category exists
    const category = createdCategories[p.category];
    if (!category) {
      console.warn('Category not found for product, skipping:', p.title);
      continue;
    }

    const prod = await prisma.product.upsert({
      where: { sku: p.sku },
      update: {
        title: p.title,
        description: p.description,
        price: new Prisma.Decimal(p.price),
        currency: p.currency,
        category: { connect: { id: category.id } },
      },
      create: {
        title: p.title,
        description: p.description,
        sku: p.sku,
        price: new Prisma.Decimal(p.price),
        currency: p.currency,
        category: { connect: { id: category.id } },
        // schema doesn't include imageUrl; keep product fields compatible with schema
      },
    });
    console.log('Upserted product:', prod.title);
    created++;
  }

  console.log(`Seed complete. Products upserted: ${created}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
