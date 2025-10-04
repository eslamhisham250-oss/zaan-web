import Link from "next/link";
import { addToCart } from "../lib/cart";

export default function ProductCard({ product }) {
  // قيم افتراضية لو المنتج مفيهوش بيانات كاملة
  const rating = product.rating || 4.5;
  const reviews = product.reviews || 120;
  const oldPrice = product.oldPrice || product.price * 1.2;
  const colors = product.colors || ["#444", "#b5651d", "#999"]; // ألوان افتراضية

  return (
    <div style={card}>
      {/* صورة + رابط التفاصيل */}
      <Link href={`/app/product/${product.id}`} legacyBehavior>
        <a style={{ textDecoration: "none", color: "inherit" }}>
          <div style={thumb}>
            <img
              src={product.image || "/images/bed_real.jpg"}
              alt={product.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={info}>
            {/* الاسم */}
            <h3 style={title}>{product.title}</h3>

            {/* تقييم */}
            <div style={ratingBox}>
              <span style={{ color: "#f5a623" }}>★</span> {rating}
              <span style={{ color: "#777", fontSize: 12 }}> ({reviews})</span>
            </div>

            {/* السعر والخصم */}
            <div style={priceBox}>
              <span style={oldPriceStyle}>{oldPrice} ج.م</span>
              <span style={newPrice}>{product.price} ج.م</span>
            </div>

            {/* الألوان */}
            <div style={colorsBox}>
              {colors.map((c, i) => (
                <span key={i} style={{ ...colorDot, background: c }}></span>
              ))}
            </div>
          </div>
        </a>
      </Link>

      {/* زر صغير Add to Cart */}
      <button
        style={btn}
        onClick={() => {
          addToCart(product);
          alert("تمت إضافة المنتج إلى العربة ✅");
        }}
      >
        🛒
      </button>
    </div>
  );
}

/* ====== Styles ====== */
const card = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: 14,
  overflow: "hidden",
  boxShadow: "0 2px 6px rgba(0,0,0,.04)",
  display: "flex",
  flexDirection: "column",
  position: "relative",
};
const thumb = {
  height: 160,
  background: "#f9fafb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const info = {
  padding: "12px 14px",
};
const title = { margin: "6px 0", fontSize: 16, fontWeight: 600 };
const ratingBox = { fontSize: 14, margin: "4px 0" };
const priceBox = {
  display: "flex",
  gap: 8,
  alignItems: "center",
  margin: "4px 0",
};
const oldPriceStyle = {
  textDecoration: "line-through",
  color: "#888",
  fontSize: 13,
};
const newPrice = { fontSize: 15, fontWeight: 600, color: "#0a7" };
const colorsBox = {
  display: "flex",
  gap: 6,
  marginTop: 6,
};
const colorDot = {
  width: 16,
  height: 16,
  borderRadius: "50%",
  border: "1px solid #ccc",
};
const btn = {
  position: "absolute",
  top: 10,
  right: 10,
  background: "#0a7",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: 32,
  height: 32,
  cursor: "pointer",
};
