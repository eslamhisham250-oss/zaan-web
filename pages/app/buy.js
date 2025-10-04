import { useEffect, useState } from "react";
import Searchbar from "../../components/Searchbar";
import ProductCard from "../../components/ProductCard";

export default function BuyPage() {
  const fallbackProducts = [
    { 
      id: "1", 
      title: "سرير خشبي بسيط", 
      price: 2500, 
      image: "/images/bed_real.jpg", 
      category: "غرف نوم" 
    },
    { 
      id: "2", 
      title: "مكتب عملي", 
      price: 1200, 
      image: "/images/desk_real.jpg", 
      category: "مكاتب" 
    },
    { 
      id: "3", 
      title: "طاولة قهوة", 
      price: 600, 
      image: "/images/coffee_table_real.jpg", 
      category: "طاولات" 
    },
    { 
      id: "4", 
      title: "كرسي مريح", 
      price: 750, 
      image: "/images/chair_real.jpg", 
      category: "كراسي" 
    },
    { 
      id: "5", 
      title: "مكتبة كتب", 
      price: 1800, 
      image: "/images/bookshelf_real.jpg", 
      category: "مكاتب" 
    },
  ];

  const categories = [
    { name: "الكل", emoji: "✨" },
    { name: "غرف نوم", emoji: "🛏️" },
    { name: "مكاتب", emoji: "💼" },
    { name: "غرف معيشة", emoji: "🛋️" },
    { name: "غرف سفرة", emoji: "🍽️" },
    { name: "مطابخ", emoji: "🍳" },
    { name: "كراسي", emoji: "🪑" },
    { name: "دواليب", emoji: "🚪" },
    { name: "طاولات", emoji: "🪵" },
    { name: "إضاءة", emoji: "💡" },
    { name: "ستائر", emoji: "🪟" },
    { name: "سجاد", emoji: "🧶" },
    { name: "ديكور", emoji: "🎨" },
    { name: "مستلزمات أطفال", emoji: "🧸" },
    { name: "مستلزمات حمام", emoji: "🚿" },
  ];

  const [products, setProducts] = useState(fallbackProducts);
  const [filtered, setFiltered] = useState(fallbackProducts);
  const [activeCat, setActiveCat] = useState("الكل");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
          setFiltered(data);
        } else {
          setProducts(fallbackProducts);
          setFiltered(fallbackProducts);
        }
      })
      .catch(() => {
        setProducts(fallbackProducts);
        setFiltered(fallbackProducts);
      });
  }, []);

  const onSearch = (q) => {
    let list = products;
    if (activeCat !== "الكل") {
      list = list.filter((p) => p.category === activeCat);
    }
    if (q) {
      list = list.filter(
        (p) =>
          (p.title && p.title.includes(q)) ||
          (p.category && p.category.includes(q))
      );
    }
    setFiltered(list);
  };

  const filterByCategory = (cat) => {
    setActiveCat(cat);
    let list = products;
    if (cat !== "الكل") list = list.filter((p) => p.category === cat);
    setFiltered(list);
  };

  return (
    <div style={{ padding: 24 }} dir="rtl">
      <h2>أثاث جاهز</h2>
      <Searchbar onSearch={onSearch} />

      {/* Categories Bar */}
      <div style={catBar}>
        {categories.map((c) => (
          <button
            key={c.name}
            onClick={() => filterByCategory(c.name)}
            style={{
              ...catBtn,
              background: activeCat === c.name ? "#0a7" : "#fff",
              color: activeCat === c.name ? "#fff" : "#333",
            }}
          >
            <span style={{ fontSize: 20, marginInlineEnd: 6 }}>{c.emoji}</span>
            {c.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
          gap: 16,
          marginTop: 20,
        }}
      >
        {Array.isArray(filtered) && filtered.length > 0 ? (
          filtered.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p>لا توجد منتجات مطابقة للبحث/التصنيف.</p>
        )}
      </div>
    </div>
  );
}

/* ====== Styles ====== */
const catBar = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  margin: "12px 0 20px",
};
const catBtn = {
  border: "1px solid #ddd",
  borderRadius: 20,
  padding: "6px 14px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  fontSize: 14,
};
