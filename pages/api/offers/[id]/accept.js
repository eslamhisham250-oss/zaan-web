import { getStore, setOffers, setRequests } from '../../_store';

export default function handler(req,res){
  const { id } = req.query;
  const { __offers, __requests } = getStore();
  const updatedOffers = __offers.map(o=> o.id===id? {...o,status:'accepted'}:o);
  setOffers(updatedOffers);
  const accepted = updatedOffers.find(o=> o.id===id);
  if(accepted){
    const updatedRequests = __requests.map(r=> r.id===accepted.requestId? {...r,status:'in_progress'}:r);
    setRequests(updatedRequests);
    return res.status(200).json(accepted);
  }
  return res.status(404).json({error:'not found'});
}
