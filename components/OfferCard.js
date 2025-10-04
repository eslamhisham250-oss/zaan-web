import api from '../lib/api';

export default function OfferCard({ offer, onAccepted }){
  const accept = async ()=>{
    try{
      await api.post(`/api/offers/${offer.id}/accept`);
      if(onAccepted) onAccepted(offer.id);
      alert('تم قبول العرض');
    }catch(e){
      console.error(e);
      alert('تعذر قبول العرض');
    }
  };
  return (
    <div style={{border:'1px solid #eee',padding:12,borderRadius:6,marginBottom:8}}>
      <div><strong>مزود:</strong> {offer.providerId}</div>
      <div><strong>السعر:</strong> {offer.price} EGP</div>
      <div>{offer.note}</div>
      <div style={{marginTop:8}}><button onClick={accept}>قبول العرض</button></div>
    </div>
  );
}
