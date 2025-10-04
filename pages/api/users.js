import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const users = await User.find({}, "-password"); // من غير الباسورد
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ error: "❌ فشل تحميل المستخدمين" });
    }
  }

  if (req.method === "POST") {
    try {
      const user = await User.create(req.body);
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: "❌ خطأ في إنشاء المستخدم" });
    }
  }

  res.status(405).json({ error: "❌ الطريقة غير مسموحة" });
}
