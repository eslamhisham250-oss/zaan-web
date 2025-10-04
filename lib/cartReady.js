// lib/cartReady.js
export function getCartReady() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart_ready") || "[]");
}

export function saveCartReady(cart) {
  localStorage.setItem("cart_ready", JSON.stringify(cart));
}

export function addToCartReady(item) {
  const cart = getCartReady();
  const existing = cart.find((i) => i.id === item.id);
  if (existing) existing.qty += item.qty;
  else cart.push(item);
  saveCartReady(cart);
}

export function clearCartReady() {
  localStorage.removeItem("cart_ready");
}

export function totalCartReady() {
  return getCartReady().reduce((sum, i) => sum + i.price * i.qty, 0);
}
