import { useState } from "react";

export default function NewRequest() {
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
    const res = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("✅ تم إرسال الطلب بنجاح");
      setForm({});
    } else {
      alert("❌ حدث خطأ أثناء إرسال الطلب");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: "0 auto" }} dir="rtl">
      <h1>✍️ طلب تصنيع مخصص</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        
        <input
          name="title"
          placeholder="عنوان الطلب (مثال: مكتب خشبي مودرن)"
          value={form.title || ""}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="الوصف التفصيلي للقطعة"
          rows={4}
          value={form.description || ""}
          onChange={handleChange}
          required
        />

        <div style={{ display: "flex", gap: 10 }}>
          <input
            name="length"
            type="number"
            placeholder="الطول (سم)"
            value={form.length || ""}
            onChange={handleChange}
          />
          <input
            name="width"
            type="number"
            placeholder="العرض (سم)"
            value={form.width || ""}
            onChange={handleChange}
          />
          <input
            name="height"
            type="number"
            placeholder="الارتفاع (سم)"
            value={form.height || ""}
            onChange={handleChange}
          />
        </div>

        <select name="material" value={form.material || ""} onChange={handleChange}>
          <option value="">اختر الخامة</option>
          <option value="خشب زان">خشب زان</option>
          <option value="MDF">MDF</option>
          <option value="معدن">معدن</option>
          <option value="زجاج">زجاج</option>
        </select>

        <input
          name="color"
          placeholder="اللون المطلوب"
          value={form.color || ""}
          onChange={handleChange}
        />

        <input
          name="quantity"
          type="number"
          placeholder="عدد القطع"
          value={form.quantity || ""}
          onChange={handleChange}
        />

        <input
          name="budget"
          type="number"
          placeholder="الميزانية المتوقعة (اختياري)"
          value={form.budget || ""}
          onChange={handleChange}
        />

        <input
          name="deadline"
          type="date"
          value={form.deadline || ""}
          onChange={handleChange}
        />

        <textarea
          name="extra"
          placeholder="تفاصيل إضافية"
          rows={3}
          value={form.extra || ""}
          onChange={handleChange}
        />

        {/* رفع صور مرجعية */}
        <input type="file" multiple accept="image/*" />

        <button type="submit" style={btn}>📨 إرسال الطلب</button>
      </form>
    </div>
  );
}

const btn = {
  background: "#0a7",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "10px 16px",
  cursor: "pointer",
  fontSize: 16,
};
