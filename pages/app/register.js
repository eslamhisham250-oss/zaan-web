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
  signInWithPhoneNumber,
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
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ التسجيل بالبريد وكلمة المرور
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

  // ✅ تسجيل دخول بجوجل
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

  // ✅ إنشاء reCAPTCHA عند أول مرة
const initRecaptcha = () => {
  try {
    if (!window.recaptchaVerifier) {
      console.log("🚀 Initializing reCAPTCHA...");
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => console.log("✅ reCAPTCHA verified!"),
          "expired-callback": () => console.log("⚠️ reCAPTCHA expired!"),
        }
      );
    }
  } catch (error) {
    console.error("reCAPTCHA init error:", error);
  }
};


  // ✅ إرسال كود OTP إلى الهاتف
 const sendOtp = async () => {
  if (!form.phone) return setMessage("📱 من فضلك أدخل رقم الهاتف أولاً");

  try {
    initRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    const result = await signInWithPhoneNumber(auth, "+2" + form.phone, appVerifier);
    setConfirmationResult(result);
    setMessage("📩 تم إرسال كود التحقق إلى رقمك");
  } catch (error) {
    console.error(error);
    setMessage("❌ حدث خطأ أثناء إرسال الكود: " + error.message);
  }
};


  // ✅ التحقق من كود OTP
  const verifyOtp = async () => {
    if (!otp) return setMessage("أدخل كود التحقق أولاً");
    try {
      await confirmationResult.confirm(otp);
      setMessage("✅ تم التحقق من رقم الهاتف بنجاح!");
    } catch (error) {
      console.error(error);
      setMessage("❌ الكود غير صحيح أو انتهت صلاحيته.");
    }
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "50px auto",
        padding: 20,
        border: "1px solid #eee",
        borderRadius: 10,
        background: "#fff",
      }}
    >
      <h2 style={{ marginBottom: 20, textAlign: "center" }}>تسجيل حساب جديد</h2>

      {/* 📧 التسجيل بالبريد */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 6 }}>الاسم الكامل</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
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
            style={inputStyle}
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
            style={inputStyle}
          />
        </div>

        <button type="submit" disabled={loading} style={btnStyle}>
          {loading ? "⏳ جاري التسجيل..." : "تسجيل"}
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      {/* 🔹 Google Login */}
      <button onClick={handleGoogleLogin} style={googleBtn}>
        الدخول عبر Google
      </button>

      <hr style={{ margin: "20px 0" }} />

      {/* 🔹 تسجيل برقم الهاتف */}
      <div style={{ marginTop: 15 }}>
        <label style={{ display: "block", marginBottom: 6 }}>رقم الهاتف</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+201234567890"
          style={inputStyle}
        />
        <div id="recaptcha-container"></div>

        {!confirmationResult ? (
          <button onClick={sendOtp} style={btnStyle}>
            إرسال كود التحقق
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="أدخل كود التحقق"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={inputStyle}
            />
            <button onClick={verifyOtp} style={btnStyle}>
              تأكيد الكود
            </button>
          </>
        )}
      </div>

      {message && (
        <p style={{ marginTop: 15, textAlign: "center", color: "#d9534f" }}>{message}</p>
      )}
    </div>
  );
}

/* 🎨 الأنماط الموحدة */
const inputStyle = {
  width: "100%",
  padding: 10,
  borderRadius: 6,
  border: "1px solid #ccc",
  marginBottom: 8,
};

const btnStyle = {
  width: "100%",
  padding: 12,
  border: "none",
  borderRadius: 6,
  background: "#00A884",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};

const googleBtn = {
  ...btnStyle,
  background: "#4285F4",
};
