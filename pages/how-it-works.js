// pages/how-it-works.js
import Footer from '../components/Footer';

export default function HowItWorks(){
  const step = { background:'#fff', padding:16, borderRadius:12, marginBottom:16, boxShadow:'0 2px 6px rgba(0,0,0,0.08)', textAlign:'right' };
  const section = { maxWidth:800, margin:'0 auto', padding:24 };

  return (
    <div dir="rtl">
      <main style={section}>
        <h1>كيف يعمل Zaan؟</h1>
        <div style={step}><h3>١. ابحث أو اطلب</h3><p>ابحث عن قطع أثاث جاهزة أو اطلب تصميم خاص.</p></div>
        <div style={step}><h3>٢. صمّم</h3><p>استخدم الذكاء الاصطناعي أو استأجر مهندس ديكور.</p></div>
        <div style={step}><h3>٣. أضف للعربة</h3><p>ضع المنتجات اللي أعجبتك في العربة.</p></div>
        <div style={step}><h3>٤. أتمم الطلب</h3><p>أدخل بياناتك وأكد الشراء.</p></div>
      </main>
      <Footer />
    </div>
  );
}