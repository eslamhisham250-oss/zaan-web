import { useState, useEffect } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    oldPrice: "",
    description: "",
    shipping: "",
    warranty: "",
  });

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]);
      });
  }, []);

  const addProduct = async () => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newProduct = await res.json();
    setProducts((prev) => [...prev, newProduct]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📦 إدارة المنتجات</h1>

      {/* فورم الإضافة */}
      <div style={{ marginBottom: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input placeholder="اسم المنتج" onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="السعر" type="number" onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input placeholder="السعر قبل الخصم" type="number" onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} />
        <input placeholder="الوصف" onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input placeholder="الشحن" onChange={(e) => setForm({ ...form, shipping: e.target.value })} />
        <input placeholder="الضمان" onChange={(e) => setForm({ ...form, warranty: e.target.value })} />
        <button onClick={addProduct}>➕ إضافة منتج</button>
      </div>

      {/* جدول عرض المنتجات */}
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ background: "#eee" }}>
            <th>الاسم</th>
            <th>السعر</th>
            <th>السعر قبل الخصم</th>
            <th>الوصف</th>
            <th>الشحن</th>
            <th>الضمان</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>{p.oldPrice}</td>
                <td>{p.description}</td>
                <td>{p.shipping}</td>
                <td>{p.warranty}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
                لا يوجد منتجات بعد 🚫
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
