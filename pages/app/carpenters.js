import { useState } from "react";

export default function CarpenterRequest() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    length: "",
    width: "",
    height: "",
    material: "",
    color: "",
    quantity: 1,
    budget: "",
    deadline: "",
    extra: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("✅ تم إرسال الطلب بنجاح، سيتم مراجعته من النجارين");
  };

  return (
    <div style={{ padding: 30, maxWidth: 800, margin: "0 auto" }} dir="rtl">
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>🪚 طلب عمولة من النجارين</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: 20,
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* عنوان */}
        <div>
          <label>📌 عنوان الطلب</label>
          <input
            name="title"
            placeholder="مثال: ترابيزة سفرة 6 كراسي"
            value={form.title}
            onChange={handleChange}
            required
            style={input}
          />
        </div>


        {/* وصف */}
        <div>
          <label>📝 الوصف التفصيلي</label>
          <textarea
            name="description"
            placeholder="اكتب كل التفاصيل اللي محتاجها"
            rows={4}
            value={form.description}
            onChange={handleChange}
            style={textarea}
          />
        </div>

        {/* المقاسات */}
        <div>
          <label>📏 الأبعاد (سم)</label>
          <div style={{ display: "flex", gap: 10 }}>
            <input name="length" type="number" placeholder="الطول" value={form.length} onChange={handleChange} style={input} />
            <input name="width" type="number" placeholder="العرض" value={form.width} onChange={handleChange} style={input} />
            <input name="height" type="number" placeholder="الارتفاع" value={form.height} onChange={handleChange} style={input} />
          </div>
        </div>

        {/* الخامة */}
        <div>
          <label>🪵 نوع الخشب</label>
          <select name="material" value={form.material} onChange={handleChange} style={input}>
            <option value="">اختر نوع الخشب</option>
            <option value="خشب زان">خشب زان</option>
            <option value="MDF">MDF</option>
            <option value="أرو">أرو</option>
            <option value="زان + قشرة طبيعية">زان + قشرة طبيعية</option>
          </select>
        </div>

        {/* اللون */}
        <div>
          <label>🎨 اللون</label>
          <input name="color" placeholder="مثال: بني غامق" value={form.color} onChange={handleChange} style={input} />
        </div>

        {/* الكمية */}
        <div>
          <label>🔢 الكمية</label>
          <input name="quantity" type="number" value={form.quantity} onChange={handleChange} style={input} />
        </div>

        {/* الميزانية */}
        <div>
          <label>💰 الميزانية المتوقعة</label>
          <input name="budget" type="number" placeholder="مثال: 5000" value={form.budget} onChange={handleChange} style={input} />
        </div>

        {/* التسليم */}
        <div>
          <label>⏰ موعد التسليم المطلوب</label>
          <input name="deadline" type="date" value={form.deadline} onChange={handleChange} style={input} />
        </div>

        {/* تفاصيل إضافية */}
        <div>
          <label>ℹ️ تفاصيل إضافية</label>
          <textarea name="extra" placeholder="أي ملاحظات أخرى..." rows={3} value={form.extra} onChange={handleChange} style={textarea} />
        </div>

        {/* صور */}
        <div>
          <label>📸 صور مرجعية (اختياري)</label>
          <input type="file" multiple accept="image/*" style={input} />
        </div>

        {/* زرار */}
        <button type="submit" style={btn}>📨 إرسال الطلب</button>
      </form>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "14px",
};

const textarea = {
  ...input,
  resize: "vertical",
};

const btn = {
  background: "#0a7",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "12px 18px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};
