  // pages/app/checkout.js
  import { useEffect, useMemo, useState } from "react";
  import Layout from "../../components/Layout";
  import { getCart, totalCart, clearCart } from "../../lib/cart";

  export default function CheckoutPage() {
    const [form, setForm] = useState({
      name: "",
      phone: "",
      email: "",
      address: "",
      note: "",
    });

    // نوع الطلب: ready | carpenter | factory
    const [orderType, setOrderType] = useState("ready");

    // طريقة الدفع: cod | card | wallet | installments
    const [paymentMethod, setPaymentMethod] = useState("cod");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    // إجمالي السلّة
    const total = useMemo(() => totalCart(), []);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    // ===== خطّة الدفع حسب النوع والطريقة =====
    const plan = useMemo(() => planFor(orderType, paymentMethod, total), [orderType, paymentMethod, total]);
    const upfront = useMemo(() => Math.round(total * plan.upfrontPercent), [total, plan.upfrontPercent]);

    // لو اختار نجارين/مصانع وكان الدفع كاش عند الاستلام: بدّل تلقائيًا لبطاقة
    useEffect(() => {
      if ((orderType === "carpenter" || orderType === "factory") && paymentMethod === "cod") {
        setPaymentMethod("card");
      }
    }, [orderType]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!plan.allowed) {
        alert("طريقة الدفع المختارة غير متاحة لهذا النوع من الطلب.");
        return;
      }
      setLoading(true);

      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cart: getCart(),
            customer: form,
            paymentMethod,
            orderType,
            computed: {
              total,
              upfront,
              upfrontPercent: plan.upfrontPercent,
              planText: plan.planText,
            },
            notify: true, // ✅ جديد: للسيرفر يبعث إيميل + إشعار
          }),
        });

        const data = await res.json();
        setLoading(false);

        if (data.success) {
          setSuccess(data.order ?? {
            id: data.id || "ORD-" + Date.now(),
            total,
            upfront,
            plan: plan.planText,
            status: "received",
            items: getCart(),
            customer: form,
          });
          clearCart();
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
        <div style={{ maxWidth: 880, margin: "0 auto", padding: 20 }}>
          <h2>📝 إتمام الشراء</h2>

          {success ? (
            <div style={{ background: "#e6ffed", padding: 20, borderRadius: 8 }}>
              <h3>✅ تم استلام طلبك بنجاح</h3>
              <p>رقم الطلب: <b>{success.id}</b></p>
              <p>الإجمالي: {fmt(success.total)} ج.م</p>
              {"upfront" in success && <p>المقدم المطلوب: {fmt(success.upfront)} ج.م</p>}
              {"plan" in success && <p>خطة الدفع: {success.plan}</p>}
              <p>الحالة: {success.status || "قيد المعالجة"}</p>

              <ul style={{ marginTop: 8 }}>
                {success.items?.map((it) => (
                  <li key={it.id}>
                    {it.title} × {it.qty} = {fmt(it.price * it.qty)} ج.م
                  </li>
                ))}
              </ul>

              {success.customer && (
                <>
                  <p>📍 العنوان: {success.customer.address}</p>
                  <p>📞 الموبايل: {success.customer.phone}</p>
                  {success.customer.note && <p>📝 ملاحظات: {success.customer.note}</p>}
                </>
              )}
            </div>
          ) : (
            <>
              {/* ملخص السلّة */}
              <div style={box}>
                <h3>ملخص الطلب</h3>
                <p>عدد المنتجات: {mounted ? getCart().reduce((s, i) => s + i.qty, 0) : 0}</p>
                <p>الإجمالي: <b style={{ color: "var(--primary-color)" }}>{mounted ? totalCart() : 0} ج.م</b></p>
                {mounted && paymentMethod === "cod" && totalCart() > 2000 && (
                  <p style={{ color: "red", marginTop: 6 }}>
                    ⚠️ الطلبات أكبر من 2000 ج.م تستلزم دفع 15% مقدم أونلاين والباقي عند الاستلام.
                  </p>
                )}
              </div>

              {/* نوع الطلب */}
              <div style={box}>
                <h3>نوع الطلب</h3>
                <select style={input} value={orderType} onChange={(e) => setOrderType(e.target.value)}>
                  <option value="ready">🛋️ أثاث جاهز</option>
                  <option value="carpenter">🪚 نجارين</option>
                  <option value="factory">🏭 مصانع</option>
                </select>
                {orderType !== "ready" && (
                  <p style={muted}>
                    * لطلبات النجّارين/المصانع: المقدم **إجباري** حسب طريقة الدفع (50% أو 20%).
                  </p>
                )}
              </div>

              {/* طريقة الدفع */}
              <div style={box}>
                <h3>اختَر طريقة الدفع</h3>

                <div style={methods}>
                  <Method
                    disabled={orderType !== "ready"}
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    label="💵 كاش عند الاستلام"
                    caption="قد تُطبق رسوم إضافية للشحن/التحصيل"
                  />

                  <Method
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    label="💳 بطاقة بنكية (Visa / MasterCard / Meeza)"
                    chips={["Visa", "Mastercard", "Meeza"]}
                  />

                  <Method
                    checked={paymentMethod === "wallet"}
                    onChange={() => setPaymentMethod("wallet")}
                    label="📱 محافظ إلكترونية"
                    chips={["Vodafone Cash", "Orange Cash", "Etisalat Cash"]}
                  />

                  <Method
                    checked={paymentMethod === "installments"}
                    onChange={() => setPaymentMethod("installments")}
                    label="🏦 تقسيط عبر الشركات"
                    caption="الموافقة خاضعة لشروط مزوّد التمويل"
                    chips={["valU", "Aman", "Contact", "Sympl"]}
                  />
                </div>
              </div>

              {/* خطة الدفع المحسوبة */}
              <div style={box}>
                <h3>خطة الدفع</h3>
                {!plan.allowed ? (
                  <p style={{ color: "#b91c1c", fontWeight: 700 }}>
                    هذه الطريقة غير متاحة لهذا النوع من الطلب.
                  </p>
                ) : (
                  <>
                    <p>
                      المقدم المطلوب الآن:{" "}
                      <b>{fmt(upfront)} ج.م</b>
                      {" "}
                      ({Math.round(plan.upfrontPercent * 100)}%)
                    </p>
                    <p>{plan.planText}</p>
                    {plan.note && <p style={muted}>{plan.note}</p>}
                  </>
                )}
              </div>

              {/* بيانات العميل */}
              <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
                <div>
                  <label style={label}>👤 الاسم الكامل</label>
                  <input style={input} name="name" value={form.name} onChange={handleChange} required />
                </div>

                <div>
                  <label style={label}>📞 رقم الموبايل</label>
                  <input style={input} name="phone" value={form.phone} onChange={handleChange} required />
                </div>

                <div>
                  <label style={label}>📧 البريد الإلكتروني</label>
                  <input type="email" style={input} name="email" value={form.email} onChange={handleChange} />
                </div>

                <div>
                  <label style={label}>📍 العنوان</label>
                  <textarea style={textarea} name="address" value={form.address} onChange={handleChange} rows={3} required />
                </div>

                <div>
                  <label style={label}>📝 ملاحظات إضافية</label>
                  <textarea style={textarea} name="note" value={form.note} onChange={handleChange} rows={2} />
                </div>

                <button style={{ ...btn, opacity: plan.allowed ? 1 : 0.6 }} type="submit" disabled={loading || !plan.allowed}>
                  {loading ? "⏳ جاري الإرسال..." : "إرسال الطلب ✅"}
                </button>
              </form>
            </>
          )}
        </div>
      </Layout>
    );
  }

  /* ===== Helpers ===== */
  function fmt(n) {
    try {
      return Number(n || 0).toLocaleString("ar-EG");
    } catch {
      return n;
    }
  }

  // ✅ عدلناها عشان تاخد total وتطبق شرط 15%
  function planFor(orderType, method, total) {
    if (orderType === "ready") {
      switch (method) {
        case "cod":
          if (total > 2000) {
            return {
              allowed: true,
              upfrontPercent: 0.15,
              planText: "مطلوب دفع 15% مقدم أونلاين والباقي عند الاستلام.",
            };
          }
          return { allowed: true, upfrontPercent: 0, planText: "الدفع بالكامل عند الاستلام." };

        case "card":
          return { allowed: true, upfrontPercent: 1, planText: "الدفع بالكامل أونلاين." };
        case "wallet":
          return { allowed: true, upfrontPercent: 1, planText: "الدفع بالكامل عبر المحفظة." };
        case "installments":
          return { allowed: true, upfrontPercent: 0, planText: "ادفع لاحقًا بالتقسيط عبر الشركات." };
        default:
          return { allowed: false, upfrontPercent: 0, planText: "" };
      }
    }

    if (orderType === "carpenter" || orderType === "factory") {
      switch (method) {
        case "card":
        case "wallet":
          return { allowed: true, upfrontPercent: 0.5, planText: "مقدم 50% الآن، والباقي لاحقًا." };
        case "installments":
          return { allowed: true, upfrontPercent: 0.2, planText: "مقدم 20% الآن، والباقي 80% بالتقسيط." };
        default:
          return { allowed: false, upfrontPercent: 0, planText: "غير مسموح بالدفع عند الاستلام." };
      }
    }

    return { allowed: false, upfrontPercent: 0, planText: "" };
  }

  /* ===== UI Components ===== */
  function Method({ checked, onChange, label, caption, chips = [], disabled = false }) {
    return (
      <label
        style={{
          ...methodCard,
          ...(disabled ? { opacity: 0.5, pointerEvents: "none" } : {}),
          borderColor: checked ? "var(--primary-color)" : "#ddd",
        }}
      >
        <input type="radio" name="pay" checked={checked} onChange={onChange} style={{ marginInlineEnd: 8 }} />
        <div>
          <div style={{ fontWeight: 700 }}>{label}</div>
          {caption && <div style={muted}>{caption}</div>}
          {chips.length > 0 && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
              {chips.map((c) => (
                <span key={c} style={chip}>{c}</span>
              ))}
            </div>
          )}
        </div>
      </label>
    );
  }

  /* ===== Styles ===== */
  const label = { display: "block", marginBottom: 6, fontWeight: 600 };
  const input = { width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: 8, background: "#fff" };
  const textarea = { ...input, resize: "vertical" };
  const btn = { background: "var(--primary-color)", color: "#fff", border: "none", borderRadius: 8, padding: "12px 18px", cursor: "pointer", fontSize: 16, fontWeight: "bold", marginTop: 8 };
  const box = { marginBottom: 20, padding: 16, background: "#f9f9f9", borderRadius: 8, border: "1px solid #eee" };
  const methods = { display: "grid", gap: 12 };
  const methodCard = { background: "#fff", padding: 12, borderRadius: 8, border: "1px solid #ddd", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10 };
  const chip = { border: "1px solid #e5e7eb", padding: "4px 8px", borderRadius: 999, fontSize: 12, background: "#fff" };
  const muted = { color: "#6b7280", marginTop: 6, fontSize: 13 };
