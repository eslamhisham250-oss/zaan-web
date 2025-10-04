const KEY = 'zaan_orders';
const CUSTOMER_KEY = 'zaan_customer';

export function getOrders(){
  if (typeof window==='undefined') return [];
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}
export function saveOrder(order){
  const all = getOrders();
  all.unshift(order);
  localStorage.setItem(KEY, JSON.stringify(all));
}
export function getNextOrderId(){ return 'Z-' + Date.now(); }

export function getCustomer(){
  if (typeof window==='undefined') return { name:'', phone:'', address:'', note:'' };
  try { return JSON.parse(localStorage.getItem(CUSTOMER_KEY) || '{"name":"","phone":"","address":"","note":""}'); }
  catch { return { name:'', phone:'', address:'', note:'' }; }
}
export function saveCustomer(cust){
  if (typeof window==='undefined') return;
  localStorage.setItem(CUSTOMER_KEY, JSON.stringify(cust));
}