// pages/admin/login.js
import { useState } from "react";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      // 🔒 هنا نقدر نتحقق انه Admin من الـ email
      if (form.email === "admin@zaan.com") {
        router.push("/admin/dashboard");
      } else {
        setError("❌ هذا الحساب غير مسموح له بالدخول.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", padding: 20, border: "1px solid #eee", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />
        <button type="submit" style={{ width: "100%", padding: 12, background: "#0a7", color: "#fff", borderRadius: 6 }}>
          دخول
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: 15 }}>{error}</p>}
    </div>
  );
}
