// pages/app/orders.js
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

export default function OrdersPage() {
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

  return (
    <Layout>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: 20 }}>
        <h2>📦 الطلبات</h2>

        {loading ? (
          <p>⏳ جاري التحميل...</p>
        ) : orders.length === 0 ? (
          <p>لا يوجد طلبات حالياً</p>
        ) : (
          <div style={{ display: "grid", gap: 14 }}>
            {orders.map((o) => (
              <div key={o._id} style={card}>
                <div style={row}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>
                    🆔 {o.id || o._id.toString()}
                  </div>
                  <div style={{ color: "#555" }}>
                    {new Date(o.createdAt).toLocaleString("ar-EG")}
                  </div>
                </div>

                <div style={{ marginTop: 6 }}>
                  <b>الإجمالي:</b> {fmt(o.computed?.total || 0)} ج.م
                </div>
                {o.computed?.upfront > 0 && (
                  <div>
                    <b>المقدم:</b> {fmt(o.computed.upfront)} ج.م (
                    {Math.round((o.computed.upfrontPercent || 0) * 100)}%)
                  </div>
                )}
                {o.computed?.planText && (
                  <div style={{ color: "#444", fontSize: 13 }}>
                    💡 {o.computed.planText}
                  </div>
                )}

                <div style={{ marginTop: 6 }}>
                  <b>الحالة:</b>{" "}
                  <span style={{ color: statusColor(o.status) }}>
                    {o.status || "قيد المعالجة"}
                  </span>
                </div>

                <div style={{ marginTop: 6 }}>
                  👤 {o.customer?.name} | 📞 {o.customer?.phone}
                </div>
                <div style={{ color: "#666", fontSize: 13 }}>
                  {o.customer?.address}
                </div>

                {Array.isArray(o.items) && o.items.length > 0 && (
                  <ul style={{ marginTop: 6, paddingInlineStart: 20 }}>
                    {o.items.map((it) => (
                      <li key={it.id}>
                        {it.title} × {it.qty} = {fmt(it.price * it.qty)} ج.م
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
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

function statusColor(status) {
  switch (status) {
    case "received":
      return "blue";
    case "processing":
      return "orange";
    case "completed":
      return "green";
    case "cancelled":
      return "red";
    default:
      return "#555";
  }
}

/* ===== Styles ===== */
const card = {
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 14,
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
