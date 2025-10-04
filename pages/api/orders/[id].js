// pages/api/orders/[id].js
import { dbConnect } from "../../../lib/mongodb";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query; // ده orderId البشري (ORD-XXXX)، مش _id

  if (req.method === "GET") {
    try {
      const order = await Order.findOne({ orderId: id });
      if (!order) return res.status(404).json({ success: false, message: "Not found" });
      return res.status(200).json({ success: true, order });
    } catch (e) {
      return res.status(500).json({ success: false, message: "Fetch error" });
    }
  }

  if (req.method === "PATCH") {
    try {
      const { status, paymentStatus, paymentReference } = req.body || {};
      const update = {};

      if (status) update.status = status;
      if (paymentStatus) update["payment.status"] = paymentStatus;
      if (paymentReference) update["payment.reference"] = paymentReference;
      update.updatedAt = new Date();

      const order = await Order.findOneAndUpdate({ orderId: id }, { $set: update }, { new: true });
      if (!order) return res.status(404).json({ success: false, message: "Not found" });

      return res.status(200).json({ success: true, order });
    } catch (e) {
      return res.status(400).json({ success: false, message: "Update error" });
    }
  }

  return res.status(405).json({ success: false, message: "Method Not Allowed" });
}
