import { useState } from "react";
import Layout from "../../../components/Layout";
import { getCartReady, totalCartReady, clearCartReady } from "../../../lib/cartReady";

export default function ReadyCheckout() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", note: "" });
  const [paymentMethod, setPaymentMethod] = useState("cod"); // كاش افتراضي
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const total = totalCartReady();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: getCartReady(),
          customer: form,
          paymentMethod,
          orderType: "ready",
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setSuccess(data.order);
        clearCartReady();
      } else {
        alert(data.message || "❌ حدث خطأ في الطلب");
      }
    } catch (err) {
      setLoading(false);
      alert("⚠️ لا يمكن الاتصال بالسيرفر حالياً");
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: 20 }}>
        <h2>🛋️ إتمام شراء الأثاث الجاهز</h2>

        {success ? (
          <div style={{ background: "#e6ffed", padding: 20, borderRadius: 8 }}>
            <h3>✅ تم استلام طلبك بنجاح</h3>
            <p>رقم الطلب: <b>{success.id}</b></p>
            <p>الإجمالي: {success.total} ج.م</p>
            <p>طريقة الدفع: {success.paymentMethod}</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 20, padding: 16, background: "#f9f9f9", borderRadius: 8 }}>
              <h3>ملخص الطلب</h3>
              <p>عدد المنتجات: {getCartReady().reduce((s, i) => s + i.qty, 0)}</p>
              <p>الإجمالي: <b style={{ color: "var(--primary-color)" }}>{total} ج.م</b></p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3>اختَر طريقة الدفع</h3>
              <div style={{ display: "grid", gap: 12 }}>
                <PayMethod value="cod" label="💵 كاش عند الاستلام" checked={paymentMethod} set={setPaymentMethod} />
                <PayMethod value="card" label="💳 بطاقة بنكية (Visa / MasterCard)" checked={paymentMethod} set={setPaymentMethod} />
                <PayMethod value="wallet" label="📱 محفظة إلكترونية (Vodafone / Orange / Etisalat)" checked={paymentMethod} set={setPaymentMethod} />
                <PayMethod value="installments" label="🏦 تقسيط عبر شركات (ValU / Aman / Contact)" checked={paymentMethod} set={setPaymentMethod} />
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
              <Field label="👤 الاسم الكامل" name="name" value={form.name} onChange={handleChange} required />
              <Field label="📞 رقم الموبايل" name="phone" value={form.phone} onChange={handleChange} required />
              <Field label="📧 البريد الإلكتروني" name="email" type="email" value={form.email} onChange={handleChange} />
              <Textarea label="📍 العنوان" name="address" value={form.address} onChange={handleChange} required />
              <Textarea label="📝 ملاحظات" name="note" value={form.note} onChange={handleChange} />

              <button style={btn} type="submit" disabled={loading}>
                {loading ? "⏳ جاري الإرسال..." : "إرسال الطلب ✅"}
              </button>
            </form>
          </>
        )}
      </div>
    </Layout>
  );
}

/* =========== Components =========== */
function PayMethod({ value, label, checked, set }) {
  return (
    <label style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 8, padding: 12, cursor: "pointer" }}>
      <input
        type="radio"
        name="payment"
        value={value}
        checked={checked === value}
        onChange={() => set(value)}
        style={{ marginInlineEnd: 8 }}
      />
      {label}
    </label>
  );
}

function Field({ label, ...props }) {
  return (
    <div>
      <label style={lab}>{label}</label>
      <input style={input} {...props} />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label style={lab}>{label}</label>
      <textarea style={textarea} {...props} />
    </div>
  );
}

/* =========== Styles =========== */
const lab = { display: "block", marginBottom: 6, fontWeight: 600 };
const input = { width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 8 };
const textarea = { ...input, resize: "vertical" };
const btn = {
  background: "var(--primary-color)",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "12px 18px",
  cursor: "pointer",
  fontSize: 16,
  fontWeight: "bold",
  marginTop: 8,
};
