import { useState } from "react";
import { auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const doRegister = async () => {
    setLoading(true); setMsg("");
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      setMsg("تم إنشاء الحساب بنجاح! ✅");
    } catch (e) { setMsg(e.message); }
    setLoading(false);
  };

  const doLogin = async () => {
    setLoading(true); setMsg("");
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      setMsg("تم تسجيل الدخول ✅");
    } catch (e) { setMsg(e.message); }
    setLoading(false);
  };

  const doGoogle = async () => {
    setLoading(true); setMsg("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setMsg("تم تسجيل الدخول عبر Google ✅");
    } catch (e) { setMsg(e.message); }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 420, margin: "50px auto", padding: 20, border: "1px solid #eee", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center", marginBottom: 16 }}>
        {isLogin ? "تسجيل دخول" : "إنشاء حساب جديد"}
      </h2>

      {!isLogin && (
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 6 }}>الاسم</label>
          <input name="name" onChange={onChange} value={form.name} style={inp} />
        </div>
      )}

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 6 }}>البريد الإلكتروني</label>
        <input type="email" name="email" onChange={onChange} value={form.email} style={inp} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 6 }}>كلمة المرور</label>
        <input type="password" name="password" onChange={onChange} value={form.password} style={inp} />
      </div>

      {isLogin ? (
        <button disabled={loading} onClick={doLogin} style={btn}>دخول</button>
      ) : (
        <button disabled={loading} onClick={doRegister} style={btn}>تسجيل</button>
      )}

      <button disabled={loading} onClick={doGoogle} style={{ ...btn, background: "#db4437", marginTop: 8 }}>
        دخول عبر Google
      </button>

      <p
        style={{ marginTop: 12, textAlign: "center", color: "#0a7", cursor: "pointer" }}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "ليس لديك حساب؟ سجل الآن" : "عندك حساب؟ ادخل من هنا"}
      </p>

      {msg && <p style={{ textAlign: "center", marginTop: 8, color: "#e11" }}>{msg}</p>}
    </div>
  );
}

const inp = { width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" };
const btn = { width: "100%", padding: 12, border: "none", borderRadius: 6, background: "#0a7", color: "#fff", fontWeight: 600, cursor: "pointer" };
