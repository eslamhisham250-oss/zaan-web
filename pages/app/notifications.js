import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

export default function NotificationsPage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("/api/notifications")
      .then(res => res.json())
      .then(data => setList(data.notifications || []));
  }, []);

  return (
    <Layout>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
        <h2>🔔 الإشعارات</h2>
        {list.length === 0 ? <p>لا توجد إشعارات بعد</p> : (
          <ul>
            {list.map(n => (
              <li key={n._id} style={{ marginBottom: 12, padding: 12, border:"1px solid #eee", borderRadius:8 }}>
                <b>{n.title}</b>
                <p>{n.message}</p>
                <small style={{ color:"#666" }}>{new Date(n.createdAt).toLocaleString("ar-EG")}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
