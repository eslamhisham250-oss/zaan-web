// lib/mailer.js
import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html }) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true لو هتستخدم port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"ZAAN Store" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
    return { success: true };
  } catch (err) {
    console.error("❌ Email error:", err);
    return { success: false, error: err.message };
  }
}
