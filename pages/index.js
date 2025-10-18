// pages/index.js
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [aiTab, setAiTab] = useState("ai-room");

  // Reveal on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>ZAAN</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>

      <div dir="rtl">

        {/* ===== Hero ===== */}
        <section id="home" className="hero">
          <div className="wrap hero__in">
            <div className="reveal">
              <span className="hero__badge">تصميمات داخلية • تصنيع • توريد</span>
              <h1 className="title">مساحتك… ذوقك • <span style={{color:"var(--copper)"}}>ZAAN</span></h1>
              <p className="lead">حلول أثاث متكاملة: جاهز، مُصنّع حسب الطلب، مصانع، ومساعد تصميم بالذكاء الصناعي.</p>
              <div className="hero__cta mt-6">
                <a className="btn btn--primary" href="#services">ابدأ الآن</a>
                <a className="btn" href="#furniture" style={{background:"var(--gray)"}}>تصفح الأثاث</a>
                <a className="btn btn--ghost" href="/ai">جرّب الذكاء الصناعي</a>
              </div>
            </div>
            <div className="hero__media reveal" />
          </div>
        </section>

        {/* ===== Promo ===== */}
        <section className="promo">
          <div className="wrap">
            <div className="scroller">
              {["promo-1","promo-2","promo-3","promo-4","promo-5"].map((p)=>(
                <div key={p} className="scroller__item" style={{backgroundImage:`url('/images/${p}.jpg')`}} />
              ))}
            </div>
          </div>
        </section>

        {/* ===== Services ===== */}
        <section id="services" className="services">
          <div className="wrap">
            <h2 className="title reveal">الخدمات</h2>
            <p className="subtitle reveal">اختَر الخدمة المناسبة لاحتياجك</p>

            <div className="grid-tiles">
              <a className="tile reveal" href="furniture">
                <div className="tile__icon"><img src="/images/svc-furniture.jpg" alt="" /></div>
                <div className="tile__title">الأثاث</div>
                <div className="tile__desc">منتجات جاهزة وجديدة</div>
              </a>

              <a className="tile reveal" href="app/carpenters">
                <div className="tile__icon"><img src="/images/svc-carpenter.jpg" alt="" /></div>
                <div className="tile__title">طلب من نجار</div>
                <div className="tile__desc">تفصيل حسب المقاس</div>
              </a>

              <a className="tile reveal" href="app/factories">
                <div className="tile__icon"><img src="/images/svc-factory.jpg" alt="" /></div>
                <div className="tile__title">طلب من مصنع</div>
                <div className="tile__desc">كميات وجودة ثابتة</div>
              </a>

              <a className="tile reveal" href="app/hire">
                <div className="tile__icon"><img src="/images/svc-designer.jpg" alt="" /></div>
                <div className="tile__title">مهندس ديكور</div>
                <div className="tile__desc">جلسات تصميم وإشراف</div>
              </a>
            </div>

            <div className="grid-tiles--center">
              <a className="tile tile--center reveal" href="app/ai">
                <div className="tile__icon"><img src="/images/svc-ai.jpg" alt="" /></div>
                <div className="tile__title">الذكاء الصناعي</div>
                <div className="tile__desc">اقتراحات ديكور فورية</div>
              </a>
            </div>
          </div>
        </section>

        {/* ===== Furniture ===== */}
        <section id="furniture">
          <div className="wrap">
            <div className="row-head">
              <div>
                <h2 className="title reveal">الأثاث</h2>
                <p className="subtitle reveal">منتجات مختارة بعناية</p>
              </div>
              <a href="/furniture" className="see-more">شاهد المزيد ↗</a>
            </div>

            <div className="cards">
              {[
                { img:"product-1.jpg", name:"ركنة قماش", price:"8,450 ج.م" },
                { img:"product-2.jpg", name:"ترابيزة قهوة", price:"1,250 ج.م" },
                { img:"product-3.jpg", name:"كرسي صالون", price:"2,200 ج.م" },
                { img:"product-4.jpg", name:"مكتبة حائط", price:"3,400 ج.م" },
              ].map((item,i)=>(
                <article className="card reveal" key={i}>
                  <div className="card__img" style={{backgroundImage:`url('/images/${item.img}')`}} />
                  <div className="card__body">
                    <div style={{fontWeight:700}}>{item.name}</div>
                    <div className="price">{item.price}</div>
                    <div className="card__actions">
                      <button className="pill">أضف للعربة</button>
                      <button className="pill pill--buy">اشتري الآن</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== New Collection ===== */}
        <section id="new">
          <div className="wrap">
            <div className="row-head">
              <div>
                <h2 className="title reveal">New Collection</h2>
                <p className="subtitle reveal">أحدث القطع المضافة</p>
              </div>
              <a href="/furniture" className="see-more">شاهد المزيد ↗</a>
            </div>

            <div className="cards">
              {[
                { img:"new-1.jpg", name:"Bed Frame", price:"6,900 ج.م" },
                { img:"new-2.jpg", name:"TV Unit", price:"4,250 ج.م" },
                { img:"new-3.jpg", name:"Dining Set", price:"9,300 ج.م" },
                { img:"new-4.jpg", name:"Sideboard", price:"3,950 ج.م" },
              ].map((item,i)=>(
                <article className="card reveal" key={i}>
                  <div className="card__img" style={{backgroundImage:`url('/images/${item.img}')`}} />
                  <div className="card__body">
                    <div style={{fontWeight:700}}>{item.name}</div>
                    <div className="price">{item.price}</div>
                    <div className="card__actions">
                      <button className="pill">أضف للعربة</button>
                      <button className="pill pill--buy">اشتري الآن</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="center mt-8">
              <a className="btn btn--primary" href="/furniture">تسوّق الآن</a>
            </div>
          </div>
        </section>

        {/* ===== Carpenters ===== */}
        <section id="carpenters">
          <div className="wrap split">
            <div className="panel panel--img reveal" style={{backgroundImage:"url('/images/carpenters.jpg')"}} />
            <div className="panel reveal">
              <h2 className="title">طلب من نجار</h2>
              <p className="lead">تفصيل حسب المقاس — جودة عالية ومواعيد تسليم دقيقة.</p>
              <div className="mt-6">
                <a className="btn btn--primary" href="app/carpenters">ابدأ طلب التفصيل</a>
                <a className="btn btn--ghost" href="app/carpenters#gallery">معرض الأعمال</a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Factories ===== */}
        <section id="factories">
          <div className="wrap split">
            <div className="panel reveal">
              <h2 className="title">طلب من مصنع</h2>
              <p className="lead">كميات كبيرة بأسعار تنافسية — مواصفات ثابتة واعتمادية.</p>
              <div className="mt-6">
                <a className="btn btn--primary" href="app/factories">طلب عرض سعر</a>
                <a className="btn btn--ghost" href="app/factories#catalog">كتالوج المنتجات</a>
              </div>
            </div>
            <div className="panel panel--img reveal" style={{backgroundImage:"url('/images/factory.jpg')"}} />
          </div>
        </section>

        {/* ===== AI Designer ===== */}
        <section id="ai">
          <div className="wrap split">
            <div className="video reveal" />
            <div className="panel reveal">
              <h2 className="title">الذكاء الصناعي للتصميم</h2>
              <p className="lead">الحصول على اقتراحات ديكور فورية بصور واقعية.</p>

              <div className="tabs mt-6">
                <button className={`tab ${aiTab==='ai-room'?'tab--active':''}`} onClick={()=>setAiTab('ai-room')}>صمّم غرفتك</button>
                <button className={`tab ${aiTab==='ai-ideas'?'tab--active':''}`} onClick={()=>setAiTab('ai-ideas')}>اقتراحات فورية</button>
              </div>

              <div className="mt-6" id="tabContent">
                {aiTab==='ai-room'
                  ? <p className="muted">ارفع صورة الغرفة أو أدخل المقاسات، وسنقترح لك مخططات وأنماط.</p>
                  : <p className="muted">اختر نمطًا (مودرن، كلاسيك، إسكندنافي) واحصل على صور مقترحة فوراً.</p>
                }
              </div>
            </div>
          </div>
        </section>

        {/* ===== Hire Designer ===== */}
        <section id="hire">
          <div className="wrap split">
            <div className="panel panel--designer reveal" />
            <div className="panel reveal">
              <h2 className="title">استعن بمهندس ديكور</h2>
              <p className="lead">جلسة استشارة + خطة تصميم + متابعة التنفيذ، مع تخصيص حسب الميزانية والمساحة.</p>
              <ul className="muted" style={{lineHeight:1.9}}>
                <li>جلسات أونلاين أو في الموقع</li>
                <li>مخططات ونماذج ثلاثية الأبعاد</li>
                <li>قائمة خامات وتكلفة تقديرية</li>
              </ul>
              <div className="mt-6">
                <a className="btn btn--primary" href="app/hire#booking">احجز استشارة الآن</a>
                <a className="btn btn--ghost" href="app/hire#gallery">شاهد أعمالنا</a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== About ===== */}
        <section id="about" className="about">
          <div className="wrap">
            <h2 className="title reveal">عن ZAAN</h2>
            <p className="lead reveal">نجمع بين التصميم، التصنيع، والتوريد في منصة واحدة—تجربة سلسة من الاختيار حتى الاستلام.</p>
            <div className="social reveal">
              <a href="#" aria-label="Instagram">Instagram</a>
              <a href="#" aria-label="Facebook">Facebook</a>
              <a href="#" aria-label="LinkedIn">LinkedIn</a>
            </div>
          </div>
        </section>

        {/* ===== Footer ===== */}
        <footer className="footer">
          <div className="wrap footer__in">
            <div className="logo">
              <img src="/images/logo-white.png" alt="ZAAN" style={{height:"28px"}} />
              <div className="logo__title">ZAAN</div>
            </div>
            <div className="muted">© 2025 ZAAN. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </>
  );
}
