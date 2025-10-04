// components/CartFloatingButton.js
import Link from "next/link";
import { useEffect, useState } from "react";
import { countCart } from "../lib/cart";

export default function CartFloatingButton() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(countCart());
    const update = () => setCount(countCart());
    window.addEventListener("zaan_cart_change", update);
    return () => window.removeEventListener("zaan_cart_change", update);
  }, []);

  return (
    <Link href="/app/cart" legacyBehavior>
      <a
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "#0a7",
          color: "#fff",
          padding: "12px 16px",
          borderRadius: "50%",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          zIndex: 9999,
        }}
      >
        🛒
        {count > 0 && (
          <span
            style={{
              position: "absolute",
              top: -5,
              right: -5,
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px",
            }}
          >
            {count}
          </span>
        )}
      </a>
    </Link>
  );
}
