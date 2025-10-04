// pages/app/admin/orders.js
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        if (data.success && Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Fetch orders error:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, status } : o))
        );
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
        <h2>📦 إدارة الطلبات</h2>

        {loading ? (
          <p>⏳ جاري تحميل الطلبات...</p>
        ) : orders.length === 0 ? (
          <p>لا يوجد طلبات حالياً</p>
        ) : (
          <table style={table}>
            <thead>
              <tr>
                <th>رقم الطلب</th>
                <th>العميل</th>
                <th>الهاتف</th>
                <th>الإجمالي</th>
                <th>الحالة</th>
                <th>تحكم</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>{o.id || o._id}</td>
                  <td>{o.customer?.name}</td>
                  <td>{o.customer?.phone}</td>
                  <td>{fmt(o.computed?.total || 0)} ج.م</td>
                  <td>{o.status || "قيد المعالجة"}</td>
                  <td>
                    <button onClick={() => updateStatus(o._id, "processing")}>
                      🚧 قيد التنفيذ
                    </button>{" "}
                    <button onClick={() => updateStatus(o._id, "completed")}>
                      ✅ مكتمل
                    </button>{" "}
                    <button onClick={() => updateStatus(o._id, "cancelled")}>
                      ❌ ملغي
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

/* ===== Styles ===== */
const table = {
  width: "100%",
  borderCollapse: "collapse",
};

table.th = table.td = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
};
