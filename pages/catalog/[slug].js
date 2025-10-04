import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import FilterBar from '../../components/FilterBar';
import { useRouter } from 'next/router';
import { PRODUCTS, CATEGORIES } from '../../lib/catalogData.js';

export default function Catalog(){
  const router = useRouter();
  const { slug } = router.query;
  const { q='', cat='', mat='', min='', max='' } = router.query;

  const catName = CATEGORIES.find(c => c.slug === slug)?.name || 'الكتالوج';

  let items = PRODUCTS.filter(p => p.category === slug);
  if (q)   items = items.filter(p => p.title.includes(q) || p.short.includes(q));
  if (cat) items = items.filter(p => p.category === cat);
  if (mat) items = items.filter(p => p.material === mat);
  if (min) items = items.filter(p => p.price >= Number(min));
  if (max) items = items.filter(p => p.price <= Number(max));

  const grid = { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12 };

  return (
    <div dir="rtl">
      <Header/>
      <main style={{padding:24}}>
        <h2 style={{marginTop:0}}>{catName}</h2>
        <FilterBar/>
        <div style={{height:12}}/>
        <div style={grid}>
          {items.length ? items.map(p => <ProductCard key={p.id} p={p}/>) : <p>لا توجد نتائج</p>}
        </div>
      </main>
    </div>
  );
}