import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LANG_KEY = 'zaan_lang';
const I18nContext = createContext();

const dict = {
  ar: {
    // عامة
    appName: 'زان Zaan',
    menu: 'القائمة',
    loading: 'جاري التحميل…',
    backToMarket: 'العودة للسوق',
    guest: 'غير مسجّل',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    profile: 'حسابي',

    // عناصر القائمة
    furniture: 'أثاث',              // ✅ أضفنا المفتاح هنا
    market: 'السوق',
    cart: 'العربة',
    orders: 'طلباتي',
    reqCarpenters: 'طلب من النجارين',
    reqFactories: 'طلب من المصانع',
    aiDesign: 'تصميم بالذكاء الاصطناعي',
    hireDesigner: 'استئجار مهندس ديكور',

    // صفحة القائمة
    menu_title: 'القائمة',
    choose_one: 'اختر واحدة من الخيارات التالية للبدء:',
  },
  en: {
    appName: 'Zaan',
    menu: 'Menu',
    loading: 'Loading…',
    backToMarket: 'Back to Market',
    guest: 'Guest',
    login: 'Log in',
    logout: 'Log out',
    profile: 'My Profile',

    furniture: 'Furniture',         // ✅ أضفنا المفتاح هنا
    market: 'Market',
    cart: 'Cart',
    orders: 'My Orders',
    reqCarpenters: 'Request from Carpenters',
    reqFactories: 'Request from Factories',
    aiDesign: 'AI Design',
    hireDesigner: 'Hire Interior Designer',

    menu_title: 'Menu',
    choose_one: 'Choose one of the following to start:',
  }
};

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('ar');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved) setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(LANG_KEY, lang); } catch {}
  }, [lang]);

  const t = useMemo(() => {
    const table = dict[lang] || dict.ar;
    return (key) => table[key] ?? key;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
