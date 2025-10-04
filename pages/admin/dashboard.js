// pages/admin/dashboard.js
import { useState } from "react";

export default function AdminDashboard() {
  const [tab, setTab] = useState("products");

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: "#f9f9f9", padding: 20 }}>
        <h3 style={{ marginBottom: 20 }}>لوحة التحكم</h3>
        <button onClick={() => setTab("products")} style={{ display: "block", marginBottom: 10 }}>🛋️ المنتجات</button>
        <button onClick={() => setTab("orders")} style={{ display: "block", marginBottom: 10 }}>📦 الطلبات</button>
        <button onClick={() => setTab("requests")} style={{ display: "block", marginBottom: 10 }}>🛠️ طلبات العمولة</button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: 20 }}>
        {tab === "products" && <h2>إدارة المنتجات</h2>}
        {tab === "orders" && <h2>إدارة الطلبات</h2>}
        {tab === "requests" && <h2>إدارة طلبات النجارين/المصانع</h2>}
      </main>
    </div>
  );
}
