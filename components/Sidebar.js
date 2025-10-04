import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from "next-auth/react";
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '../lib/i18n';

export default function Sidebar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { t } = useI18n();

  const item = (path, label) => {
    const active = router.pathname === path;
    return (
      <Link href={path} legacyBehavior>
        <a style={{
          display:'block',
          padding:'12px 16px',
          marginBottom:4,
          borderRadius:8,
          textDecoration:'none',
          background: active ? '#0a7' : 'transparent',
          color: active ? '#fff' : '#333',
          fontWeight: active ? 700 : 500
        }}>
          {label}
        </a>
      </Link>
    );
  };

  const box = { padding:12, border:'1px solid #eee', borderRadius:8, background:'#fff', marginTop:12 };

  return (
    <aside style={{
      width:220, background:'#fff', borderRight:'1px solid #eee',
      minHeight:'100vh', padding:12, position:'sticky', top:0,
      display:'flex', flexDirection:'column', justifyContent:'space-between'
    }}>
      <div>
        {/* Logo */}
        <h3 
          style={{margin:'12px 0 20px', color:'#0a7', cursor:'pointer'}} 
          onClick={()=> router.push('/app')}
        >
          Zaan / زان
        </h3>

        {/* Main Menu */}
        <h4 style={{margin:'8px 0 12px', color:'#555'}}>{t('menu')}</h4>
        {item('/app/buy', t('furniture'))}   {/* ✅ مترجمة حسب اللغة */}
        {item('/app/request/carpenters', t('reqCarpenters'))}
        {item('/app/request/factories', t('reqFactories'))}
        {item('/app/ai', t('aiDesign'))}
        {item('/app/hire', t('hireDesigner'))}

        <div style={{margin:'16px 0', borderTop:'1px solid #eee'}}></div>

        {/* Orders */}
        {item('/app/orders', t('orders'))}

        {/* Auth Section */}
        <div style={box}>
          {status === "authenticated" ? (
            <>
              <div style={{marginBottom:8, color:'#333'}}>
                {t('profile')}: <strong>{session.user?.name || session.user?.email}</strong>
              </div>
              {item('/app/profile', t('profile'))}
              <button
                onClick={()=> signOut({ callbackUrl: '/app/login' })}
                style={{width:'100%', padding:'8px 12px', borderRadius:8, border:'1px solid #e11', background:'#e11', color:'#fff', cursor:'pointer', marginTop:8}}
              >
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <div style={{marginBottom:8, color:'#666'}}>{t('guest')}</div>
              {item('/app/login', t('login'))}
            </>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{marginTop:12}}>
        <LanguageSwitcher />
        <div style={{marginTop:12}}>
          {item('/app/cart', t('cart'))}
        </div>
      </div>
    </aside>
  );
}
