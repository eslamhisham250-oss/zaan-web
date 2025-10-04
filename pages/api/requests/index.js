import { getStore, setRequests, setOffers } from '../_store';

export default function handler(req,res){
  const { __requests } = getStore();

  if(req.method==='GET'){
    return res.status(200).json(__requests);
  }

  if(req.method==='POST'){
    const body = req.body || {};
    const r = { ...body, id: String(__requests.length+1), status:'pending', createdAt: new Date().toISOString() };
    setRequests([r, ...__requests]);

    // generate offers asynchronously
    setTimeout(()=>{
      const { __offers } = getStore();
      const newOffers = [
        { id: String(__offers.length+1), requestId: r.id, providerId: 'provider-1', price: Math.floor(Math.random()*3000)+1000, note:'مدة التنفيذ 5 أيام', status:'pending' },
        { id: String(__offers.length+2), requestId: r.id, providerId: 'provider-2', price: Math.floor(Math.random()*3000)+1200, note:'مدة التنفيذ 3 أيام', status:'pending' }
      ];
      setOffers([...newOffers, ...__offers]);
    }, 1200);

    return res.status(201).json(r);
  }

  return res.status(405).json({error:'method not allowed'});
}
