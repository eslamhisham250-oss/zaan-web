// pages/api/test-email.js
import sendEmail from "../../lib/mailer";

export default async function handler(req, res) {
  try {
    await sendEmail({
      to: "zaan.shop.2026@gmail.com", // ✅ اكتب الإيميل اللي عايز توصله الرسالة
      subject: "🚀 اختبار نظام البريد - ZAAN",
      html: `
        <h2>مرحبًا من ZAAN</h2>
        <p>تم اختبار إرسال البريد الإلكتروني بنجاح 🎉</p>
        <p>لو وصلك الإيميل ده، فكل شيء شغال تمام ✅</p>
      `,
    });

    return res.status(200).json({ success: true, message: "✅ تم إرسال الإيميل بنجاح!" });
  } catch (err) {
    console.error("Mail Error:", err);
    return res.status(500).json({ success: false, message: "❌ فشل الإرسال", error: err.message });
  }
}
