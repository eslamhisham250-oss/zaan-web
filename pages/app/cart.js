// pages/app/cart.js
import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";

function CartPage() {
  const [items, setItems] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [activeGroup, setActiveGroup] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [cardInfo, setCardInfo] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("cart") : null;
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems([]);
      }
    } else {
      setItems([{ id: "PRD-1", title: "كنبة ركنة", price: 2500, qty: 1 }]);
    }
  }, []);

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const shipping = subtotal > 0 ? 0 : 0;
  const codFee = 200;
  const total = subtotal + shipping + codFee;

  const toggleGroup = (id) => {
    setActiveGroup(activeGroup === id ? "" : id);
    setSelectedOption("");
    setCardInfo({ name: "", number: "", expiry: "", cvv: "" });
    setPhone("");
  };

  const handleCheckout = () => {
    if (activeGroup === "installments" || activeGroup === "card") {
      if (!cardInfo.name || !cardInfo.number || !cardInfo.expiry || !cardInfo.cvv) {
        return alert("❌ من فضلك أدخل بيانات البطاقة كاملة.");
      }
    }
    if (activeGroup === "later" || activeGroup === "wallet") {
      if (!phone) return alert("❌ أدخل رقم الموبايل.");
    }
    alert("✅ تم تنفيذ الطلب (نموذج تجريبي)");
  };

  return (
    <Layout>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
        <h2>🛒 عربة التسوق</h2>

        <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 20 }}>
          {/* العمود الأيسر: عنوان + دفع */}
          <div style={leftBox}>
            {/* عنوان الشحن */}
            <div style={addressBox}>
              <h3>عنوان الشحن</h3>
              <p>التوصيل إلى Maadi 153, 10 horya sq Cairo المعادي</p>
              <a href="#" style={{ color: "orange" }}>+ أضف عنوان</a>
            </div>

            {/* طرق الدفع */}
            <div style={payBox}>
              <h3>اختر طريقة الدفع</h3>

              {/* أقساط بنكية */}
              <Accordion title="أقساط بنكية" id="installments" activeGroup={activeGroup} toggleGroup={toggleGroup}>
                {["CIB", "الأهلي", "بنك مصر", "أخرى"].map((bank) => (
                  <label key={bank} style={optionRow}>
                    <input
                      type="radio"
                      name="installments"
                      value={bank}
                      checked={selectedOption === bank}
                      onChange={(e) => setSelectedOption(e.target.value)}
                    />
                    <span>{bank}</span>
                  </label>
                ))}
                {selectedOption && <CardForm cardInfo={cardInfo} setCardInfo={setCardInfo} />}
              </Accordion>

              {/* اشتري الآن وادفع لاحقاً */}
              <Accordion title="اشتري الآن وادفع لاحقاً" id="later" activeGroup={activeGroup} toggleGroup={toggleGroup}>
                {["ValU", "Aman", "Contact", "SOUHOOLA", "Premium Card", "أخرى"].map((comp) => (
                  <label key={comp} style={optionRow}>
                    <input
                      type="radio"
                      name="later"
                      value={comp}
                      checked={selectedOption === comp}
                      onChange={(e) => setSelectedOption(e.target.value)}
                    />
                    <span>{comp}</span>
                  </label>
                ))}
                {selectedOption && (
                  <input
                    style={input}
                    placeholder="📱 رقم الموبايل"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                )}
              </Accordion>

              {/* بطاقات بنكية */}
              <Accordion title="الدفع بالبطاقات البنكية" id="card" activeGroup={activeGroup} toggleGroup={toggleGroup}>
                {["Visa", "MasterCard", "ميزة"].map((card) => (
                  <label key={card} style={optionRow}>
                    <input
                      type="radio"
                      name="card"
                      value={card}
                      checked={selectedOption === card}
                      onChange={(e) => setSelectedOption(e.target.value)}
                    />
                    <span>{card}</span>
                  </label>
                ))}
                {selectedOption && <CardForm cardInfo={cardInfo} setCardInfo={setCardInfo} />}
              </Accordion>

              {/* المحفظة الإلكترونية */}
              <Accordion title="المحفظة الإلكترونية" id="wallet" activeGroup={activeGroup} toggleGroup={toggleGroup}>
                {["Vodafone Cash", "Orange Money", "Etisalat Cash", "WE Pay", "أخرى"].map((wallet) => (
                  <label key={wallet} style={optionRow}>
                    <input
                      type="radio"
                      name="wallet"
                      value={wallet}
                      checked={selectedOption === wallet}
                      onChange={(e) => setSelectedOption(e.target.value)}
                    />
                    <span>{wallet}</span>
                  </label>
                ))}
                {selectedOption && (
                  <input
                    style={input}
                    placeholder="📱 رقم الموبايل"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                )}
              </Accordion>

              {/* الدفع عند الاستلام */}
              <Accordion title="الدفع عند الاستلام" id="cod" activeGroup={activeGroup} toggleGroup={toggleGroup}>
                <p>💵 سيتم تطبيق رسوم إضافية (200 ج.م)</p>
              </Accordion>
            </div>

            <button style={checkoutBtn} onClick={handleCheckout}>
              إتمام الشراء ✅
            </button>
          </div>

          {/* العمود الأيمن: كوبون + ملخص */}
          <div style={rightBox}>
            <div style={couponBox}>
              <label>كوبون كود</label>
              <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <input
                  style={input}
                  placeholder="أدخل الكود"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button style={applyBtn}>تطبيق</button>
              </div>
            </div>

            <div style={summaryBox}>
              <h3>ملخص الطلب</h3>
              <div style={summaryRow}>
                <span>المجموع</span>
                <b>{subtotal.toLocaleString()} ج.م</b>
              </div>
              <div style={summaryRow}>
                <span>إجمالي رسوم الشحن</span>
                <b>{shipping === 0 ? "مجانا" : shipping + " ج.م"}</b>
              </div>
              <div style={summaryRow}>
                <span>رسوم الدفع عند الاستلام</span>
                <b>{codFee} ج.م</b>
              </div>
              <div style={{ ...summaryRow, borderTop: "1px solid #ddd", marginTop: 8, paddingTop: 8 }}>
                <span>
                  <b>الإجمالي</b>
                </span>
                <b>{total.toLocaleString()} ج.م</b>
              </div>
              <p style={{ fontSize: 12, color: "#666", marginTop: 6 }}>(يتضمن ضريبة القيمة المضافة)</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

/* ===== Component: Accordion ===== */
function Accordion({ title, id, activeGroup, toggleGroup, children }) {
  return (
    <div style={payGroup}>
      <div style={payHeader} onClick={() => toggleGroup(id)}>
        <b>{title}</b>
      </div>
      {activeGroup === id && <div style={payOptions}>{children}</div>}
    </div>
  );
}

/* ===== Component: Card Form ===== */
function CardForm({ cardInfo, setCardInfo }) {
  return (
    <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
      <input
        style={input}
        placeholder="👤 اسم صاحب البطاقة"
        value={cardInfo.name}
        onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
      />
      <input
        style={input}
        placeholder="💳 رقم البطاقة"
        value={cardInfo.number}
        onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <input
          style={input}
          placeholder="MM/YY"
          value={cardInfo.expiry}
          onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
        />
        <input
          style={input}
          placeholder="CVV"
          value={cardInfo.cvv}
          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
        />
      </div>
    </div>
  );
}

/* ===== Styles ===== */
const leftBox = { display: "grid", gap: 20 };
const rightBox = { display: "grid", gap: 20 };
const couponBox = { background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 16 };
const summaryBox = { background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 16 };
const addressBox = { background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 16 };
const payBox = { background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 16 };
const summaryRow = { display: "flex", justifyContent: "space-between", marginTop: 6 };
const input = { flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: 8 };
const applyBtn = { padding: "8px 14px", background: "#eee", border: "1px solid #ccc", borderRadius: 8, cursor: "pointer" };
const checkoutBtn = { marginTop: 12, width: "100%", padding: "12px", background: "#1a3faa", color: "#fff", fontWeight: "bold", border: "none", borderRadius: 8, cursor: "pointer" };
const payGroup = { borderBottom: "1px solid #eee", marginBottom: 10 };
const payHeader = { padding: "10px", cursor: "pointer", background: "#f7f7f7", borderRadius: 6 };
const payOptions = { padding: "10px 16px", background: "#fafafa", borderRadius: 6, fontSize: 14 };
const optionRow = { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 };

export default CartPage;
