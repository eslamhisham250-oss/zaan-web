import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  await dbConnect();

  // عرض كل المنتجات
  if (req.method === "GET") {
    try {
      const products = await Product.find();
      return res.status(200).json(products);
    } catch {
      return res.status(500).json({ error: "❌ فشل تحميل المنتجات" });
    }
  }

  // إضافة منتج جديد
  if (req.method === "POST") {
    try {
      const product = await Product.create(req.body);
      return res.status(201).json(product);
    } catch {
      return res.status(400).json({ error: "❌ خطأ في إنشاء المنتج" });
    }
  }

  // تعديل/حذف منتج (باستخدام id)
  if (req.method === "PUT") {
    try {
      const { id, ...update } = req.body;
      const updated = await Product.findByIdAndUpdate(id, update, { new: true });
      return res.status(200).json(updated);
    } catch {
      return res.status(400).json({ error: "❌ خطأ في تعديل المنتج" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      await Product.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    } catch {
      return res.status(400).json({ error: "❌ خطأ في حذف المنتج" });
    }
  }

  res.status(405).json({ error: "❌ الطريقة غير مسموحة" });
}
