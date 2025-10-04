let __requests = [];
let __offers = [];
let __carpenters = [
  { id: 1, name: 'نجار القاهرة', location: 'القاهرة', rating: 4.8 },
  { id: 2, name: 'ورشة الاسكندرية', location: 'الاسكندرية', rating: 4.5 }
];

export function getStore(){ return { __requests, __offers, __carpenters }; }
export function setRequests(v){ __requests = v; }
export function setOffers(v){ __offers = v; }
