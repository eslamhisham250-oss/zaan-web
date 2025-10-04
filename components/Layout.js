// components/Layout.js
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex" }} dir="rtl">
      <Sidebar />   {/* القائمة الجانبية */}
      <main style={{ flex: 1, padding: 24 }}>
        {children}
        <Footer />  {/* الفوتر تحت المحتوى */}
      </main>
    </div>
  );
}
