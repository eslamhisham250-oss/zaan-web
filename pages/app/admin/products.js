import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: "", price: "", image: "", category: "" });

  const loadProducts = () => {
    fetch("/api/products")
      .then(r => r.json())
      .then(setProducts);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async () => {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ title: "", price: "", image: "", category: "" });
    loadProducts();
  };

  const deleteProduct = async (id) => {
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadProducts();
  };

  return (
    <div style={{ display: "flex" }} dir="rtl">
      <Sidebar />
      <main style={{ flex: 1, padding: 24 }}>
        <h2>إدارة المنتجات</h2>

        {/* Form لإضافة منتج */}
        <div style={{ marginBottom: 24 }}>
          <input
            placeholder="اسم المنتج"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={input}
          />
          <input
            placeholder="السعر"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            style={input}
          />
          <input
            placeholder="رابط الصورة"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            style={input}
          />
          <input
            placeholder="التصنيف"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            style={input}
          />
          <button style={btn} onClick={addProduct}>إضافة منتج</button>
        </div>

        {/* جدول المنتجات */}
        <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>الصورة</th>
              <th>الاسم</th>
              <th>السعر</th>
              <th>التصنيف</th>
              <th>تحكم</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td><img src={p.image || "/images/bed.png"} alt={p.title} width="60" /></td>
                <td>{p.title}</td>
                <td>{p.price} ج.م</td>
                <td>{p.category}</td>
                <td>
                  <button onClick={() => deleteProduct(p.id)} style={btnDel}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Footer />
      </main>
    </div>
  );
}

const input = { margin: "0 6px 8px 0", padding: 6, border: "1px solid #ccc", borderRadius: 6 };
const btn = { padding: "6px 12px", background: "#0a7", color: "#fff", border: "none", borderRadius: 6 };
const btnDel = { padding: "4px 8px", background: "red", color: "#fff", border: "none", borderRadius: 6 };
