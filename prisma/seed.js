// prisma/seed.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // مسح البيانات القديمة
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // إنشاء مستخدم تجريبي
  const user = await prisma.user.create({
    data: {
      name: "Eslam Tester",
      email: "eslam@example.com",
      phone: "01000000000",
      password: "hashed_password_123", // هنا لازم يتبدل بباسورد معمول له hash فعلي
    },
  });

  // إضافة منتجات
  const products = await prisma.product.createMany({
    data: [
      {
        title: "سرير مودرن",
        short: "سرير عملي وأنيق لغرفة النوم",
        price: 2500,
        material: "خشب MDF",
        category: "أثاث نوم",
        image: "/images/bed_real.jpg",
      },
      {
        title: "كنبة L-Shape",
        short: "كنبة مريحة بلمسة عصرية",
        price: 5600,
        material: "خشب + قماش",
        category: "غرف معيشة",
        image: "/images/sofa_real.jpg",
      },
      {
        title: "ترابيزة قهوة",
        short: "ترابيزة صغيرة للمساحات الضيقة",
        price: 1200,
        material: "خشب طبيعي",
        category: "غرف معيشة",
        image: "/images/coffee_table.jpg",
      },
    ],
  });

  // إنشاء طلب تجريبي (Order)
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total: 2500,
      status: "pending",
      address: "شارع التحرير - القاهرة",
      phone: "01000000000",
      name: "Eslam Tester",
      items: {
        create: [
          {
            productId: "1", // هتتغير حسب الـ ID الفعلي للـ Product
            title: "سرير مودرن",
            price: 2500,
            qty: 1,
          },
        ],
      },
    },
  });

  console.log("✅ Database seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
