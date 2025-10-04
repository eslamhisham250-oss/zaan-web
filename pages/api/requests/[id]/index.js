import { getStore } from '../../_store';

export default function handler(req,res){
  const { id } = req.query;
  const { __requests } = getStore();
  const found = __requests.find(r=> r.id===id);
  if(!found) return res.status(404).json({error:'not found'});
  res.status(200).json(found);
}
