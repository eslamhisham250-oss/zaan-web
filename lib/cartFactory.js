// lib/cartFactory.js
export function getCartFactory() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart_factory") || "[]");
}

export function saveCartFactory(cart) {
  localStorage.setItem("cart_factory", JSON.stringify(cart));
}

export function addToCartFactory(item) {
  const cart = getCartFactory();
  const existing = cart.find((i) => i.id === item.id);
  if (existing) existing.qty += item.qty;
  else cart.push(item);
  saveCartFactory(cart);
}

export function clearCartFactory() {
  localStorage.removeItem("cart_factory");
}

export function totalCartFactory() {
  return getCartFactory().reduce((sum, i) => sum + i.price * i.qty, 0);
}
