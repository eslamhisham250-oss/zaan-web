import Link from 'next/link';

export default function NotFound(){
  return (
    <div dir="rtl" style={{minHeight:'100vh',display:'grid',placeItems:'center',textAlign:'center',padding:24}}>
      <div>
        <h1>الصفحة غير موجودة</h1>
        <p>اتفضل ارجع للصفحة الرئيسية.</p>
        <Link href="/">الصفحة الرئيسية</Link>
      </div>
    </div>
  );
}