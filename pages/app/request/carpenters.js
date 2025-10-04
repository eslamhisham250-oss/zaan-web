import { useState } from "react";

const roomOptions = {
  "غرفة معيشة": ["ترابيزة قهوة", "ترابيزة جانبية", "مكتبة", "وحدة تليفزيون", "كنبة", "فوتيه", "كومودينو"],
  "غرفة نوم": ["سرير", "كومودينو", "دولاب ملابس", "تسريحة", "شيفونيرة", "رف جداري"],
  "غرفة سفرة": ["ترابيزة سفرة", "كراسي سفرة", "نيش", "بوفيه"],
  "غرفة أطفال": ["سرير أطفال", "سرير بطابقين", "مكتب دراسة", "كرسي أطفال", "دولاب صغير", "صندوق ألعاب"],
  "مكتب": ["مكتب مدير", "مكتب موظف", "كرسي مكتب", "طاولة اجتماعات", "مكتبة ملفات"],
  "مطبخ/حمام": ["وحدة مطبخ", "ترابيزة مطبخ صغيرة", "وحدة تخزين حمام", "جزامة"],
  "خارجي": ["ترابيزة حديقة", "كرسي حديقة", "أرجوحة خشب", "برجولا", "مقعد خشب"],
  "منتجات خاصة": ["باب خشب", "شباك خشب", "بارتيشن", "ديكور خشبي", "رف جداري", "نجفة خشب"],
};

const colorOptions = [
  { name: "أبيض", code: "#FFFFFF" },
  { name: "رمادي", code: "#808080" },
  { name: "أسود", code: "#000000" },
  { name: "بني", code: "#8B4513" },
  { name: "بيج", code: "#F5F5DC" },
  { name: "أزرق", code: "#0000FF" },
  { name: "أخضر", code: "#008000" },
  { name: "أحمر", code: "#FF0000" },
];

export default function CarpentersPage() {
  const [form, setForm] = useState({
    room: "", item: "", material: "",
    length: "", width: "", height: "",
    colorName: "", colorCode: "",
    quantity: 1, budget: "", deadline: "",
    extra: "",
  });
  const [showPalette, setShowPalette] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleColorSelect = (c) => { setForm({ ...form, colorName: c.name, colorCode: c.code }); setShowPalette(false); };
  const handleSubmit = (e) => { e.preventDefault(); alert("✅ تم إرسال طلب النجار!"); };

  return (
    <div style={{ maxWidth: 920, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 10 }}>🪚 طلب عمولة من النجارين</h2>
      <p style={{ color: "#555", marginBottom: 20 }}>
        املأ الحقول التالية وسيتم التواصل معك من النجارين بعروض مناسبة.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 22 }}>
        {/* الغرفة */}
        <div>
          <label style={label}>🏠 اختر الغرفة</label>
          <select name="room" value={form.room} onChange={handleChange} style={input}>
            <option value="">اختر الغرفة</option>
            {Object.keys(roomOptions).map((room) => <option key={room} value={room}>{room}</option>)}
          </select>
        </div>

        {/* القطعة */}
        <div>
          <label style={label}>🛋️ اختر القطعة</label>
          <select name="item" value={form.item} onChange={handleChange} style={input} disabled={!form.room}>
            <option value="">اختر القطعة</option>
            {form.room && roomOptions[form.room].map((it) => <option key={it} value={it}>{it}</option>)}
          </select>
        </div>

        {/* الأبعاد + صورة توضيحية */}
        <div>
          <h3 style={{ marginBottom: 12 }}>📏 الأبعاد (سم)</h3>
          <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
            {/* الحقول (يمين) */}
            <div style={{ display: "grid", gap: 12, maxWidth: 260 }}>
              <div>
                <label style={label}>الطول</label>
                <input name="length" type="number" value={form.length} onChange={handleChange} style={inputSmall} />
              </div>
              <div>
                <label style={label}>العرض</label>
                <input name="width" type="number" value={form.width} onChange={handleChange} style={inputSmall} />
              </div>
              <div>
                <label style={label}>الارتفاع</label>
                <input name="height" type="number" value={form.height} onChange={handleChange} style={inputSmall} />
              </div>
            </div>

            {/* الصورة التوضيحية (شمال) */}
            <div style={{ flex: 1, textAlign: "center" }}>
              {form.item ? (
                <img
                  src={`/illustrations/${form.item}.png`}
                  alt={`توضيح ${form.item}`}
                  style={{
                    maxWidth: "320px",
                    opacity: 0.6,
                    filter: "grayscale(100%)",
                    display: "block",
                    margin: "0 auto",
                    objectFit: "contain"
                  }}
                />
              ) : (
                <p style={{ color: "#777", fontSize: 14 }}>اختر القطعة لعرض صورة توضيحية</p>
              )}
            </div>
          </div>
        </div>

        {/* الخامة */}
        <div>
          <label style={label}>🪵 نوع الخامة</label>
          <select name="material" value={form.material} onChange={handleChange} style={input}>
            <option value="">اختر الخامة</option>
            <option value="MDF">MDF</option>
            <option value="خشب زان">خشب زان</option>
            <option value="أرو">أرو</option>
            <option value="حديد">حديد</option>
            <option value="بلاستيك">بلاستيك</option>
          </select>
        </div>

        {/* اللون */}
        <div>
          <label style={label}>🎨 اللون</label>
          <button type="button" onClick={() => setShowPalette(!showPalette)} style={btnSecondary}>اختر اللون</button>
          {form.colorName && (
            <div style={{ marginTop: 8 }}>
              ✅ اخترت: <b>{form.colorName}</b> <small style={{ color: "#555" }}>{form.colorCode}</small>
            </div>
          )}
          {showPalette && (
            <div style={paletteGrid}>
              {colorOptions.map((c) => (
                <div key={c.code} onClick={() => handleColorSelect(c)} style={{ ...colorBox, background: c.code }} />
              ))}
            </div>
          )}
        </div>

        {/* الكمية */}
        <div>
          <label style={label}>🔢 الكمية</label>
          <input name="quantity" type="number" value={form.quantity} onChange={handleChange} style={input} />
        </div>

        {/* الميزانية */}
        <div>
          <label style={label}>💰 الميزانية</label>
          <input name="budget" type="number" value={form.budget} onChange={handleChange} style={input} />
        </div>

        {/* التسليم */}
        <div>
          <label style={label}>⏰ موعد التسليم</label>
          <input name="deadline" type="date" value={form.deadline} onChange={handleChange} style={input} />
        </div>

        {/* تفاصيل إضافية */}
        <div>
          <label style={label}>ℹ️ تفاصيل إضافية</label>
          <textarea name="extra" value={form.extra} onChange={handleChange} rows={3} style={textarea} />
        </div>

        <button type="submit" style={btn}>📨 إرسال الطلب</button>
      </form>
    </div>
  );
}

// ===== Styles =====
const label = { display: "block", marginBottom: 10, fontWeight: 600, fontSize: 15, color: "#333" };
const input = { width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: 8, fontSize: 14, background:'#fff' };
const inputSmall = { ...input, padding: "8px", fontSize: 13 };
const textarea = { ...input, resize: "vertical" };
const btn = { background: "#0a7", color: "#fff", border: "none", borderRadius: 8, padding: "12px 18px", cursor: "pointer", fontSize: 16, fontWeight: "bold" };
const btnSecondary = { background: "#eee", border: "1px solid #ccc", padding: "8px 12px", borderRadius: 6, cursor: "pointer" };
const paletteGrid = { marginTop: 10, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(30px, 1fr))", gap: 6, border: "1px solid #ddd", padding: 10, borderRadius: 8, background: "#fff" };
const colorBox = { width: 30, height: 30, borderRadius: 4, cursor: "pointer", border: "1px solid #ccc" };
