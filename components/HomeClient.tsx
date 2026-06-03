'use client'

import { useEffect } from 'react'
import Link from 'next/link'

const carouselCards = [
  { name: 'Rely Platform',  big: '5',   label: 'User personas',    bar: 85,  barColor: '#d4f53c', rows: [['Research', 'Done ✓'], ['IA & Flows', 'Done ✓']], dot: '#22c55e', dark: false },
  { name: 'Partner Portal', big: '7',   label: 'Modules shipped',  bar: 100, barColor: '#2196f3', rows: [['Dashboard', 'Live'],   ['Claims', 'Live']],       dot: '#2196f3', dark: true  },
  { name: 'Editorji',       big: '2M+', label: 'Monthly users',    bar: 72,  barColor: '#ef4444', rows: [['iOS App', '✓'],        ['PWA', '✓']],             dot: '#ef4444', dark: false },
  { name: 'Experience',     big: '11+', label: 'Years designing',  bar: 90,  barColor: '#d4f53c', rows: [['Industries', '8+'],    ['Projects', '20+']],      dot: '#d4f53c', dark: true  },
]

export default function HomeClient({ works }: { works: any[] }) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) } })
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const caseStudies = works.filter(w => w.slug !== 'ai-projects')

  return (
    <>
      {/* ─── NAV ─────────────────────────────────────────────────────────────── */}
      <nav style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 60px', height: 72 }}>
        <Link href="/" style={{ fontSize: 28, fontWeight: 800, color: '#fff', textDecoration: 'none', letterSpacing: '-0.04em', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 22, opacity: 0.9 }}>®</span>B
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {[
            { label: 'WORK', href: '#work', external: false },
            { label: 'ABOUT', href: '/about', external: false },
            { label: 'RESUME', href: 'https://docs.google.com/document/d/15LtMI0jpmZnQsqXwM5i7eeDp8LIsGu5tfiwo7n97w8Y/edit?usp=sharing', external: true },
          ].map(item => (
            item.external
              ? <a key={item.label} href={item.href} target="_blank" style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.8)', textDecoration: 'none', padding: '8px 16px', borderRadius: 8, letterSpacing: '0.04em' }}>{item.label}</a>
              : item.href.startsWith('/')
                ? <Link key={item.label} href={item.href} style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.8)', textDecoration: 'none', padding: '8px 16px', borderRadius: 8, letterSpacing: '0.04em' }}>{item.label}</Link>
                : <a key={item.label} href={item.href} style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.8)', textDecoration: 'none', padding: '8px 16px', borderRadius: 8, letterSpacing: '0.04em' }}>{item.label}</a>
          ))}
        </div>
      </nav>

      {/* ─── HERO ────────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 60px 60px',
        background: 'linear-gradient(180deg,#2196f3 0%,#42a5f5 25%,#64b5f6 50%,#90caf9 70%,#bbdefb 85%,#e3f2fd 95%,#f5f9ff 100%)',
      }}>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 680, marginBottom: 56 }}>
          <h1 style={{ fontSize: 'clamp(44px, 7vw, 76px)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.03em', color: '#fff', textShadow: '0 2px 20px rgba(0,0,0,0.12)', marginBottom: 20 }}>
            Senior UX Designer<br />based in Bangalore
          </h1>
          <p style={{ fontSize: 16, fontWeight: 400, lineHeight: 1.65, color: 'rgba(255,255,255,0.8)', marginBottom: 36 }}>
            11+ years designing digital products across fintech,<br />
            insurance, media and real estate.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#work" style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', padding: '12px 24px', borderRadius: 100, textDecoration: 'none', letterSpacing: '0.04em' }}>VIEW WORK</a>
            <a href="mailto:rajat.rajat.bhandari.1@gmail.com" style={{ fontSize: 13, fontWeight: 700, color: '#0a0a0a', background: '#d4f53c', padding: '12px 24px', borderRadius: 100, textDecoration: 'none', letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 20px rgba(212,245,60,0.35)' }}>
              GET IN TOUCH
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="#d4f53c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
          </div>
        </div>

        {/* Carousel */}
        <div style={{ position: 'relative', zIndex: 10, width: '100vw', overflow: 'hidden', marginLeft: -60, marginRight: -60, padding: '8px 0 24px' }}>
          <div className="rb-carousel-track">
            {[...carouselCards, ...carouselCards].map((c, i) => (
              <div key={i} style={{
                flexShrink: 0, width: 260, height: 180, borderRadius: 16, overflow: 'hidden',
                border: `1px solid ${c.dark ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)'}`,
                padding: 16, display: 'flex', flexDirection: 'column', cursor: 'pointer',
                background: c.dark ? '#0a0a0a' : 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(20px)', boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.02em', color: c.dark ? 'rgba(255,255,255,0.5)' : '#0a0a0a' }}>{c.name}</span>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.dot, flexShrink: 0 }} />
                </div>
                <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, color: c.dark ? '#fff' : '#0a0a0a' }}>{c.big}</div>
                <div style={{ fontSize: 10, fontWeight: 500, marginTop: 4, color: c.dark ? 'rgba(255,255,255,0.35)' : '#888' }}>{c.label}</div>
                <div style={{ height: 3, borderRadius: 9999, margin: '10px 0', background: c.dark ? 'rgba(255,255,255,0.1)' : '#e5e5e5' }}>
                  <div style={{ height: '100%', borderRadius: 9999, width: `${c.bar}%`, background: c.barColor }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {c.rows.map(([l, r], j) => (
                    <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 6, padding: '4px 8px', background: c.dark ? 'rgba(255,255,255,0.06)' : '#f5f5f7' }}>
                      <span style={{ fontSize: 9, fontWeight: 500, color: c.dark ? 'rgba(255,255,255,0.4)' : '#555' }}>{l}</span>
                      <span style={{ fontSize: 9, fontWeight: 700, color: c.dark ? '#d4f53c' : '#0a0a0a' }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CASE STUDIES ────────────────────────────────────────────────────── */}
      <section id="work" style={{ background: '#fff', padding: '100px 60px' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#888', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ color: '#0a0a0a' }}>•</span> CASE STUDIES
          </div>
          <h2 style={{ fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.035em', color: '#0a0a0a', lineHeight: 1.06, marginBottom: 14 }}>Selected work</h2>
          <p style={{ fontSize: 15, color: '#888', lineHeight: 1.7, maxWidth: 460, margin: '0 auto' }}>End-to-end UX design across research, systems and interfaces.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, maxWidth: 1100, margin: '0 auto', padding: 16, borderRadius: 20, background: '#f5f5f7' }}>
          {caseStudies.map((work, i) => (
            <Link key={work.slug} href={`/work/${work.slug}`} className={`reveal d${Math.min(i + 1, 4)}`} style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 20, overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s, transform 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(0,0,0,0.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}>
              {/* Visual area */}
              <div style={{ minHeight: 260, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, overflow: 'hidden' }}>
                <div style={{ background: '#111', borderRadius: 14, boxShadow: '0 16px 48px rgba(0,0,0,0.2)', padding: 16, width: 200 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>{work.title}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>{work.year}</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{work.role}</div>
                  <div style={{ height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 9999, margin: '10px 0' }}>
                    <div style={{ height: '100%', borderRadius: 9999, background: '#d4f53c', width: '80%' }} />
                  </div>
                  {work.tags?.slice(0, 2).map((t: string) => (
                    <div key={t} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: 6, marginTop: 4 }}>
                      <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>{t}</span>
                      <span style={{ fontSize: 8, color: '#d4f53c', fontWeight: 700 }}>✓</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Text area */}
              <div style={{ padding: '28px 32px 32px', borderTop: '1px solid #ebebeb', textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', marginBottom: 10, lineHeight: 1.2 }}>{work.title}</div>
                <div style={{ fontSize: 14, color: '#888', lineHeight: 1.65, maxWidth: 360, margin: '0 auto' }}>{work.summary}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FAMILY & FRIENDS ────────────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '100px 60px', borderTop: '1px solid #ebebeb' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#888', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ color: '#0a0a0a' }}>•</span> SIDE PROJECTS
          </div>
          <h2 style={{ fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.035em', color: '#0a0a0a', lineHeight: 1.06, marginBottom: 14 }}>Family &amp; Friends</h2>
          <p style={{ fontSize: 15, color: '#888', lineHeight: 1.7, maxWidth: 460, margin: '0 auto' }}>Vibe coding experiments built for the people around me.</p>
        </div>
        <div className="reveal d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 1100, margin: '0 auto' }}>
          <a href="/ai-projects" style={{ background: '#f5f5f7', border: '1px solid #e8e8e8', borderRadius: 20, padding: 32, textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: 12, transition: 'box-shadow 0.3s, transform 0.3s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}>
            <div style={{ fontSize: 32 }}>⚡</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em' }}>AI Projects</div>
            <div style={{ fontSize: 14, color: '#888', lineHeight: 1.65 }}>Dashboards, apps and tools built with AI — real projects for real people.</div>
          </a>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer id="contact" style={{ background: '#fff', padding: '40px 60px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', background: '#0e0e0e', borderRadius: 24, padding: '60px 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, position: 'relative', overflow: 'hidden', minHeight: 360 }}>
          {/* glow blobs */}
          <div style={{ position: 'absolute', width: 400, height: 400, background: '#2196f3', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.2, top: -150, left: -100, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: 300, height: 300, background: '#d4f53c', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.2, bottom: -100, right: -80, pointerEvents: 'none' }} />

          {/* Left col */}
          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>GET IN TOUCH</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>Let&apos;s build<br />something great.</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, marginBottom: 32, maxWidth: 360 }}>Open to full-time roles, freelance projects, and interesting conversations.</p>
            <a href="mailto:rajat.rajat.bhandari.1@gmail.com" style={{ fontSize: 13, fontWeight: 700, color: '#0a0a0a', background: '#d4f53c', padding: '12px 24px', borderRadius: 100, textDecoration: 'none', letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start', boxShadow: '0 4px 20px rgba(212,245,60,0.35)' }}>
              GET IN TOUCH
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="#d4f53c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
          </div>

          {/* Right col */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 4, position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>PAGES</div>
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Resume', href: 'https://docs.google.com/document/d/15LtMI0jpmZnQsqXwM5i7eeDp8LIsGu5tfiwo7n97w8Y/edit?usp=sharing', external: true },
                { label: 'Work', href: '#work' },
              ].map(item => (
                item.href.startsWith('/') && !item.external
                  ? <Link key={item.label} href={item.href} style={{ display: 'block', fontSize: 16, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: 12 }}>{item.label}</Link>
                  : <a key={item.label} href={item.href} target={item.external ? '_blank' : undefined} style={{ display: 'block', fontSize: 16, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: 12 }}>{item.label}</a>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              {[
                { href: 'https://www.linkedin.com/in/rajatbhand/', icon: 'fa-brands fa-linkedin-in', title: 'LinkedIn' },
                { href: 'https://www.behance.net/bhandrajat', icon: 'fa-brands fa-behance', title: 'Behance' },
                { href: 'https://dribbble.com/BhandRajat', icon: 'fa-brands fa-dribbble', title: 'Dribbble' },
                { href: 'https://www.instagram.com/bhandrajat.film', icon: 'fa-brands fa-instagram', title: 'Instagram' },
              ].map(s => (
                <a key={s.title} href={s.href} target="_blank" title={s.title} style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: 16 }}>
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
