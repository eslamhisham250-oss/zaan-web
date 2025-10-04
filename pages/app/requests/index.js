import Header from '../../../components/Header';
import api from '../../../lib/api';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RequestsList(){
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{(async()=>{
    try{ const res=await api.get('/api/requests'); setItems(res.data); }
    catch(e){ console.error(e); }
    finally{ setLoading(false); }
  })();},[]);

  const card = {border:'1px solid #eee',padding:12,borderRadius:6,marginBottom:8};

  return (
    <div>
      <Header/>
      <main style={{padding:24}}>
        <h2>الطلبات</h2>
        {loading? <p>جار التحميل...</p> :
          (items.length? items.map(r=> (
            <div key={r.id} style={card}>
              <Link href={'/app/requests/'+r.id} style={{fontWeight:'bold'}}>{r.title}</Link>
              <div style={{fontSize:12,color:'#666'}}>{new Date(r.createdAt).toLocaleString()}</div>
            </div>
          )) : <p>لا توجد طلبات</p>)
        }
      </main>
    </div>
  );
}
