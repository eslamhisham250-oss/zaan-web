import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function AdminUsers() {
  const { data, error } = useSWR("/api/users", fetcher);

  if (error) return <p>❌ خطأ في تحميل المستخدمين</p>;
  if (!data) return <p>⏳ جاري التحميل...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>👥 إدارة المستخدمين</h2>
      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>الاسم</th>
            <th>البريد</th>
            <th>الوظيفة</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
