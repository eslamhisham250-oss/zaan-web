// lib/cart.js

const KEY = 'zaan_cart';

// قراءة العربة
export function getCart() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// حفظ العربة
function saveCart(cart) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY, JSON.stringify(cart));
    dispatchCartChange();
  } catch (e) {
    console.error("❌ خطأ أثناء حفظ العربة:", e);
  }
}

// إضافة منتج
export function addToCart(item) {
  if (!item?.id || !item?.price) {
    console.warn("⚠️ المنتج غير صالح للإضافة إلى العربة:", item);
    return;
  }

  const cart = getCart();
  const existing = cart.find(i => i.id === item.id);

  if (existing) {
    existing.qty += item.qty || 1;
  } else {
    cart.push({ ...item, qty: item.qty || 1 });
  }

  saveCart(cart);
}

// مسح العربة بالكامل
export function clearCart() {
  saveCart([]);
}

// حساب الإجمالي بالفلوس
export function totalCart() {
  return getCart().reduce((sum, i) => sum + (i.price * i.qty), 0);
}

// حساب عدد القطع
export function countCart() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

// تحديث كمية منتج
export function updateQty(id, qty) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);

  if (item) {
    if (qty <= 0) {
      // لو الكمية صفر امسح المنتج
      cart = cart.filter(i => i.id !== id);
    } else {
      item.qty = qty;
    }
    saveCart(cart);
  }
}

// دالة تبعت Event لما العربة تتغير
function dispatchCartChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('zaan_cart_change'));
  }
}
