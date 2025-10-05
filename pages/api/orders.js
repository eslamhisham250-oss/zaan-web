// ✅ بدل المسارات الغلط بالمسارات الصحيحة
import dbConnect from "../../lib/mongodb";
import Order from "../../models/Order";
import Notification from "../../models/Notification";
import sendEmail from "../../lib/mailer";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const { status, type, q } = req.query;
      const filter = {};
      if (status) filter.status = status;
      if (type) filter.orderType = type;
      if (q) {
        filter.$or = [
          { orderId: new RegExp(q, "i") },
          { "customer.phone": new RegExp(q, "i") },
          { "customer.name": new RegExp(q, "i") },
          { "customer.email": new RegExp(q, "i") },
        ];
      }
      const orders = await Order.find(filter).sort({ createdAt: -1 }).limit(200);
      return res.status(200).json({ success: true, orders });
    } catch (e) {
      return res.status(500).json({ success: false, message: "Fetch error" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { id, status } = req.body;
      const updated = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      // ✅ إشعار للعميل بتغيير حالة الطلب
      if (updated) {
        await Notification.create({
          userId: updated.customer?.email || null,
          title: "تحديث حالة الطلب",
          message: `تم تغيير حالة طلبك ${updated._id} إلى: ${status}`,
          type: "order",
        });

        // ✉️ إيميل للعميل بتغيير الحالة
        if (updated.customer?.email) {
          await sendEmail({
            to: updated.customer.email,
            subject: "تحديث حالة طلبك",
            html: `
              <h2>تم تحديث حالة طلبك</h2>
              <p>رقم الطلب: <b>${updated._id}</b></p>
              <p>الحالة الجديدة: <b>${status}</b></p>
            `,
          });
        }
      }

      return res.status(200).json({ success: true, order: updated });
    } catch (e) {
      return res.status(400).json({ success: false, message: "Update error" });
    }
  }

  if (req.method === "POST") {
    try {
      const payload = req.body || {};
      const created = await Order.create(payload);

      // ✅ إشعار للعميل
      await Notification.create({
        userId: payload.customer?.email || null,
        title: "تم استلام طلبك",
        message: `رقم طلبك ${created._id} بقيمة ${payload.computed?.total || payload.total} ج.م`,
        type: "order",
      });

      // ✅ إشعار للأدمن
      await Notification.create({
        userId: "admin",
        title: "طلب جديد",
        message: `طلب جديد من ${payload.customer?.name || "عميل"}`,
        type: "order",
      });

      // ✉️ إيميل للعميل
      if (payload.customer?.email) {
        await sendEmail({
          to: payload.customer.email,
          subject: "تأكيد طلبك - ZAAN",
          html: `
            <h2>شكراً لطلبك من ZAAN</h2>
            <p>رقم طلبك: <b>${created._id}</b></p>
            <p>الإجمالي: ${payload.computed?.total || payload.total} ج.م</p>
            <p>سنقوم بالتواصل معك قريباً.</p>
          `,
        });
      }

      // ✉️ إيميل للأدمن
      await sendEmail({
        to: "admin@zaan.com", // ✅ غيره لإيميل الأدمن الرسمي
        subject: "طلب جديد على ZAAN",
        html: `
          <h3>طلب جديد</h3>
          <p>العميل: ${payload.customer?.name || "عميل مجهول"}</p>
          <p>رقم الهاتف: ${payload.customer?.phone}</p>
          <p>الإجمالي: ${payload.computed?.total || payload.total} ج.م</p>
        `,
      });

      return res.status(201).json({ success: true, order: created });
    } catch (e) {
      return res.status(400).json({ success: false, message: "Create error" });
    }
  }

  return res.status(405).json({ success: false, message: "Method Not Allowed" });
}
