'use client'

import { useEffect } from 'react'
import Link from 'next/link'

const carouselCards = [
  { name: 'Rely Platform',  big: '5',   label: 'User personas',   bar: 85,  barColor: '#d4f53c', rows: [['Research', 'Done ✓'], ['IA & Flows', 'Done ✓']], dot: '#22c55e', dark: false },
  { name: 'Partner Portal', big: '7',   label: 'Modules shipped', bar: 100, barColor: '#2196f3', rows: [['Dashboard', 'Live'],   ['Claims', 'Live']],       dot: '#2196f3', dark: true  },
  { name: 'Editorji',       big: '2M+', label: 'Monthly users',   bar: 72,  barColor: '#ef4444', rows: [['iOS App', '✓'],       ['PWA', '✓']],             dot: '#ef4444', dark: false },
  { name: 'Experience',     big: '11+', label: 'Years designing', bar: 90,  barColor: '#d4f53c', rows: [['Industries', '8+'],   ['Projects', '20+']],      dot: '#d4f53c', dark: true  },
]

const navLinkCls = 'text-xs font-medium text-white/80 no-underline px-4 py-2 rounded-lg tracking-[0.04em] uppercase hover:bg-white/10 hover:text-white transition-all duration-150'

export default function HomeClient({ works }: { works: any[] }) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const caseStudies = works.filter(w => w.slug !== 'ai-projects')

  return (
    <>
      {/* NAV */}
      <nav className="absolute top-0 left-0 right-0 z-[100] flex items-center justify-between h-[4.5rem] px-[3.75rem]">
        <Link href="/" className="text-[1.75rem] font-extrabold text-white no-underline tracking-[-0.04em] flex items-center">
          <span className="text-[1.375rem] opacity-90">®</span>B
        </Link>
        <div className="flex items-center gap-1">
          <a href="#work" className={navLinkCls}>WORK</a>
          <Link href="/about" className={navLinkCls}>ABOUT</Link>
          <a href="https://docs.google.com/document/d/15LtMI0jpmZnQsqXwM5i7eeDp8LIsGu5tfiwo7n97w8Y/edit?usp=sharing" target="_blank" className={navLinkCls}>RESUME</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center pt-[6.25rem] pb-[3.75rem] px-[3.75rem] [background:linear-gradient(180deg,#2196f3_0%,#42a5f5_25%,#64b5f6_50%,#90caf9_70%,#bbdefb_85%,#e3f2fd_95%,#f5f9ff_100%)]">
        <div className="relative z-10 text-center max-w-[42.5rem] mb-14">
          <h1 className="text-[clamp(2.75rem,7vw,4.75rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.12)] mb-5">
            Senior UX Designer<br />based in Bangalore
          </h1>
          <p className="text-base leading-[1.65] text-white/80 mb-9">
            11+ years designing digital products across fintech,<br />
            insurance, media and real estate.
          </p>
          <div className="flex gap-3 items-center justify-center flex-wrap">
            <a href="#work" className="text-[0.8125rem] font-semibold text-white/90 bg-white/10 border border-white/30 px-6 py-3 rounded-full no-underline tracking-[0.04em] uppercase hover:bg-white/20 transition-colors">
              VIEW WORK
            </a>
            <a href="mailto:rajat.rajat.bhandari.1@gmail.com" className="text-[0.8125rem] font-bold text-[#0a0a0a] bg-[#d4f53c] px-6 py-3 rounded-full no-underline tracking-[0.04em] uppercase inline-flex items-center gap-2 [box-shadow:0_4px_20px_rgba(212,245,60,0.35)] hover:opacity-90 transition-opacity">
              GET IN TOUCH
              <span className="w-[1.375rem] h-[1.375rem] rounded-full bg-[#0a0a0a] flex items-center justify-center shrink-0">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="#d4f53c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative z-10 w-screen overflow-hidden -mx-[3.75rem] py-2 pb-6">
          <div className="rb-carousel-track">
            {[...carouselCards, ...carouselCards].map((c, i) => (
              <div key={i} className={`shrink-0 w-[16.25rem] h-[11.25rem] rounded-2xl overflow-hidden border p-4 flex flex-col cursor-pointer [backdrop-filter:blur(20px)] [box-shadow:0_16px_48px_rgba(0,0,0,0.18)] hover:-translate-y-1.5 transition-transform duration-300 ${c.dark ? 'bg-[#0a0a0a] border-white/20' : 'bg-white/90 border-white/70'}`}>
                <div className="flex justify-between items-center mb-2.5">
                  <span className={`text-[0.6875rem] font-bold tracking-[0.02em] ${c.dark ? 'text-white/50' : 'text-[#0a0a0a]'}`}>{c.name}</span>
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: c.dot }} />
                </div>
                <div className={`text-3xl font-extrabold tracking-[-0.03em] leading-none ${c.dark ? 'text-white' : 'text-[#0a0a0a]'}`}>{c.big}</div>
                <div className={`text-[0.625rem] font-medium mt-1 ${c.dark ? 'text-white/35' : 'text-[#888]'}`}>{c.label}</div>
                <div className={`h-0.5 rounded-full my-2.5 ${c.dark ? 'bg-white/10' : 'bg-[#e5e5e5]'}`}>
                  <div className="h-full rounded-full" style={{ width: `${c.bar}%`, background: c.barColor }} />
                </div>
                <div className="flex flex-col gap-1">
                  {c.rows.map(([l, r], j) => (
                    <div key={j} className={`flex justify-between items-center rounded-md px-2 py-1 ${c.dark ? 'bg-white/[0.06]' : 'bg-[#f5f5f7]'}`}>
                      <span className={`text-[0.5625rem] font-medium ${c.dark ? 'text-white/40' : 'text-[#555]'}`}>{l}</span>
                      <span className={`text-[0.5625rem] font-bold ${c.dark ? 'text-[#d4f53c]' : 'text-[#0a0a0a]'}`}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="work" className="bg-white py-[6.25rem] px-[3.75rem]">
        <div className="reveal text-center mb-14">
          <div className="text-xs font-semibold text-[#888] tracking-[0.14em] uppercase mb-3.5 flex items-center justify-center gap-2">
            <span className="text-[#0a0a0a]">•</span> CASE STUDIES
          </div>
          <h2 className="text-[clamp(2.125rem,5vw,3.5rem)] font-extrabold tracking-[-0.035em] text-[#0a0a0a] leading-[1.06] mb-3.5">Selected work</h2>
          <p className="text-[0.9375rem] text-[#888] leading-[1.7] max-w-[28.75rem] mx-auto">End-to-end UX design across research, systems and interfaces.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-[68.75rem] mx-auto p-4 rounded-[1.25rem] bg-[#f5f5f7]">
          {caseStudies.map((work, i) => (
            <Link key={work.slug} href={`/work/${work.slug}`} className={`reveal d${Math.min(i + 1, 4)} bg-white border border-[#e8e8e8] rounded-[1.25rem] overflow-hidden no-underline text-inherit flex flex-col transition-all duration-300 hover:[box-shadow:0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-1`}>
              {/* Visual */}
              <div className="min-h-[16.25rem] bg-white flex items-center justify-center p-8 overflow-hidden">
                <div className="bg-[#111] rounded-[0.875rem] [box-shadow:0_16px_48px_rgba(0,0,0,0.2)] p-4 w-[12.5rem]">
                  <div className="text-[0.5625rem] font-bold text-white/40 tracking-[0.06em] uppercase mb-2">{work.title}</div>
                  <div className="text-[1.75rem] font-extrabold text-white tracking-[-0.03em] leading-none">{work.year}</div>
                  <div className="text-[0.5625rem] text-white/35 mt-0.5">{work.role}</div>
                  <div className="h-0.5 bg-white/10 rounded-full my-2.5">
                    <div className="h-full rounded-full bg-[#d4f53c] w-4/5" />
                  </div>
                  {work.tags?.slice(0, 2).map((t: string) => (
                    <div key={t} className="flex justify-between px-2 py-1 bg-white/5 rounded-md mt-1">
                      <span className="text-[0.5rem] text-white/40">{t}</span>
                      <span className="text-[0.5rem] text-[#d4f53c] font-bold">✓</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Text */}
              <div className="px-8 pt-7 pb-8 border-t border-[#ebebeb] text-center">
                <div className="text-[1.375rem] font-bold text-[#0a0a0a] tracking-[-0.02em] mb-2.5 leading-[1.2]">{work.title}</div>
                <div className="text-sm text-[#888] leading-[1.65] max-w-[22.5rem] mx-auto">{work.summary}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAMILY & FRIENDS */}
      <section className="bg-white py-[6.25rem] px-[3.75rem] border-t border-[#ebebeb]">
        <div className="reveal text-center mb-14">
          <div className="text-xs font-semibold text-[#888] tracking-[0.14em] uppercase mb-3.5 flex items-center justify-center gap-2">
            <span className="text-[#0a0a0a]">•</span> SIDE PROJECTS
          </div>
          <h2 className="text-[clamp(2.125rem,5vw,3.5rem)] font-extrabold tracking-[-0.035em] text-[#0a0a0a] leading-[1.06] mb-3.5">Family &amp; Friends</h2>
          <p className="text-[0.9375rem] text-[#888] leading-[1.7] max-w-[28.75rem] mx-auto">Vibe coding experiments built for the people around me.</p>
        </div>
        <div className="reveal d1 grid grid-cols-3 gap-4 max-w-[68.75rem] mx-auto">
          <a href="/ai-projects" className="bg-[#f5f5f7] border border-[#e8e8e8] rounded-[1.25rem] p-8 no-underline text-inherit flex flex-col gap-3 transition-all duration-300 hover:[box-shadow:0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">
            <div className="text-[2rem]">⚡</div>
            <div className="text-lg font-bold text-[#0a0a0a] tracking-[-0.02em]">AI Projects</div>
            <div className="text-sm text-[#888] leading-[1.65]">Dashboards, apps and tools built with AI — real projects for real people.</div>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-white px-[3.75rem] pt-10 pb-[3.75rem]">
        <div className="max-w-[68.75rem] mx-auto bg-[#0e0e0e] rounded-3xl px-16 py-[3.75rem] flex flex-col relative overflow-hidden min-h-[22.5rem]">
          {/* Glow blobs */}
          <div className="absolute w-[25rem] h-[25rem] bg-[#2196f3] rounded-full blur-[5rem] opacity-20 -top-[9.375rem] -left-[6.25rem] pointer-events-none" />
          <div className="absolute w-[18.75rem] h-[18.75rem] bg-[#d4f53c] rounded-full blur-[5rem] opacity-20 -bottom-[6.25rem] -right-[5rem] pointer-events-none" />

          {/* Centre — title + CTA */}
          <div className="flex-1 flex flex-col items-center justify-center text-center relative z-[1] py-8">
            <div className="text-[0.6875rem] font-semibold text-white/35 tracking-[0.14em] uppercase mb-4">GET IN TOUCH</div>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold text-white tracking-[-0.03em] leading-[1.1] mb-4">Let&apos;s build<br />something great.</h2>
            <p className="text-[0.9375rem] text-white/35 leading-[1.7] mb-8 max-w-[22.5rem]">Open to full-time roles, freelance projects, and interesting conversations.</p>
            <a href="mailto:rajat.rajat.bhandari.1@gmail.com" className="text-[0.8125rem] font-bold text-[#0a0a0a] bg-[#d4f53c] px-6 py-3 rounded-full no-underline tracking-[0.04em] uppercase inline-flex items-center gap-2 [box-shadow:0_4px_20px_rgba(212,245,60,0.35)] hover:opacity-90 transition-opacity">
              GET IN TOUCH
              <span className="w-[1.375rem] h-[1.375rem] rounded-full bg-[#0a0a0a] flex items-center justify-center shrink-0">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="#d4f53c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
          </div>

          {/* Bottom bar — social left, pages right */}
          <div className="flex items-center justify-between relative z-[1] pt-8 border-t border-white/10">
            <div className="flex gap-2.5 items-center">
              {[
                { href: 'https://www.linkedin.com/in/rajatbhand/',   icon: 'fa-brands fa-linkedin-in', title: 'LinkedIn'  },
                { href: 'https://www.behance.net/bhandrajat',        icon: 'fa-brands fa-behance',     title: 'Behance'   },
                { href: 'https://dribbble.com/BhandRajat',           icon: 'fa-brands fa-dribbble',    title: 'Dribbble'  },
                { href: 'https://www.instagram.com/bhandrajat.film', icon: 'fa-brands fa-instagram',   title: 'Instagram' },
              ].map(s => (
                <a key={s.title} href={s.href} target="_blank" title={s.title} className="w-11 h-11 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center text-white/40 no-underline text-base hover:bg-white/[0.14] hover:text-white hover:border-white/[0.22] transition-all">
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
