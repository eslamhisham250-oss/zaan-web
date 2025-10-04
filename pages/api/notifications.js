// pages/api/notifications.js
import dbConnect from "../../lib/mongodb";
import Notification from "../../models/Notification";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const { userId } = req.query;
      const filter = userId ? { userId } : {};
      const notifs = await Notification.find(filter)
        .sort({ createdAt: -1 })
        .limit(50);
      return res.status(200).json({ success: true, notifications: notifs });
    } catch (e) {
      return res.status(500).json({ success: false, message: "Fetch error" });
    }
  }

  if (req.method === "POST") {
    try {
      const payload = req.body;
      const created = await Notification.create(payload);
      return res.status(201).json({ success: true, notification: created });
    } catch (e) {
      return res.status(400).json({ success: false, message: "Create error" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { id } = req.body;
      const updated = await Notification.findByIdAndUpdate(
        id,
        { read: true },
        { new: true }
      );
      return res.status(200).json({ success: true, notification: updated });
    } catch (e) {
      return res.status(400).json({ success: false, message: "Update error" });
    }
  }

  return res.status(405).json({ success: false, message: "Method Not Allowed" });
}
