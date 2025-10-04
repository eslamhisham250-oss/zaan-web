// components/LanguageSwitcher.js
import { useI18n } from '../lib/i18n';

export default function LanguageSwitcher(){
  const { lang, setLang } = useI18n();
  const btn = {
    padding: '8px 10px',
    borderRadius: 8,
    border: '1px solid #ddd',
    background: '#fff',
    cursor: 'pointer',
    fontWeight: 600,
    width: '100%'
  };

  const toggle = () => setLang(lang === 'ar' ? 'en' : 'ar');

  return (
    <button onClick={toggle} style={btn} aria-label="Switch Language">
      {lang === 'ar' ? 'English' : 'العربية'}
    </button>
  );
}