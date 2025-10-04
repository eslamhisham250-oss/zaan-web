import { useState } from "react";
import Layout from "../../../components/Layout";
import { getCartCarpenter, totalCartCarpenter, clearCartCarpenter } from "../../../lib/cartCarpenter";

export default function CarpenterCheckout() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", note: "" });
  const [paymentMethod, setPaymentMethod] = useState("card"); // افتراضي بطاقة
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const total = totalCartCarpenter();

  // قواعد الدفع
  const plan =
    paymentMethod === "installments"
      ? { upfront: total * 0.2, text: "مقدم 20% الآن والباقي 80% بالتقسيط" }
      : { upfront: total * 0.5, text: "مقدم 50% الآن والباقي 50% أثناء التنفيذ" };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: getCartCarpenter(),
          customer: form,
          paymentMethod,
          orderType: "carpenter",
          plan,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setSuccess(data.order);
        clearCartCarpenter();
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
        <h2>🪚 إتمام طلب نجارين</h2>

        {success ? (
          <div style={{ background: "#e6ffed", padding: 20, borderRadius: 8 }}>
            <h3>✅ تم استلام طلبك</h3>
            <p>الإجمالي: {total} ج.م</p>
            <p>المقدم المطلوب: {plan.upfront} ج.م</p>
            <p>الخطة: {plan.text}</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 20, padding: 16, background: "#f9f9f9", borderRadius: 8 }}>
              <h3>ملخص الطلب</h3>
              <p>عدد المنتجات: {getCartCarpenter().reduce((s, i) => s + i.qty, 0)}</p>
              <p>الإجمالي: {total} ج.م</p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3>طرق الدفع المتاحة</h3>
              <label><input type="radio" checked={paymentMethod==="card"} onChange={()=>setPaymentMethod("card")} /> 💳 بطاقة / محفظة (مقدم 50%)</label>
              <br />
              <label><input type="radio" checked={paymentMethod==="installments"} onChange={()=>setPaymentMethod("installments")} /> 🏦 تقسيط (مقدم 20%)</label>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3>الخطة الحالية</h3>
              <p>مقدم: {plan.upfront} ج.م</p>
              <p>{plan.text}</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
              <input name="name" placeholder="👤 الاسم" value={form.name} onChange={handleChange} required />
              <input name="phone" placeholder="📞 الموبايل" value={form.phone} onChange={handleChange} required />
              <textarea name="address" placeholder="📍 العنوان" value={form.address} onChange={handleChange} required />
              <textarea name="note" placeholder="📝 ملاحظات" value={form.note} onChange={handleChange} />
              <button type="submit" disabled={loading}>{loading ? "⏳ جاري..." : "إرسال الطلب ✅"}</button>
            </form>
          </>
        )}
      </div>
    </Layout>
  );
}
