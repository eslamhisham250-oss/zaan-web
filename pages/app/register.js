// pages/app/register.js
import { useState } from "react";
import Layout from "../../components/Layout";
import { auth } from "../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📌 التسجيل بالبريد وكلمة المرور
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await updateProfile(userCredential.user, {
        displayName: form.name,
      });

      await sendEmailVerification(userCredential.user);

      setMessage("✅ تم إنشاء الحساب! برجاء التحقق من بريدك الإلكتروني.");
      setForm({ name: "", email: "", password: "", phone: "" });
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 📌 تسجيل دخول بجوجل
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setMessage("✅ تم تسجيل الدخول باستخدام Google!");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  // 📌 تسجيل دخول برقم الهاتف
  const handlePhoneLogin = async () => {
    try {
      if (!form.phone) {
        setMessage("من فضلك أدخل رقم الهاتف أولاً");
        return;
      }

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
        });
      }

      const confirmation = await signInWithPhoneNumber(auth, form.phone, window.recaptchaVerifier);
      const code = prompt("📲 من فضلك أدخل الكود الذي وصلك عبر SMS:");
      await confirmation.confirm(code);

      setMessage("✅ تم تسجيل الدخول باستخدام رقم الهاتف!");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <Layout>
      <div
        style={{
          maxWidth: 400,
          margin: "50px auto",
          padding: 20,
          border: "1px solid #eee",
          borderRadius: 8,
          background: "#fff",
        }}
      >
        <h2 style={{ marginBottom: 20, textAlign: "center" }}>تسجيل حساب جديد</h2>

        {/* 📌 التسجيل بالبريد */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 6 }}>الاسم الكامل</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 6 }}>البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 6 }}>كلمة المرور</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 12,
              border: "none",
              borderRadius: 6,
              background: "#0a7",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {loading ? "⏳ جاري التسجيل..." : "تسجيل"}
          </button>
        </form>

        <hr style={{ margin: "20px 0" }} />

        {/* 📌 Google Login */}
        <button
          onClick={handleGoogleLogin}
          style={{
            background: "#4285F4",
            color: "#fff",
            width: "100%",
            padding: 12,
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          الدخول عبر Google
        </button>

        <hr style={{ margin: "20px 0" }} />

        {/* 📌 Phone Login */}
        <div style={{ marginTop: 15 }}>
          <label style={{ display: "block", marginBottom: 6 }}>رقم الهاتف</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+201234567890"
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ccc",
              marginBottom: 8,
            }}
          />
          <div id="recaptcha-container"></div>
          <button
            onClick={handlePhoneLogin}
            style={{
              background: "#0a7",
              color: "#fff",
              width: "100%",
              padding: 12,
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            الدخول عبر الهاتف
          </button>
        </div>

        {message && (
          <p style={{ marginTop: 15, textAlign: "center", color: "red" }}>{message}</p>
        )}
      </div>
    </Layout>
  );
}
