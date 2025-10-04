import Link from 'next/link';
import { useEffect, useState } from 'react';
import { countCart } from '../lib/cart';

export default function Header(){
  const linkStyle = { marginRight: 12, textDecoration: 'none' };
  const [count, setCount] = useState(0);

  useEffect(()=>{
    // تحميل أولي
    setCount(countCart());

    // تحديت عند تغيّر العربة داخل نفس التاب
    const onChange = ()=> setCount(countCart());
    window.addEventListener('zaan_cart_change', onChange);

    // تحديث بين التابات المختلفة
    const onStorage = (e)=> { if (e.key === 'zaan_cart') setCount(countCart()); }
    window.addEventListener('storage', onStorage);

    return ()=>{
      window.removeEventListener('zaan_cart_change', onChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const badge = {
    display:'inline-flex', alignItems:'center', justifyContent:'center',
    minWidth:18, height:18, padding:'0 5px', borderRadius:9, background:'#e11', color:'#fff',
    fontSize:12, fontWeight:700, marginLeft:6
  };

  return (
    <header style={{padding:16,borderBottom:'1px solid #eee',display:'flex',gap:12,alignItems:'center',background:'#fff',position:'sticky',top:0,zIndex:100}}>
      <Link href="/" style={{...linkStyle, fontWeight:'bold'}}>زان Zaan</Link>
      <Link href="/app" style={linkStyle}>Dashboard</Link>
      <Link href="/app/buy" style={linkStyle}>السوق</Link>

      <Link href="/app/cart" style={linkStyle}>
        <span>العربة</span>
        {count>0 && <span style={badge}>{count}</span>}
      </Link>

      <Link href="/app/orders" style={linkStyle}>طلباتي</Link>
      <div style={{ marginInlineStart:'auto', color:'#666', fontSize:12 }}>واجهة تجريبية</div>
    </header>
  );
}