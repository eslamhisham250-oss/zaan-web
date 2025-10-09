// components/Layout.js
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Image from "next/image";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex" }} dir="rtl">
      {/* ✅ Sidebar على اليمين */}
      <Sidebar />

      {/* ✅ المحتوى */}
      <main style={{ flex: 1, padding: "24px", position: "relative" }}>
        {/* ✅ اللوجو أعلى اليمين */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          <Image
            src="/logo.png"
            alt="Zaan logo"
            width={100}   // 👈 حجم أكبر
            height={100}  // 👈 حجم أكبر
            priority
          />
        </div>

        {/* ✅ المحتوى الأساسي تحت اللوجو */}
        <div style={{ marginTop: 130 }}>{children}</div>

        {/* ✅ الفوتر */}
        <Footer />
      </main>
    </div>
  );
}
