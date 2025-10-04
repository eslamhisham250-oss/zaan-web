import dbConnect from "../../lib/dbConnect";
import Product from "../../models/Product";

export default async function handler(req, res) {
  await dbConnect();

  try {
    await Product.deleteMany(); // يمسح القديم
    await Product.insertMany([
      {
        title: "سرير خشب طبيعي مع تخزين",
        description: "سرير خشبي أنيق مصنوع من خشب طبيعي عالي الجودة مع وحدة تخزين سفلية.",
        price: 2500,
        oldPrice: 3000,
        images: [
          "/images/bed_real.jpg",
          "/images/bed_real_side.jpg",
          "/images/bed_real_size.jpg"
        ],
        category: "غرف نوم",
        material: "خشب طبيعي + MDF",
        color: "بني غامق",
        size: "200x160 سم",
        rating: 4.6,
        reviews: 180,
        shipping: "يصل خلال 7 أيام - شحن مجاني",
        returnPolicy: "إرجاع مجاني خلال 14 يوم",
        warranty: "ضمان سنتين على الخشب والتجميع",
        colors: ["#8B4513", "#444", "#D2B48C"]
      },
      {
        title: "مكتب عملي مودرن",
        description: "مكتب خشبي مودرن مناسب للعمل أو الدراسة، تصميم أنيق ومساحة واسعة.",
        price: 1200,
        oldPrice: 1600,
        images: ["/images/desk_real.jpg"],
        category: "مكاتب",
        material: "MDF",
        color: "أبيض",
        size: "140x70 سم",
        rating: 4.2,
        reviews: 95,
        shipping: "يصل خلال 5 أيام - شحن داخلي",
        returnPolicy: "إرجاع خلال 7 أيام",
        warranty: "ضمان سنة",
        colors: ["#FFFFFF", "#000000"]
      },
      {
        title: "كرسي مريح",
        description: "كرسي خشبي مع وسادة مريحة مثالي لغرفة المعيشة أو المكاتب.",
        price: 750,
        images: ["/images/chair_real.jpg"],
        category: "كراسي",
        material: "خشب زان",
        color: "رمادي",
        size: "45x45x90 سم",
        rating: 4.5,
        reviews: 120,
        shipping: "توصيل خلال 3 أيام",
        returnPolicy: "إرجاع خلال 14 يوم",
        warranty: "6 شهور",
        colors: ["#808080", "#000000"]
      }
    ]);

    res.status(200).json({ message: "✅ تم إدخال المنتجات بنجاح" });
  } catch (err) {
    res.status(500).json({ error: "❌ حدث خطأ أثناء إدخال البيانات" });
  }
}
