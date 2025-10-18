// components/Navbar.js
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        width: "100%",
        background: "#F7F3EF",
        borderBottom: "1px solid #E5E0DC",
        padding: "10px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
            <header className="nav">
                      <div className="nav__in">
                        <a href="/" className="logo">
                          <img src="/images/logo.png" alt="ZAAN logo" />
                          <div className="logo__title"></div>
                        </a>
            
                        <nav className="menu" aria-label="Main">
                          <a className="btn btn--ghost" href="#services">الخدمات</a>
                          <Link className="btn btn--ghost" href="#furniture">الأثاث</Link>
                          <Link className="btn btn--ghost" href="app/carpenters">النجارين</Link> 
                          <Link className="btn btn--ghost" href="app/factories">المصانع</Link>
                          <Link className="btn btn--ghost" href="app/ai">الذكاء الصناعي</Link>
                          <Link className="btn btn--ghost" href="app/hire">مهندس ديكور</Link>
                          <a className="btn btn--ghost" href="#about">عنّا</a>
                          <a className="btn btn--primary" href="/booking">احجز الآن</a>
                          <a className="cart" href="/cart">
                            <span>العربة</span><span className="dot" id="cartCount">2</span>
                          </a>
                        </nav>
            
                        <div className="auth">
                          <a href="app/login" className="btn btn--login">تسجيل الدخول</a>
                        </div>
                      </div>
                    </header>

      {/* ✅ زر القائمة في الموبايل */}
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          cursor: "pointer",
          fontSize: 20,
          display: "none",
        }}
        className="mobile-menu-icon"
      >
        ☰
      </div>

      {/* ✅ قائمة الموبايل المنسدلة */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "70px",
            right: "20px",
            background: "#fff",
            border: "1px solid #eee",
            borderRadius: 8,
            padding: 15,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <Link href="/app/buy">المنتجات</Link>
          <Link href="/app/request/carpenters">النجارين</Link>
          <Link href="/app/request/factories">المصانع</Link>
          <Link href="/app/ai">تصميم بالذكاء الصناعي</Link>
          <Link href="/app/hire">مهندس ديكور</Link>
        </div>
      )}
    </header>
  );
}
