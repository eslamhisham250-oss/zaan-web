// components/Layout.js
import Navbar from "./Navbar";
import Image from "next/image";

export default function Layout({ children }) {
  return (
    <div dir="rtl">
      {/* ✅ Navbar في الأعلى وليس على الجانب */}
      <Navbar />

      {/* ✅ المحتوى الرئيسي */}
      <main style={{ padding: "10px", position: "relative" }}>
        {/* ✅ اللوجو في أعلى اليمين */}
        {/* ✅ المحتوى الأساسي */}
        <div style={{ marginTop: 0 }}>{children}</div>
      </main>
    </div>
  );
}
