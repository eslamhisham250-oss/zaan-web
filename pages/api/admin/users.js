import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "PUT") {
    try {
      const { id, role } = req.body;
      const updated = await User.findByIdAndUpdate(id, { role }, { new: true });
      return res.status(200).json(updated);
    } catch {
      return res.status(400).json({ error: "❌ خطأ في تعديل الدور" });
    }
  }

  res.status(405).json({ error: "❌ الطريقة غير مسموحة" });
}
