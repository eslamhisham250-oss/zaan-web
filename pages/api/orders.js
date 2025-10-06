// ✅ استخدم المسارات الصحيحة بناءً على هيكل المشروع
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
      console.error("❌ Fetch orders error:", e);
      return res.status(500).json({ success: false, message: "Fetch error" });
    }
  }

  // =====================
  // ✅ تحديث حالة الطلب
  // =====================
  if (req.method === "PUT") {
    try {
      const { id, status } = req.body;
      const updated = await Order.findByIdAndUpdate(id, { status }, { new: true });

      if (updated) {
        // 🔔 إشعار في قاعدة البيانات
        await Notification.create({
          userId: updated.customer?.email || null,
          title: "تحديث حالة الطلب",
          message: `تم تغيير حالة طلبك ${updated._id} إلى: ${status}`,
          type: "order",
        });

        // ✉️ إيميل للعميل بتحديث الحالة
        if (updated.customer?.email) {
          try {
            await sendEmail({
              to: updated.customer.email,
              subject: "تحديث حالة طلبك",
              html: `
                <h2>تم تحديث حالة طلبك</h2>
                <p>رقم الطلب: <b>${updated._id}</b></p>
                <p>الحالة الجديدة: <b>${status}</b></p>
                <p>شكرًا لتعاملك مع <b>ZAAN</b>.</p>
              `,
            });
          } catch (emailError) {
            console.error("⚠️ فشل إرسال الإيميل للعميل:", emailError);
          }
        }
      }

      return res.status(200).json({ success: true, order: updated });
    } catch (e) {
      console.error("❌ Update error:", e);
      return res.status(400).json({ success: false, message: "Update error" });
    }
  }

  // =====================
  // ✅ إنشاء طلب جديد
  // =====================
  if (req.method === "POST") {
    try {
      const payload = req.body || {};
      const created = await Order.create(payload);

      // 🔔 إشعار في قاعدة البيانات
      await Notification.create({
        userId: payload.customer?.email || null,
        title: "تم استلام طلبك",
        message: `رقم طلبك ${created._id} بقيمة ${payload.computed?.total || payload.total} ج.م`,
        type: "order",
      });

      // 🔔 إشعار للأدمن
      await Notification.create({
        userId: "admin",
        title: "طلب جديد",
        message: `طلب جديد من ${payload.customer?.name || "عميل"}`,
        type: "order",
      });

      // ✉️ إيميل للعميل لتأكيد الطلب
      if (payload.customer?.email) {
        try {
          await sendEmail({
            to: payload.customer.email,
            subject: "✅ تأكيد طلبك - ZAAN",
            html: `
              <h2>شكراً لطلبك من <b>ZAAN</b></h2>
              <p>رقم الطلب: <b>${created._id}</b></p>
              <p>الإجمالي: <b>${payload.computed?.total || payload.total} ج.م</b></p>
              <p>سنقوم بالتواصل معك قريباً لتأكيد التفاصيل.</p>
              <p>📞 في حالة الاستفسار يمكنك التواصل معنا على <b>support@zaan.shop</b></p>
            `,
          });
        } catch (emailError) {
          console.error("⚠️ فشل إرسال الإيميل للعميل:", emailError);
        }
      }

      // ✉️ إيميل للأدمن
      try {
        await sendEmail({
          to: process.env.ADMIN_EMAIL || "zaan.shop.2026@gmail.com",
          subject: "📩 طلب جديد على ZAAN",
          html: `
            <h3>طلب جديد من ${payload.customer?.name || "عميل مجهول"}</h3>
            <p>رقم الهاتف: ${payload.customer?.phone}</p>
            <p>الإجمالي: ${payload.computed?.total || payload.total} ج.م</p>
            <p>📦 نوع الطلب: ${payload.orderType}</p>
          `,
        });
      } catch (adminError) {
        console.error("⚠️ فشل إرسال الإيميل للأدمن:", adminError);
      }

      return res.status(201).json({ success: true, order: created, emailSent: true });
    } catch (e) {
      console.error("❌ Create order error:", e);
      return res.status(400).json({ success: false, message: "Create error" });
    }
  }

  // أي ميثود غير GET/POST/PUT
  return res.status(405).json({ success: false, message: "Method Not Allowed" });
}
