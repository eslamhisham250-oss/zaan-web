import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/app/login");
    }
  }, [session, status]);

  if (status === "loading") return <p>جارِ التحقق...</p>;
  if (!session) return null;

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 لوحة التحكم</h1>
      <ul>
        <li><a href="/admin/products">إدارة المنتجات</a></li>
        <li><a href="/admin/orders">إدارة الطلبات</a></li>
        <li><a href="/admin/users">إدارة المستخدمين</a></li>
      </ul>
    </div>
  );
}
