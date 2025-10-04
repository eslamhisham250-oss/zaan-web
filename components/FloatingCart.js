// components/FloatingCart.js
import { useState, useEffect } from "react";
import { countCart, getCart } from "../lib/cart";

export default function FloatingCart() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(countCart());
    const handler = () => setCount(countCart());
    window.addEventListener("zaan_cart_change", handler);
    return () => window.removeEventListener("zaan_cart_change", handler);
  }, []);

  return (
    <button
      onClick={() => window.location.href = "/app/cart"}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        background: "#0a7",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: 60,
        height: 60,
        fontSize: 18,
        fontWeight: "bold",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        cursor: "pointer",
      }}
    >
      🛒 {count}
    </button>
  );
}
