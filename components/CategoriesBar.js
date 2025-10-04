import Link from "next/link";

const categories = [
  { slug: "furniture", label: "أساس", icon: "/images/furniture.png" },
  { slug: "home", label: "أدوات منزلية", icon: "/images/home.png" },
  { slug: "office", label: "مكاتب", icon: "/images/office.png" },
];

export default function CategoryBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "20px 0",
      }}
    >
      {categories.map((cat) => (
        <Link href={`/app/buy?cat=${cat.slug}`} key={cat.slug} legacyBehavior>
          <a
            style={{
              textAlign: "center",
              color: "#333",
              textDecoration: "none",
            }}
          >
            <img
              src={cat.icon}
              alt={cat.label}
              style={{ width: 60, height: 60, marginBottom: 8 }}
            />
            <div>{cat.label}</div>
          </a>
        </Link>
      ))}
    </div>
  );
}
