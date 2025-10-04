import Link from 'next/link';

export default function ServerError(){
  return (
    <div dir="rtl" style={{minHeight:'100vh',display:'grid',placeItems:'center',textAlign:'center',padding:24}}>
      <div>
        <h1>حصل خطأ مفاجئ</h1>
        <p>جرّب تاني بعد شوية أو ارجع للرئيسية.</p>
        <Link href="/">الصفحة الرئيسية</Link>
      </div>
    </div>
  );
}