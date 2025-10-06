// lib/mailer.js
import nodemailer from "nodemailer";

export default async function sendEmail({ to, subject, html }) {
  try {
    // 🧩 إعداد النقل (Transport)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
      secure: false, // ✅ خليها false لأننا بنستخدم TLS على بورت 587
      auth: {
        user: process.env.SMTP_USER, // الإيميل الرسمي
        pass: process.env.SMTP_PASS, // الـ App Password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 📩 إعداد الرسالة
    const mailOptions = {
      from: process.env.EMAIL_FROM || `"ZAAN" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    };

    // 🚀 إرسال الإيميل فعليًا
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${info.messageId}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, error };
  }
}
