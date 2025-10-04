// pages/admin/orders.js
import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status) params.set("status", status);
    if (type) params.set("type", type);
    const res = await fetch(`/api/orders?${params.toString()}`);
    const data = await res.json();
    setOrders(data.orders || []);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (orderId, newStatus) => {
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });
    const data = await res.json();
    if (data.success) {
      setOrders((prev) => prev.map(o => o.orderId === orderId ? data.order : o));
    } else {
      alert("خطأ في التحديث");
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "20px auto", padding: 16 }} dir="rtl">
      <h2>لوحة الطلبات</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          placeholder="بحث (رقم الطلب / اسم / تليفون / إيميل)"
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          style={{ flex: 1, padding: 10, border: "1px solid #ccc", borderRadius: 8 }}
        />
        <select value={type} onChange={(e)=>setType(e.target.value)} style={{ padding: 10, border: "1px solid #ccc", borderRadius: 8 }}>
          <option value="">كل الأنواع</option>
          <option value="ready">أثاث جاهز</option>
          <option value="carpenter">نجارين</option>
          <option value="factory">مصانع</option>
        </select>
        <select value={status} onChange={(e)=>setStatus(e.target.value)} style={{ padding: 10, border: "1px solid #ccc", borderRadius: 8 }}>
          <option value="">كل الحالات</option>
          <option value="pending">قيد الانتظار</option>
          <option value="paid">مدفوع</option>
          <option value="processing">قيد التجهيز</option>
          <option value="shipped">تم الشحن</option>
          <option value="delivered">تم التسليم</option>
          <option value="cancelled">ملغي</option>
        </select>
        <button onClick={fetchOrders} style={{ padding: "10px 16px", borderRadius: 8, border: "1px solid #0a7", background: "#0a7", color: "#fff" }}>تحديث</button>
      </div>

      {loading ? <p>جارٍ التحميل…</p> : (
        orders.length === 0 ? <p>لا توجد طلبات</p> : (
          <div style={{ display: "grid", gap: 10 }}>
            {orders.map((o) => (
              <div key={o.orderId} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <div><b>{o.orderId}</b> • {new Date(o.createdAt).toLocaleString()}</div>
                    <div style={{ color: "#555" }}>نوع الطلب: {o.orderType} • الحالة: <b>{o.status}</b></div>
                    <div style={{ color: "#555" }}>العميل: {o.customer?.name} • {o.customer?.phone}</div>
                    <div style={{ color: "#555" }}>الإجمالي: {o.total} ج.م • وسيلة الدفع: {o.payment?.method}</div>
                  </div>
                  <div>
                    <select
                      value={o.status}
                      onChange={(e)=>updateStatus(o.orderId, e.target.value)}
                      style={{ padding: 10, border: "1px solid #ccc", borderRadius: 8 }}
                    >
                      <option value="pending">قيد الانتظار</option>
                      <option value="paid">مدفوع</option>
                      <option value="processing">قيد التجهيز</option>
                      <option value="shipped">تم الشحن</option>
                      <option value="delivered">تم التسليم</option>
                      <option value="cancelled">ملغي</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: 10, color: "#444" }}>
                  <b>العناصر:</b>
                  <ul style={{ margin: "6px 0 0 0" }}>
                    {o.items?.map((it, idx) => (
                      <li key={idx}>{it.title} × {it.qty} = {it.price * it.qty} ج.م</li>
                    ))}
                  </ul>
                </div>

                {o.customer?.address && (
                  <div style={{ marginTop: 8, color: "#444" }}>
                    <b>العنوان:</b> {o.customer.address}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
