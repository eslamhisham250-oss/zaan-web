// pages/app/index.js
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useI18n } from '../../lib/i18n';

export default function Dashboard(){
  const { t } = useI18n();

  const tile = { 
    display:'block', padding:16, border:'1px solid #ddd', borderRadius:12,
    textAlign:'center', fontWeight:600, background:'#fafafa',
    boxShadow:'0 2px 6px rgba(0,0,0,0.06)', cursor:'pointer', textDecoration:'none'
  };

  const grid = { 
    display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))',
    gap:12, marginTop:12 
  };

  return (
    <div style={{display:'flex'}} dir="rtl">
      <Sidebar />
      <main style={{flex:1, padding:24}}>
        {/* العنوان الجديد: القائمة */}
        <h2>{t('menu_title')}</h2>
        <p style={{color:'#555'}}>{t('choose_one')}</p>

        <div style={grid}>
          <a href="/app/request/carpenters" style={tile}>{t('reqCarpenters')}</a>
          <a href="/app/request/factories" style={tile}>{t('reqFactories')}</a>
          <a href="/app/buy" style={tile}>{t('market')}</a>
          <a href="/app/ai" style={tile}>{t('aiDesign')}</a>
          <a href="/app/hire" style={tile}>{t('hireDesigner')}</a>
        </div>
        <Footer />
      </main>
    </div>
  );
}