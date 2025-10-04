import Header from '../../../components/Header';
import api from '../../../lib/api';
import OfferCard from '../../../components/OfferCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function RequestDetail(){
  const router = useRouter();
  const { id } = router.query;
  const [request,setRequest] = useState(null);
  const [offers,setOffers] = useState([]);

  useEffect(()=>{
    if(!id) return;
    (async ()=>{
      try{
        const [r,ofs] = await Promise.all([
          api.get('/api/requests/'+id),
          api.get('/api/requests/'+id+'/offers')
        ]);
        setRequest(r.data); setOffers(ofs.data);
      }catch(e){ console.error(e); }
    })();
  },[id]);

  const handleAccepted = (offerId) => {
    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status:'accepted' } : o));
  };

  const field = (label, value) => (
    <div style={{ marginBottom: 6 }}>
      <strong>{label}: </strong><span>{value ?? '-'}</span>
    </div>
  );

  return (
    <div>
      <Header/>
      <main style={{ padding:24 }}>
        <h2>{request?.title || 'تفاصيل الطلب'}</h2>
        <p style={{ whiteSpace:'pre-wrap' }}>{request?.description}</p>

        <div style={{ marginTop:12, padding:12, border:'1px solid #eee', borderRadius:8 }}>
          <h3>الأبعاد</h3>
          {field('الطول', request?.dimensions?.length)}
          {field('العرض', request?.dimensions?.width)}
          {field('الارتفاع', request?.dimensions?.height)}
        </div>

        {request?.images?.length ? (
          <div style={{ marginTop:12 }}>
            <h3>الصورة المرجعية</h3>
            <img src={request.images[0]} alt="reference" style={{ maxWidth: 360, borderRadius: 8, border: '1px solid #eee' }} />
          </div>
        ) : null}

        <div style={{ marginTop:18 }}>
          <h3>العروض</h3>
          {offers.length
            ? offers.map(o => <OfferCard key={o.id} offer={o} onAccepted={handleAccepted} />)
            : <p>لا عروض حتى الآن</p>}
        </div>
      </main>
    </div>
  );
}