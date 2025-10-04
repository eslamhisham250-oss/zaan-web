// models/Order.js
import mongoose, { Schema } from "mongoose";

const OrderItemSchema = new Schema(
  {
    productId: { type: String },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, default: 1 },
    image: { type: String },
    options: { type: Schema.Types.Mixed }, // لو في ألوان/مقاسات…الخ
  },
  { _id: false }
);

const CustomerSchema = new Schema(
  {
    name: String,
    phone: String,
    email: String,
    address: String,
    note: String,
  },
  { _id: false }
);

const PaymentSchema = new Schema(
  {
    method: { type: String, enum: ["cod", "card", "wallet", "installments"], required: true },
    provider: { type: String },       // مثال: Paymob/Card/ValU/Contact…
    reference: { type: String },      // رقم عملية/Transaction ID
    status: { type: String, default: "pending" }, // pending|paid|failed|refunded
    upfront: { type: Number, default: 0 },        // للمصانع/النجارين
    plan: { type: String },           // نص يشرح الخطة
    meta: { type: Schema.Types.Mixed }
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    orderId: { type: String, unique: true, index: true }, // كود بشري بسيط
    orderType: { type: String, enum: ["ready", "carpenter", "factory"], default: "ready", index: true },
    items: { type: [OrderItemSchema], default: [] },
    subtotal: { type: Number, required: true, default: 0 },
    shipping: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 },

    customer: CustomerSchema,
    payment: PaymentSchema,

    status: {
      type: String,
      enum: ["pending", "paid", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
      index: true
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

OrderSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  if (!this.orderId) {
    // مثال بسيط لتوليد كود طلب
    const short = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.orderId = `ORD-${short}`;
  }
  next();
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
