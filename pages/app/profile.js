import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

export default function Profile(){
  const { data: session, status } = useSession();
  const router = useRouter();

  // لو المستخدم مش داخل → يرجّعه للوج إن
  useEffect(()=>{
    if (status === "unauthenticated") router.replace("/app/login");
  }, [status, router]);

  if (status === "loading") return <p>جارٍ التحميل…</p>;

  return (
    <div style={{display:'flex'}} dir="rtl">
      <Sidebar />
      <main style={{flex:1, padding:24}}>
        <h2>حسابي</h2>
        <p>الاسم: {session.user?.name}</p>
        <p>البريد: {session.user?.email}</p>
        <Footer />
      </main>
    </div>
  );
}
