// pages/index.js
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home() {
  const tiles = [
    {
      href: "/app/request/carpenters",
      title: "طلب من نجارين",
      desc: "اصنع قطعك الخاصة مع أمهر النجارين.",
      image: "/illustrations/carpenter.png",
      emoji: "🪚",
    },
    {
      href: "/app/request/factories",
      title: "طلب من مصانع",
      desc: "كميات كبيرة وجودة ثابتة من خطوط الإنتاج.",
      image: "/illustrations/factory.png",
      emoji: "🏭",
    },
    {
      href: "/app/buy",
      title: "أثاث جاهز",
      desc: "تسوق أفضل العروض والمنتجات الجاهزة.",
      image: "/illustrations/ready.png",
      emoji: "🛋️",
    },
    {
      href: "/app/ai",
      title: "تصميم بالذكاء الصناعي",
      desc: "حوّل فكرتك إلى تصميم مقترح فورًا.",
      image: "/illustrations/ai.png",
      emoji: "🤖",
    },
    {
      href: "/app/hire",
      title: "استئجار مهندس ديكور",
      desc: "مهندس ديكور يجهّزلك تصور متكامل لمساحتك.",
      image: "/illustrations/designer.png",
      emoji: "🏠",
    },
  ];

  return (
    <Layout>
      {/* HERO */}
      <section style={heroWrap}>
        <div>
          <h1 style={h1}>أساسك يبدأ من هنا</h1>
          <p style={sub}>
            نجارين ومصانع وأثاث جاهز وتصميمات ذكية — كلهم في مكان واحد.
          </p>
          <div style={{ marginTop: 16 }}>
            <Link href="/app/buy" legacyBehavior>
              <a style={ctaPrimary}>تسوّق الآن</a>
            </Link>
            <Link href="/app/request/carpenters" legacyBehavior>
              <a style={ctaGhost}>ابدأ طلب خاص</a>
            </Link>
          </div>
        </div>
      </section>

      {/* TILES */}
      <section style={{ marginTop: 28 }}>
        <h2 style={h2}>كيف نقدر نساعدك؟</h2>
        <div style={grid}>
          {tiles.map((t) => (
            <Link key={t.href} href={t.href} legacyBehavior>
              <a style={card}>
                <div style={thumb}>
                  <img
                    src={t.image}
                    alt={t.title}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement.querySelector(".emoji").style.display =
                        "flex";
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                  <div
                    className="emoji"
                    style={{
                      display: "none",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 42,
                    }}
                  >
                    {t.emoji}
                  </div>
                </div>
                <div>
                  <h3 style={cardTitle}>{t.title}</h3>
                  <p style={cardDesc}>{t.desc}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

/* ====== styles ====== */
const heroWrap = {
  background: "linear-gradient(135deg,#f0fff6,#f7fbff)",
  border: "1px solid #e9f0f3",
  borderRadius: 16,
  padding: "28px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const h1 = { margin: 0, fontSize: 28, fontWeight: 700 };
const sub = { margin: "8px 0 0", color: "#555" };
const h2 = { margin: "8px 0 16px", fontSize: 20 };

const ctaPrimary = {
  background: "#0a7",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: 10,
  marginInlineStart: 0,
  textDecoration: "none",
  display: "inline-block",
};
const ctaGhost = {
  marginInlineStart: 12,
  color: "#0a7",
  border: "1px solid #0a7",
  padding: "10px 16px",
  borderRadius: 10,
  textDecoration: "none",
  display: "inline-block",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: 16,
};

const card = {
  display: "block",
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: 14,
  padding: 14,
  textDecoration: "none",
  color: "#222",
  transition: "transform .15s ease, box-shadow .15s ease",
  boxShadow: "0 2px 6px rgba(0,0,0,.04)",
};
const thumb = {
  width: "100%",
  height: 120,
  marginBottom: 10,
  background: "#f9fafb",
  border: "1px dashed #e7eaee",
  borderRadius: 10,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const cardTitle = { margin: "6px 0 4px", fontSize: 16, fontWeight: 700 };
const cardDesc = { margin: 0, color: "#666", lineHeight: 1.5 };
