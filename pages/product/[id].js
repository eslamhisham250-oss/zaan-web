import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { addToCart } from "../../lib/cart";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (id) {
      fetch("/api/products")
        .then((r) => r.json())
        .then((data) => {
          const found = data.find((p) => String(p.id) === String(id));
          if (found) {
            found.images = found.images || [
              found.image || "/images/bed_real.jpg",
              "/images/bed_real_side.jpg",
              "/images/bed_real_size.jpg",
            ];
            setProduct(found);
            setMainImage(found.images[0]);
          }
        })
        .catch((e) => console.error("Error loading products:", e));
    }
  }, [id]);

  if (!product) return <p style={{ padding: 24 }}>جارٍ تحميل المنتج...</p>;

  return (
    <div style={{ display: "flex" }} dir="rtl">
      <main style={{ flex: 1, padding: 24 }}>
        <div style={container}>
          {/* الصور */}
          <div style={imageBox}>
            <img
              src={mainImage}
              alt={product.title}
              style={{ width: "100%", borderRadius: 12 }}
            />
            <div style={thumbs}>
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`preview-${i}`}
                  style={{
                    width: 70,
                    height: 70,
                    objectFit: "cover",
                    borderRadius: 8,
                    border: mainImage === img ? "2px solid #0a7" : "1px solid #ccc",
                    cursor: "pointer",
                  }}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {/* معلومات */}
          <div style={infoBox}>
            <h1 style={{ margin: "0 0 12px" }}>{product.title}</h1>

            {/* سعر قبل وبعد خصم إن وجد */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              {product.originalPrice && (
                <span style={{ color: "#999", textDecoration: "line-through" }}>
                  {product.originalPrice} ج.م
                </span>
              )}
              <span style={{ fontSize: 20, fontWeight: "bold", color: "#0a7" }}>
                {product.price} ج.م
              </span>
              {product.discount && (
                <span style={{ color: "#e11", fontWeight: 600 }}>
                  -{product.discount}%
                </span>
              )}
            </div>

            <p style={{ margin: "12px 0", color: "#555" }}>
              {product.description || "وصف قصير للمنتج سيظهر هنا."}
            </p>

            <button
              style={btn}
              onClick={() => {
                addToCart(product);
                alert("تمت إضافة المنتج إلى العربة ✅");
              }}
            >
              🛒 أضف إلى العربة
            </button>

            <ul style={{ marginTop: 20, color: "#333" }}>
              <li>الخامة: {product.material || "خشب MDF"}</li>
              <li>اللون: {product.color || "رمادي"}</li>
              <li>المقاسات: {product.size || "200x160 سم"}</li>
            </ul>
          </div>
        </div>

        {/* مشابه */}
        <section style={{ marginTop: 40 }}>
          <h2>منتجات مشابهة</h2>
          <div style={similarBox}>
            <div style={similarItem}>🛏️ سرير آخر</div>
            <div style={similarItem}>🪑 كرسي</div>
            <div style={similarItem}>☕ طاولة</div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

/* ====== Styles ====== */
const container = {
  display: "flex",
  gap: 24,
  flexWrap: "wrap",
};
const imageBox = {
  flex: 1,
  minWidth: 320,
};
const thumbs = {
  display: "flex",
  gap: 8,
  marginTop: 12,
  overflowX: "auto",
};
const infoBox = {
  flex: 1,
  minWidth: 280,
};
const btn = {
  background: "#0a7",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "10px 18px",
  cursor: "pointer",
  fontSize: 16,
};
const similarBox = {
  display: "flex",
  gap: 12,
  marginTop: 12,
};
const similarItem = {
  background: "#f7f7f7",
  padding: 16,
  borderRadius: 8,
  flex: "0 0 150px",
  textAlign: "center",
};
