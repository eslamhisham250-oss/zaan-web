import { connectDB } from "../../../lib/db";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ success: false, message: "Disabled in production" });
  }

  const conn = await connectDB();
  if (!conn) return res.status(503).json({ success: false, message: "DB unavailable" });

  const sample = [
    {
      title: "سرير خشب طبيعي مع تخزين",
      short: "سرير عملي بخامة قوية + ضمان",
      price: 2500,
      oldPrice: 3000,
      image: "/images/bed_real.jpg",
      category: "غرف نوم",
    },
    { title: "مكتب عملي", short: "مكتب مع درج", price: 1200, image: "/images/desk_real.jpg", category: "مكاتب" },
    { title: "طاولة قهوة", short: "تصميم مودرن", price: 600, image: "/images/coffee_table_real.jpg", category: "طاولات" },
  ];

  await Product.deleteMany({});
  const created = await Product.insertMany(sample);

  res.json({ success: true, created });
}
