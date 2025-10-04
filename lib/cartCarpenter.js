// lib/cartCarpenter.js
export function getCartCarpenter() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart_carpenter") || "[]");
}

export function saveCartCarpenter(cart) {
  localStorage.setItem("cart_carpenter", JSON.stringify(cart));
}

export function addToCartCarpenter(item) {
  const cart = getCartCarpenter();
  const existing = cart.find((i) => i.id === item.id);
  if (existing) existing.qty += item.qty;
  else cart.push(item);
  saveCartCarpenter(cart);
}

export function clearCartCarpenter() {
  localStorage.removeItem("cart_carpenter");
}

export function totalCartCarpenter() {
  return getCartCarpenter().reduce((sum, i) => sum + i.price * i.qty, 0);
}
