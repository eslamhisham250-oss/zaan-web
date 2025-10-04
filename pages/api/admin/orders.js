import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, orders });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const { id, status } = req.body;
      const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
      res.status(200).json({ success: true, order });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
