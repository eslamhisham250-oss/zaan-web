import { useState } from "react";

export default function HireDesignerPage() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", city: "",
    space: "", style: "", budget: "", deadline: "",
    details: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      alert("❌ يرجى إدخال الاسم ورقم الموبايل على الأقل.");
      return;
    }
    alert("✅ تم إرسال طلب استئجار مهندس ديكور!");
  };

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: 24 }}>
      <h2 style={{ marginBottom: 10 }}>🏠 استئجار مهندس ديكور</h2>
      <p style={{ color: "#555", marginBottom: 20 }}>
        زودنا بالتفاصيل التالية وسنوصلك بمهندس ديكور مناسب حسب طلبك.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
        <div>
          <label style={label}>👤 الاسم</label>
          <input style={input} name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div>
          <label style={label}>📞 رقم الموبايل</label>
          <input style={input} name="phone" value={form.phone} onChange={handleChange} required />
        </div>

        <div>
          <label style={label}>✉️ البريد الإلكتروني</label>
          <input style={input} type="email" name="email" value={form.email} onChange={handleChange} />
        </div>

        <div>
          <label style={label}>🏙️ المدينة</label>
          <input style={input} name="city" value={form.city} onChange={handleChange} />
        </div>

        <div>
          <label style={label}>🏢 نوع الفراغ</label>
          <select style={input} name="space" value={form.space} onChange={handleChange}>
            <option value="">اختر</option>
            <option>شقة</option>
            <option>فيلا</option>
            <option>مكتب</option>
            <option>محل</option>
          </select>
        </div>

        <div>
          <label style={label}>🎨 الستايل المفضل</label>
          <select style={input} name="style" value={form.style} onChange={handleChange}>
            <option value="">اختر</option>
            <option>مودرن</option>
            <option>كلاسيك</option>
            <option>سكاندناف</option>
            <option>بوهو</option>
            <option>إندستريال</option>
          </select>
        </div>

        <div>
          <label style={label}>💰 الميزانية المتوقعة</label>
          <input style={input} name="budget" value={form.budget} onChange={handleChange} placeholder="مثال: 50000 جنيه" />
        </div>

        <div>
          <label style={label}>⏰ موعد التسليم</label>
          <input style={input} type="date" name="deadline" value={form.deadline} onChange={handleChange} />
        </div>

        <div>
          <label style={label}>📝 تفاصيل إضافية</label>
          <textarea style={textarea} name="details" rows={4} value={form.details} onChange={handleChange} placeholder="مثال: محتاج تصميم 3 غرف + مطبخ" />
        </div>

        <button style={btn} type="submit">📩 إرسال الطلب</button>
      </form>
    </div>
  );
}

/* ===== Styles ===== */
const label = { display: "block", marginBottom: 6, fontWeight: 600, fontSize: 15, color: "#333" };
const input = { width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: 8, background: "#fff", fontSize: 14 };
const textarea = { ...input, resize: "vertical" };
const btn = {
  background: "#0a7",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "12px 20px",
  cursor: "pointer",
  fontSize: 16,
  fontWeight: "bold",
  marginTop: 10,
};
