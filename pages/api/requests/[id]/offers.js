import { getStore } from '../../_store';

export default function handler(req,res){
  const { id } = req.query;
  const { __offers } = getStore();
  const list = __offers.filter(o=> o.requestId===id);
  res.status(200).json(list);
}
