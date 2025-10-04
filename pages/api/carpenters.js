import { getStore } from './_store';
export default function handler(req,res){
  const { __carpenters } = getStore();
  res.status(200).json(__carpenters);
}
