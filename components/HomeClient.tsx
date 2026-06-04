'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

const carouselCards = [
  { name: 'Rely Platform',  big: '5',   label: 'User personas',   bar: 85,  barColor: '#d4f53c', rows: [['Research', 'Done ✓'], ['IA & Flows', 'Done ✓']], dot: '#22c55e', dark: false },
  { name: 'Partner Portal', big: '7',   label: 'Modules shipped', bar: 100, barColor: '#2196f3', rows: [['Dashboard', 'Live'],   ['Claims', 'Live']],       dot: '#2196f3', dark: true  },
  { name: 'Editorji',       big: '2M+', label: 'Monthly users',   bar: 72,  barColor: '#ef4444', rows: [['iOS App', '✓'],       ['PWA', '✓']],             dot: '#ef4444', dark: false },
  { name: 'Experience',     big: '11+', label: 'Years designing', bar: 90,  barColor: '#d4f53c', rows: [['Industries', '8+'],   ['Projects', '20+']],      dot: '#d4f53c', dark: true  },
]

// 2 sets — 8 cards total, 45° apart on the ring
const orbitCards = [...carouselCards, ...carouselCards]

const navLinkCls = 'text-xs font-semibold text-white/70 no-underline px-4 py-2 rounded-lg tracking-widest uppercase hover:bg-white/10 hover:text-white transition-all duration-150'

export default function HomeClient({ works }: { works: any[] }) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const pausedRef   = useRef(false)

  useEffect(() => {
    // Scroll reveal
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
    els.forEach(el => obs.observe(el))

    // Arm-based ring — exact same technique as aeline.framer.website
    // The whole ring container rotates (rotateY), each arm is fixed inside it,
    // card sits at the end of each arm (translateZ). rotateX(10deg) = looking from above.
    const container = carouselRef.current
    if (!container) return () => obs.disconnect()

    const arms  = Array.from(container.children) as HTMLElement[]
    const total = arms.length
    let   deg   = 0

    const onEnter = () => { pausedRef.current = true }
    const onLeave = () => { pausedRef.current = false }
    const wrapper = container.parentElement
    wrapper?.addEventListener('mouseenter', onEnter)
    wrapper?.addEventListener('mouseleave', onLeave)

    const tick = (_time: number, deltaTime: number) => {
      if (!pausedRef.current) deg += deltaTime * 0.008   // ~8 deg/sec

      // Rotate the whole ring
      container.style.transform =
        `translate(-50%, -50%) perspective(3000px) rotateX(10deg) rotateY(${deg}deg)`

      // Fade out arms that are at the back of the ring
      arms.forEach((arm, i) => {
        const armAngle  = (i / total) * 360
        const world     = ((deg + armAngle) % 360 + 360) % 360        // 0–360
        const normed    = world > 180 ? world - 360 : world            // –180 to 180
        // cosine falloff: 1 at front (0°), 0 at sides (±90°), hidden behind
        const opacity   = Math.abs(normed) < 90
          ? Math.max(0, Math.cos(normed * Math.PI / 180))
          : 0
        arm.style.opacity = String(opacity)
      })
    }

    gsap.ticker.add(tick)

    return () => {
      obs.disconnect()
      gsap.ticker.remove(tick)
      wrapper?.removeEventListener('mouseenter', onEnter)
      wrapper?.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const caseStudies = works.filter(w => w.slug !== 'ai-projects')

  return (
    <>
      {/* ── NAV — logo left · links center · spacer right ── */}
      <nav className="absolute top-0 left-0 right-0 z-[100] flex items-center h-16 px-8 md:px-16">
        <div className="flex-1">
          <Link href="/" className="text-2xl font-extrabold text-white no-underline tracking-tight flex items-center gap-0.5">
            <span className="text-xl opacity-80">®</span>B
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <a href="#work" className={navLinkCls}>Work</a>
          <Link href="/about" className={navLinkCls}>About</Link>
          <a href="https://docs.google.com/document/d/15LtMI0jpmZnQsqXwM5i7eeDp8LIsGu5tfiwo7n97w8Y/edit?usp=sharing" target="_blank" className={navLinkCls}>Resume</a>
        </div>
        <div className="flex-1" />
      </nav>

      {/* ── HERO ── */}
      <section className="min-h-screen relative flex flex-col items-center justify-center [background:linear-gradient(180deg,#1e88e5_0%,#2196f3_15%,#42a5f5_35%,#64b5f6_55%,#90caf9_72%,#bbdefb_86%,#e3f2fd_95%,#f5f9ff_100%)]">

        {/* Headline + buttons */}
        <div className="relative z-10 text-center w-full max-w-3xl mx-auto px-6 pt-28 pb-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight text-white [text-shadow:0_2px_32px_rgba(0,0,0,0.18)] mb-6">
            Senior UX Designer<br />
            <span className="text-white/60">based in Bangalore</span>
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-white/70 mb-10 max-w-md mx-auto">
            11+ years designing digital products across fintech, insurance, media and real estate.
          </p>
          <div className="flex gap-3 items-center justify-center flex-wrap">
            <a href="#work" className="text-xs font-semibold tracking-widest uppercase text-white/90 bg-white/10 border border-white/30 px-6 py-3 rounded-full no-underline hover:bg-white/20 transition-colors">
              VIEW WORK
            </a>
            <a href="mailto:rajat.rajat.bhandari.1@gmail.com" className="text-xs font-bold tracking-widest uppercase text-[#0a0a0a] bg-[#d4f53c] px-6 py-3 rounded-full no-underline inline-flex items-center gap-2 [box-shadow:0_4px_24px_rgba(212,245,60,0.4)] hover:opacity-90 transition-opacity">
              GET IN TOUCH
              <span className="w-6 h-6 rounded-full bg-[#0a0a0a] flex items-center justify-center shrink-0">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="#d4f53c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
          </div>
        </div>

        {/* Arm-based ring carousel (same technique as aeline) */}
        <div className="relative w-full" style={{ height: '220px' }}>
          {/* Rotating ring — transform updated by GSAP ticker */}
          <div
            ref={carouselRef}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 0,
              height: 0,
              transformStyle: 'preserve-3d',
              transform: 'translate(-50%, -50%) perspective(3000px) rotateX(10deg) rotateY(0deg)',
            }}
          >
            {orbitCards.map((c, i) => {
              const armAngle = (i / orbitCards.length) * 360
              return (
                // Arm — fixed angle, card sits at the end via translateZ
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: 0,
                    height: 0,
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${armAngle}deg)`,
                  }}
                >
                  <div
                    className={`absolute rounded-2xl border p-4 flex flex-col [box-shadow:0_12px_40px_rgba(0,0,0,0.22)] ${c.dark ? 'bg-[#0a0a0a] border-white/20' : 'bg-white border-white/60'}`}
                    style={{ width: '220px', height: '155px', marginLeft: '-110px', marginTop: '-77px', transform: 'translateZ(380px)' }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-xs font-bold tracking-wide ${c.dark ? 'text-white/50' : 'text-[#0a0a0a]'}`}>{c.name}</span>
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: c.dot }} />
                    </div>
                    <div className={`text-3xl font-extrabold tracking-tight leading-none ${c.dark ? 'text-white' : 'text-[#0a0a0a]'}`}>{c.big}</div>
                    <div className={`text-xs font-medium mt-1 ${c.dark ? 'text-white/35' : 'text-[#888]'}`}>{c.label}</div>
                    <div className={`h-0.5 rounded-full my-2.5 ${c.dark ? 'bg-white/10' : 'bg-[#e5e5e5]'}`}>
                      <div className="h-full rounded-full" style={{ width: `${c.bar}%`, background: c.barColor }} />
                    </div>
                    <div className="flex flex-col gap-1">
                      {c.rows.map(([l, r], j) => (
                        <div key={j} className={`flex justify-between items-center rounded-md px-2 py-1 ${c.dark ? 'bg-white/[0.06]' : 'bg-[#f5f5f7]'}`}>
                          <span className={`text-xs font-medium ${c.dark ? 'text-white/40' : 'text-[#555]'}`}>{l}</span>
                          <span className={`text-xs font-bold ${c.dark ? 'text-[#d4f53c]' : 'text-[#0a0a0a]'}`}>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="pb-12" />
      </section>

      {/* ── CASE STUDIES ── */}
      <section id="work" className="bg-white py-24 px-8 md:px-16">
        <div className="reveal text-center mb-14">
          <div className="text-xs font-semibold text-[#888] tracking-widest uppercase mb-3.5 flex items-center justify-center gap-2">
            <span className="text-[#0a0a0a]">•</span> CASE STUDIES
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0a0a0a] leading-tight mb-3.5">Selected work</h2>
          <p className="text-base text-[#888] leading-relaxed max-w-sm mx-auto">End-to-end UX design across research, systems and interfaces.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto p-4 rounded-2xl bg-[#f5f5f7]">
          {caseStudies.map((work, i) => (
            <Link key={work.slug} href={`/work/${work.slug}`} className={`reveal d${Math.min(i + 1, 4)} bg-white border border-[#e8e8e8] rounded-2xl overflow-hidden no-underline text-inherit flex flex-col transition-all duration-300 hover:[box-shadow:0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-1`}>
              <div className="min-h-64 bg-white flex items-center justify-center p-8 overflow-hidden">
                <div className="bg-[#111] rounded-xl [box-shadow:0_16px_48px_rgba(0,0,0,0.2)] p-4 w-48">
                  <div className="text-xs font-bold text-white/40 tracking-widest uppercase mb-2">{work.title}</div>
                  <div className="text-3xl font-extrabold text-white tracking-tight leading-none">{work.year}</div>
                  <div className="text-xs text-white/35 mt-0.5">{work.role}</div>
                  <div className="h-0.5 bg-white/10 rounded-full my-2.5">
                    <div className="h-full rounded-full bg-[#d4f53c] w-4/5" />
                  </div>
                  {work.tags?.slice(0, 2).map((t: string) => (
                    <div key={t} className="flex justify-between px-2 py-1 bg-white/5 rounded-md mt-1">
                      <span className="text-xs text-white/40">{t}</span>
                      <span className="text-xs text-[#d4f53c] font-bold">✓</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-8 pt-6 pb-8 border-t border-[#ebebeb] text-center">
                <div className="text-xl font-bold text-[#0a0a0a] tracking-tight mb-2 leading-snug">{work.title}</div>
                <div className="text-sm text-[#888] leading-relaxed max-w-xs mx-auto">{work.summary}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FAMILY & FRIENDS ── */}
      <section className="bg-white py-24 px-8 md:px-16 border-t border-[#ebebeb]">
        <div className="reveal text-center mb-14">
          <div className="text-xs font-semibold text-[#888] tracking-widest uppercase mb-3.5 flex items-center justify-center gap-2">
            <span className="text-[#0a0a0a]">•</span> SIDE PROJECTS
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0a0a0a] leading-tight mb-3.5">Family &amp; Friends</h2>
          <p className="text-base text-[#888] leading-relaxed max-w-sm mx-auto">Vibe coding experiments built for the people around me.</p>
        </div>
        <div className="reveal d1 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          <a href="/ai-projects" className="bg-[#f5f5f7] border border-[#e8e8e8] rounded-2xl p-8 no-underline text-inherit flex flex-col gap-3 transition-all duration-300 hover:[box-shadow:0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">
            <div className="text-4xl">⚡</div>
            <div className="text-lg font-bold text-[#0a0a0a] tracking-tight">AI Projects</div>
            <div className="text-sm text-[#888] leading-relaxed">Dashboards, apps and tools built with AI — real projects for real people.</div>
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact" className="bg-white px-8 md:px-16 pt-10 pb-16">
        <div className="max-w-6xl mx-auto bg-[#0e0e0e] rounded-3xl px-8 md:px-16 py-16 flex flex-col relative overflow-hidden min-h-96">
          <div className="absolute w-96 h-96 bg-[#2196f3] rounded-full blur-[80px] opacity-20 -top-40 -left-24 pointer-events-none" />
          <div className="absolute w-72 h-72 bg-[#d4f53c] rounded-full blur-[80px] opacity-20 -bottom-24 -right-16 pointer-events-none" />

          <div className="flex-1 flex flex-col items-center justify-center text-center relative z-[1] py-8">
            <div className="text-xs font-semibold text-white/35 tracking-widest uppercase mb-4">GET IN TOUCH</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">Let&apos;s build<br />something great.</h2>
            <p className="text-base text-white/35 leading-relaxed mb-8 max-w-xs">Open to full-time roles, freelance projects, and interesting conversations.</p>
            <a href="mailto:rajat.rajat.bhandari.1@gmail.com" className="text-xs font-bold tracking-widest uppercase text-[#0a0a0a] bg-[#d4f53c] px-6 py-3 rounded-full no-underline inline-flex items-center gap-2 [box-shadow:0_4px_20px_rgba(212,245,60,0.35)] hover:opacity-90 transition-opacity">
              GET IN TOUCH
              <span className="w-6 h-6 rounded-full bg-[#0a0a0a] flex items-center justify-center shrink-0">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="#d4f53c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-[1] pt-8 border-t border-white/10">
            <div className="flex gap-2.5 items-center">
              {[
                { href: 'https://www.linkedin.com/in/rajatbhand/',   icon: 'fa-brands fa-linkedin-in', title: 'LinkedIn'  },
                { href: 'https://www.behance.net/bhandrajat',        icon: 'fa-brands fa-behance',     title: 'Behance'   },
                { href: 'https://dribbble.com/BhandRajat',           icon: 'fa-brands fa-dribbble',    title: 'Dribbble'  },
                { href: 'https://www.instagram.com/bhandrajat.film', icon: 'fa-brands fa-instagram',   title: 'Instagram' },
              ].map(s => (
                <a key={s.title} href={s.href} target="_blank" title={s.title} className="w-11 h-11 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center text-white/40 no-underline text-base hover:bg-white/[0.14] hover:text-white hover:border-white/20 transition-all">
                  <i className={s.icon} />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm text-white/45 no-underline hover:text-white transition-colors">Home</Link>
              <Link href="/about" className="text-sm text-white/45 no-underline hover:text-white transition-colors">About</Link>
              <a href="#work" className="text-sm text-white/45 no-underline hover:text-white transition-colors">Work</a>
              <a href="https://docs.google.com/document/d/15LtMI0jpmZnQsqXwM5i7eeDp8LIsGu5tfiwo7n97w8Y/edit?usp=sharing" target="_blank" className="text-sm text-white/45 no-underline hover:text-white transition-colors">Resume</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
