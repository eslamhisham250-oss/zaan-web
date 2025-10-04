// pages/api/products.js
import { connectDB } from "../../lib/db";
import Product from "../../models/Product";

const fallbackProducts = [
  {
    title: "سرير خشب طبيعي مع تخزين",
    short: "سرير عملي بخامة قوية + ضمان",
    price: 2500,
    oldPrice: 3000,
    image: "/images/bed_real.jpg",
    images: ["/images/bed_real.jpg", "/images/bed_real_side.jpg", "/images/bed_real_size.jpg"],
    description: "سرير خشبي أنيق مصنوع من خشب طبيعي عالي الجودة مع وحدة تخزين سفلية.",
    material: "خشب طبيعي + MDF",
    color: "بني غامق",
    size: "200x160 سم",
    rating: 4.6,
    reviews: 180,
    shipping: "يصل خلال 7 أيام - شحن مجاني",
    returnPolicy: "إرجاع مجاني خلال 14 يوم",
    warranty: "ضمان سنتين على الخشب والتجميع",
    colors: ["#8B4513", "#444", "#D2B48C"],
    category: "غرف نوم",
  },
  {
    title: "مكتب عملي",
    short: "مكتب خشبي قوي مع درج",
    price: 1200,
    image: "/images/desk_real.jpg",
    category: "مكاتب",
  },
  {
    title: "طاولة قهوة",
    short: "تصميم مودرن",
    price: 600,
    image: "/images/coffee_table_real.jpg",
    category: "طاولات",
  },
];

export default async function handler(req, res) {
  // جرّب تتصل بالـ DB
  const conn = await connectDB();

  // POST → إنشاء (للسيد/الإدارة)
  if (req.method === "POST") {
    try {
      if (!conn) return res.status(503).json({ success: false, message: "DB unavailable" });
      const body = req.body;
      const created = await Product.create(body);
      return res.json({ success: true, product: created });
    } catch (e) {
      console.error("POST /products error:", e);
      return res.status(500).json({ success: false, message: "Failed to create product" });
    }
  }

  // GET → قراءة
  try {
    if (!conn) {
      return res.json(fallbackProducts.map((p, i) => ({ id: String(i + 1), ...p })));
    }
    const docs = await Product.find({}).sort({ createdAt: -1 }).lean();
    if (!docs?.length) {
      // لسه فاضي → رجع Fallback
      return res.json(fallbackProducts.map((p, i) => ({ id: String(i + 1), ...p })));
    }
    // طبع id كـ string
    const withId = docs.map((d) => ({ id: String(d._id), ...d }));
    return res.json(withId);
  } catch (e) {
    console.error("GET /products error:", e);
    return res.json(fallbackProducts.map((p, i) => ({ id: String(i + 1), ...p })));
  }
}
