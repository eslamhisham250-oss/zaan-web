// pages/app/payment.js
import { useState } from "react";
import Layout from "../../components/Layout";
import { getCart, totalCart } from "../../lib/cart";

export default function PaymentPage({ type = "ready" }) {
  // type = "ready" للأثاث الجاهز
  // type = "custom" للنجارين/المصانع
  const [method, setMethod] = useState("");
  const total = totalCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!method) return alert("اختر طريقة الدفع");
    alert(`✅ تم اختيار ${method}`);
  };

  return (
    <Layout>
      <div style={{ display: "flex", gap: 20, padding: 20 }}>
        {/* ملخص الطلب */}
        <div style={{ flex: 1, maxWidth: 350 }}>
          <div style={box}>
            <h3>ملخص الطلب</h3>
            <p>المجموع: {total} ج.م</p>
            {type === "custom" && (
              <p style={{ color: "#d33" }}>المطلوب دفع مقدم حسب الخطة</p>
            )}
            <p>الشحن: مجاني</p>
            <p><b>الإجمالي: {total} ج.م</b></p>
          </div>
          <button style={btn} onClick={handleSubmit}>إتمام الشراء</button>
        </div>

        {/* طرق الدفع */}
        <div style={{ flex: 2 }}>
          <h3>اختر طريقة الدفع</h3>

          {type === "ready" && (
            <>
              <Section title="أقساط بنكية" options={["CIB", "NBE", "QNB"]} setMethod={setMethod}/>
              <Section title="اشتري الآن وادفع لاحقًا" options={["ValU", "أمان", "Souhoola"]} setMethod={setMethod}/>
              <Section title="البطاقات البنكية" options={["Visa", "MasterCard"]} setMethod={setMethod}/>
              <Section title="المحفظة الإلكترونية" options={["Vodafone Cash", "Orange Money"]} setMethod={setMethod}/>
              <Section title="الدفع عند الاستلام" options={["كاش عند الاستلام"]} setMethod={setMethod}/>
            </>
          )}

          {type === "custom" && (
            <>
              <Section 
                title="الدفع كاش" 
                options={[`50% مقدم (${(total*0.5).toFixed(0)} ج.م) + 50% عند نصف المدة`]} 
                setMethod={setMethod}
              />
              <Section 
                title="الدفع بالتقسيط" 
                options={[`20% مقدم (${(total*0.2).toFixed(0)} ج.م) + 80% عبر ValU/أمان/Souhoola`]} 
                setMethod={setMethod}
              />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

function Section({ title, options, setMethod }) {
  return (
    <div style={box}>
      <h4>{title}</h4>
      {options.map((op) => (
        <label key={op} style={{ display: "block", margin: "6px 0" }}>
          <input type="radio" name="method" value={op} onChange={() => setMethod(op)} /> {op}
        </label>
      ))}
    </div>
  );
}

/* ===== Styles ===== */
const box = { background: "#fff", border: "1px solid #ddd", padding: 16, borderRadius: 8, marginBottom: 16 };
const btn = { background: "var(--primary-color)", color: "#fff", padding: "12px 20px", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 16 };
