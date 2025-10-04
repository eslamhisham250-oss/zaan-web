// pages/api/paymob-webhook.js
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const secret = process.env.PAYMOB_HMAC_SECRET; // هتاخده من حساب PayMob
    const body = req.body;

    // 🛡️ تحقق من التوقيع (HMAC)
    const fields = [
      "amount_cents", "created_at", "currency", "error_occured",
      "has_parent_transaction", "id", "integration_id", "is_3d_secure",
      "is_auth", "is_capture", "is_refunded", "is_standalone_payment",
      "is_voided", "order.id", "owner", "pending", "source_data.pan",
      "source_data.sub_type", "source_data.type", "success"
    ];

    const concat = fields.map(f => {
      const keys = f.split(".");
      let val = body;
      for (const k of keys) {
        val = val?.[k];
      }
      return val ?? "";
    }).join("");

    const hmac = crypto.createHmac("sha512", secret)
      .update(concat)
      .digest("hex");

    if (hmac !== body.hmac) {
      console.warn("⚠️ HMAC not valid");
      return res.status(403).json({ success: false, message: "Invalid signature" });
    }

    // ✅ العملية ناجحة
    if (body.success) {
      // هنا تسجل العملية في DB
      console.log("✅ Payment Success:", {
        orderId: body.order?.id,
        txnId: body.id,
        amount: body.amount_cents / 100,
        method: body.source_data?.type,
      });

      // مثال: تحدث حالة الطلب في قاعدة البيانات
      // await db.collection("orders").updateOne({ orderId: body.order.id }, { $set: { status: "paid" } });
    } else {
      console.log("❌ Payment Failed:", body);
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Webhook Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
