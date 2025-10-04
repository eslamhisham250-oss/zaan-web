// models/Notification.js
import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: false }, // ID العميل أو الأدمن
    title: { type: String, required: true }, // عنوان قصير
    message: { type: String, required: true }, // نص الإشعار
    type: { type: String, enum: ["order", "system"], default: "order" },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
