// pages/app/login.js
import { getProviders, signIn } from "next-auth/react";
import { useState } from "react";
import Layout from "../../components/Layout";

export default function LoginPage({ providers }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    await signIn("credentials", { email, password, callbackUrl: "/app" });
  };

  return (
    <Layout>
      <div style={{ maxWidth: 400, margin: "0 auto", background: "#fff", padding: 20, borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>تسجيل الدخول</h2>

        {/* تسجيل بالبريد */}
        <form onSubmit={handleEmailLogin} style={{ display: "grid", gap: 12 }}>
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={input}
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={input}
          />
          <button type="submit" style={btn}>تسجيل الدخول</button>
        </form>

        <div style={{ textAlign:"center", margin:"16px 0", color:"#888" }}>أو</div>

        {/* تسجيل بالسوشيال */}
        {providers &&
          Object.values(providers).map((provider) =>
            provider.id !== "credentials" ? (
              <button
                key={provider.id}
                onClick={() => signIn(provider.id, { callbackUrl: "/app" })}
                style={socialBtn}
              >
                دخول عبر {provider.name}
              </button>
            ) : null
          )}

        {/* مستخدم جديد */}
        <p style={{ textAlign:"center", marginTop: 14 }}>
          مستخدم جديد؟ <a href="/app/register" style={{ color:"#0a7", fontWeight:600 }}>سجل الآن</a>
        </p>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return { props: { providers } };
}

const input = { padding:"12px", border:"1px solid #ccc", borderRadius:8, fontSize:14 };
const btn = { background:"#0a7", color:"#fff", border:"none", borderRadius:8, padding:"12px", cursor:"pointer", fontWeight:"bold" };
const socialBtn = { ...btn, background:"#4267B2", marginTop:6 }; // لون فيسبوك كمثال
