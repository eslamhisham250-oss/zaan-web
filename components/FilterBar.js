// components/FilterBar.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function FilterBar({ categories = [] }) {
  const router = useRouter();
  const { q = '', cat = '', mat = '', min = '', max = '' } = router.query || {};

  // نخلي البحث local عشان ما يغيرش الURL إلا لما تضغط بحث/Enter
  const [qLocal, setQLocal] = useState(q);

  useEffect(() => {
    // لو حد غيّر الURL من برا (لينك/رجوع) هنزامن قيمة البحث
    setQLocal(q || '');
  }, [q]);

  const container = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 10,
    marginTop: 12,
  };

  const searchWrap = {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: 12,
    padding: 8,
  };

  const searchInput = {
    flex: 1,
    padding: '12px 14px',
    border: 'none',
    outline: 'none',
    fontSize: 16,
  };

  const btn = {
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid #ddd',
    background: '#fff',
    cursor: 'pointer',
    fontWeight: 600,
  };

  const btnPrimary = {
    ...btn,
    background: '#0a7',
    border: '1px solid #0a7',
    color: '#fff',
  };

  const row = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 8,
    background: '#fff',
    border: '1px solid #eee',
    borderRadius: 12,
    padding: 12,
  };

  const input = {
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: 8,
    outline: 'none',
  };

  const go = (patch) => {
    const next = { ...router.query, ...patch };
    // نظّف المفاتيح الفارغة من الURL
    Object.keys(next).forEach((k) => {
      if (next[k] === '' || next[k] == null) delete next[k];
    });
    router.push({ pathname: router.pathname, query: next }, undefined, { shallow: true });
  };

  const applySearch = () => {
    go({ q: qLocal || '' });
  };

  const clearSearch = () => {
    setQLocal('');
    go({ q: '' });
  };

  return (
    <div style={container}>
      {/* شريط البحث الكبير */}
      <div style={searchWrap}>
        {/* أيقونة بسيطة */}
        <span aria-hidden style={{ fontSize: 18 }}>🔍</span>
        <input
          style={searchInput}
          type="text"
          placeholder="ابحث عن أثاث… (اكتب ثم اضغط Enter أو زر بحث)"
          value={qLocal}
          onChange={(e) => setQLocal(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') applySearch(); }}
        />
        <button onClick={applySearch} style={btnPrimary}>بحث</button>
        <button onClick={clearSearch} style={btn}>مسح</button>
      </div>

      {/* باقي الفلاتر */}
      <div style={row}>
        <select
          style={input}
          value={cat}
          onChange={(e) => go({ cat: e.target.value })}
        >
          <option value="">كل التصنيفات</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>

        <select
          style={input}
          value={mat}
          onChange={(e) => go({ mat: e.target.value })}
        >
          <option value="">كل المواد</option>
          <option value="زان">زان</option>
          <option value="MDF">MDF</option>
          <option value="خشب طبيعي">خشب طبيعي</option>
        </select>

        <input
          style={input}
          type="number"
          placeholder="حد أدنى (جنيه)"
          value={min}
          onChange={(e) => go({ min: e.target.value })}
        />

        <input
          style={input}
          type="number"
          placeholder="حد أقصى (جنيه)"
          value={max}
          onChange={(e) => go({ max: e.target.value })}
        />
      </div>
    </div>
  );
}