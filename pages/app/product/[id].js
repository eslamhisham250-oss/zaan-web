// pages/app/product/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import { addToCart } from "../../../lib/cart";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // منتجات افتراضية (fallback)
  const fallbackProducts = [
    { 
      id: "1", 
      title: "سرير خشب طبيعي مع تخزين", 
      price: 2500,
      oldPrice: 3000,
      image: "/images/bed_real.jpg", 
      images: ["/images/bed_real.jpg","/images/bed_real_side.jpg","/images/bed_real_size.jpg"],
      description: "سرير خشبي أنيق مصنوع من خشب طبيعي عالي الجودة مع وحدة تخزين سفلية.",
      material: "خشب طبيعي + MDF",
      color: "بني غامق",
      size: ["200x160 سم", "220x180 سم"],
      rating: 4.6,
      reviews: 180,
      shipping: "يصل خلال 7 أيام - شحن مجاني",
      returnPolicy: "إرجاع مجاني خلال 14 يوم",
      warranty: "ضمان سنتين على الخشب والتجميع",
      colors: ["#8B4513", "#444", "#D2B48C"],
      stock: 5,
      specs: {
        "بلد الصنع": "مصر",
        "الوزن": "45 كجم",
        "الخامة": "خشب طبيعي + MDF",
      },
      related: [
        { id:"2", title:"سرير مودرن", image:"/images/bed2.jpg", price:2200 },
        { id:"3", title:"دولاب خشبي", image:"/images/wardrobe.jpg", price:3200 },
      ],
      customerReviews: [
        { user:"أحمد", rating:5, comment:"منتج ممتاز وجودة عالية 👌" },
        { user:"منى", rating:4, comment:"حلو جداً بس الشحن اتأخر يوم" }
      ]
    }
  ];

  useEffect(() => {
    if (id) {
      fetch("/api/products")
        .then((r) => r.json())
        .then((data) => {
          let found = data.find((p) => String(p.id) === String(id));
          if (!found) found = fallbackProducts.find((p) => String(p.id) === String(id));
          setProduct(found);
          if (found?.images?.length) setMainImage(found.images[0]);
        })
        .catch(() => {
          const found = fallbackProducts.find((p) => String(p.id) === String(id));
          setProduct(found);
          if (found?.images?.length) setMainImage(found.images[0]);
        });
    }
  }, [id]);

  if (!product) return <p style={{ padding: 24 }}>⏳ جارٍ تحميل المنتج...</p>;

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }} dir="rtl">
      {/* Breadcrumbs */}
      <div style={{ fontSize: 14, marginBottom: 12, color: "#666" }}>
        الرئيسية &gt; غرف نوم &gt; أسرة &gt; <span style={{ color: "#0a7" }}>{product.title}</span>
      </div>

      {/* صور + تفاصيل أساسية */}
      <div style={container}>
        <div style={imageBox}>
          {mainImage && (
            <img src={mainImage} alt={product.title} style={{ width: "75%", borderRadius: 12, margin: "0 auto", display: "block" }} />
          )}
          <div style={thumbs}>
            {product.images?.length > 0 ? product.images.map((img, i) => (
              <img key={i} src={img} alt={`preview-${i}`} style={{
                width: 70, height: 70, objectFit: "cover",
                borderRadius: 8, border: mainImage === img ? "2px solid #0a7" : "1px solid #ccc",
                cursor: "pointer"
              }} onClick={() => setMainImage(img)} />
            )) : <p style={{ color:"#888" }}>لا توجد صور إضافية</p>}
          </div>
        </div>

        <div style={infoBox}>
          <h1>{product.title}</h1>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
            <p style={{ fontSize: 24, fontWeight: "bold", color: "#0a7" }}>{product.price} ج.م</p>
            {product.oldPrice && (
              <>
                <p style={{ textDecoration: "line-through", color: "#888", fontSize: 16 }}>{product.oldPrice} ج.م</p>
                <span style={{ background: "#f33", color: "#fff", padding: "3px 8px", borderRadius: 6, fontSize: 13, fontWeight: "bold" }}>
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </span>
              </>
            )}
          </div>
          <p style={{ fontSize: 13, color: "#666" }}>السعر شامل الضريبة</p>

          {/* Selling Points */}
          <div style={{ display: "flex", gap: 20, fontSize: 14, margin: "10px 0", color: "#444" }}>
            <div>🔒 دفع آمن</div>
            <div>🚚 شحن سريع</div>
            <div>🛡️ ضمان معتمد</div>
          </div>

          {/* المخزون */}
          <p style={{ fontSize: 14, color: product.stock > 0 ? "#0a7" : "red" }}>
            {product.stock > 0 ? `متاح (${product.stock} قطع)` : "غير متاح"}
          </p>

          {/* مقاسات */}
          <div style={{ margin: "12px 0" }}>
            <b>المقاس:</b>
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
              {Array.isArray(product.size) ? product.size.map((s, i) => (
                <button key={i} onClick={() => setSelectedSize(s)} style={{
                  padding: "6px 12px", borderRadius: 6,
                  border: selectedSize === s ? "2px solid #0a7" : "1px solid #ccc", cursor: "pointer"
                }}>
                  {s}
                </button>
              )) : <span>{product.size}</span>}
            </div>
          </div>

          {/* ألوان */}
          <div style={{ margin: "12px 0" }}>
            <b>الألوان:</b>
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
              {product.colors?.length > 0 ? product.colors.map((c, i) => (
                <span key={i} onClick={() => setSelectedColor(c)} style={{
                  width: 24, height: 24, borderRadius: "50%",
                  border: selectedColor === c ? "2px solid #0a7" : "1px solid #ccc",
                  background: c, cursor: "pointer"
                }}></span>
              )) : <p style={{ color:"#888" }}>لا توجد ألوان متاحة</p>}
            </div>
          </div>

          {/* أزرار */}
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <button style={btn} onClick={() => { addToCart(product); alert("✅ تمت إضافة المنتج إلى العربة"); }}>🛒 أضف إلى العربة</button>
            <button style={{ ...btn, background: "#f33" }}>🚀 اشترِ الآن</button>
          </div>
        </div>
      </div>

      {/* الوصف */}
      <section style={{ marginTop: 40 }}>
        <h2>الوصف</h2>
        <p style={{ color:"#555", marginTop: 10 }}>{product.description || "لا يوجد وصف متاح"}</p>
      </section>

      {/* المواصفات */}
      <section style={{ marginTop: 40 }}>
        <h2>المواصفات</h2>
        {product.specs ? (
          <table style={table}>
            <tbody>
              {Object.entries(product.specs).map(([k,v],i)=>(
                <tr key={i}><td>{k}</td><td>{v}</td></tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color:"#888" }}>لا توجد مواصفات متاحة لهذا المنتج</p>
        )}
      </section>

      {/* التقييمات */}
      <section style={{ marginTop: 40 }}>
        <h2>التقييمات</h2>
        {product.customerReviews?.length > 0 ? product.customerReviews.map((r,i)=>(
          <div key={i} style={reviewCard}>
            <b>{r.user}</b> ⭐ {r.rating}
            <p>{r.comment}</p>
          </div>
        )) : <p style={{ color:"#888" }}>لا توجد تقييمات حالياً</p>}
      </section>

      {/* منتجات مشابهة */}
      <section style={{ marginTop: 40 }}>
        <h2>منتجات مشابهة</h2>
        <div style={similarBox}>
          {product.related?.length > 0 ? product.related.map((rp)=>(
            <div key={rp.id} style={similarItem}>
              <img src={rp.image} alt={rp.title} style={{ width:"100%", borderRadius:8, marginBottom:6 }} />
              <div>{rp.title}</div>
              <div style={{ color:"#0a7", fontWeight:"bold" }}>{rp.price} ج.م</div>
            </div>
          )) : <p style={{ color:"#888" }}>لا توجد منتجات مشابهة</p>}
        </div>
      </section>

      {/* مشاركة */}
      <section style={{ marginTop: 30 }}>
        <b>شارك المنتج:</b>
        <div style={{ display:"flex", gap:12, marginTop:6 }}>
          <button style={shareBtn}>واتساب</button>
          <button style={shareBtn}>فيسبوك</button>
          <button style={shareBtn}>تويتر</button>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ===== Styles ===== */
const container = { display: "flex", gap: 24, flexWrap: "wrap" };
const imageBox = { flex: 1, minWidth: 320 };
const thumbs = { display: "flex", gap: 8, marginTop: 12, overflowX: "auto" };
const infoBox = { flex: 1, minWidth: 280 };
const btn = { background: "#0a7", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", cursor: "pointer", fontSize: 16, fontWeight: "bold" };
const table = { width: "100%", borderCollapse: "collapse", fontSize: 14, color: "#333" };
const reviewCard = { background:"#f9f9f9", border:"1px solid #ddd", borderRadius:8, padding:12, marginBottom:10 };
const similarBox = { display:"flex", gap:12, marginTop:12, flexWrap:"wrap" };
const similarItem = { background:"#fff", border:"1px solid #ddd", borderRadius:8, padding:12, flex:"0 0 180px", textAlign:"center" };
const shareBtn = { background:"#eee", border:"1px solid #ccc", borderRadius:6, padding:"6px 12px", cursor:"pointer" };
