'use client'

import { useEffect } from 'react'
import Link from 'next/link'

const carouselCards = [
  { name:'Rely Platform', big:'5', label:'User personas', bar:85, barColor:'#d4f53c', rows:[['Research','Done ✓'],['IA & Flows','Done ✓']], dot:'#22c55e', dark:false },
  { name:'Partner Portal', big:'7', label:'Modules shipped', bar:100, barColor:'#2196f3', rows:[['Dashboard','Live'],['Claims','Live']], dot:'#2196f3', dark:true },
  { name:'Editorji', big:'2M+', label:'Monthly users', bar:72, barColor:'#ef4444', rows:[['iOS App','✓'],['PWA','✓']], dot:'#ef4444', dark:false },
  { name:'Experience', big:'11+', label:'Years designing', bar:90, barColor:'#d4f53c', rows:[['Industries','8+'],['Projects','20+']], dot:'#d4f53c', dark:true },
]

export default function HomeClient({ works }: { works: any[], site: any }) {
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
      {/* NAV */}
      <nav className="absolute top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 md:px-[60px] h-[72px]">
        <Link href="/" className="text-[28px] font-extrabold text-white no-underline tracking-[-0.04em] flex items-center">
          <span className="text-[22px] font-extrabold text-white/90">®</span>B
        </Link>
        <div className="flex items-center gap-1">
          <a href="#work" className="text-[13px] font-medium text-white/80 no-underline px-3 md:px-4 py-2 rounded-lg tracking-[0.04em] uppercase hover:bg-white/10 hover:text-white transition-all duration-150">WORK</a>
          <Link href="/about" className="text-[13px] font-medium text-white/80 no-underline px-3 md:px-4 py-2 rounded-lg tracking-[0.04em] uppercase hover:bg-white/10 hover:text-white transition-all duration-150">ABOUT</Link>
          <a href="https://docs.google.com/document/d/15LtMI0jpmZnQsqXwM5i7eeDp8LIsGu5tfiwo7n97w8Y/edit?usp=sharing" target="_blank" className="hidden sm:block text-[13px] font-medium text-white/80 no-underline px-3 md:px-4 py-2 rounded-lg tracking-[0.04em] uppercase hover:bg-white/10 hover:text-white transition-all duration-150">RESUME</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4 md:px-[60px] pt-[100px] pb-[60px] [background:linear-gradient(180deg,#2196f3_0%,#42a5f5_25%,#64b5f6_50%,#90caf9_70%,#bbdefb_85%,#e3f2fd_95%,#f5f9ff_100%)]">

        <div className="relative z-10 text-center max-w-[680px] mb-14">
          <h1 className="text-[44px] sm:text-[58px] lg:text-[76px] font-extrabold leading-[1.06] tracking-[-0.03em] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.12)] mb-5">
            Senior UX Designer<br />based in Bangalore
          </h1>
          <p className="text-base font-normal leading-[1.65] text-white/80 mb-9">
            11+ years designing digital products across fintech,<br className="hidden sm:block" />
            insurance, media and real estate.
          </p>
          <div className="flex gap-3 items-center justify-center flex-wrap">
            <a href="#work" className="text-[13px] font-semibold text-white/90 bg-white/10 border border-white/30 backdrop-blur-sm px-6 py-3 rounded-full no-underline tracking-[0.04em] uppercase hover:bg-white/20 transition-colors">VIEW WORK</a>
            <a href="mailto:rajat.rajat.bhandari.1@gmail.com" className="text-[13px] font-bold text-[#0a0a0a] bg-[#d4f53c] px-6 py-3 rounded-full no-underline tracking-[0.04em] uppercase inline-flex items-center gap-2 hover:opacity-90 transition-opacity [box-shadow:0_4px_20px_rgba(212,245,60,0.35)]">
              GET IN TOUCH
              <span className="w-[22px] h-[22px] rounded-full bg-[#0a0a0a] flex items-center justify-center shrink-0">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="#d4f53c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
          </div>
        </div>

        {/* CAROUSEL */}
        <div className="relative z-10 w-screen overflow-hidden -mx-4 md:-mx-[60px] py-2 pb-6">
          <div className="rb-carousel-track">
            {[...carouselCards, ...carouselCards].map((c, i) => (
              <div key={i} className={`shrink-0 w-[260px] h-[180px] rounded-2xl overflow-hidden border p-4 flex flex-col cursor-pointer transition-transform duration-300 hover:-translate-y-1.5 ${c.dark ? 'bg-[#0a0a0a] border-white/20' : 'bg-white/90 border-white/70'}`} style={{backdropFilter:'blur(20px)',boxShadow:'0 16px 48px rgba(0,0,0,0.18)'}}>
                <div className="flex justify-between items-center mb-2.5">
                  <span className={`text-[11px] font-bold tracking-[0.02em] ${c.dark ? 'text-white/50' : 'text-[#0a0a0a]'}`}>{c.name}</span>
                  <span className="w-2 h-2 rounded-full shrink-0" style={{background:c.dot}}></span>
                </div>
                <div className={`text-[30px] font-extrabold tracking-[-0.03em] leading-none ${c.dark ? 'text-white' : 'text-[#0a0a0a]'}`}>{c.big}</div>
                <div className={`text-[10px] font-medium mt-1 ${c.dark ? 'text-white/35' : 'text-[#888]'}`}>{c.label}</div>
                <div className={`h-[3px] rounded-full my-2.5 ${c.dark ? 'bg-white/10' : 'bg-[#e5e5e5]'}`}>
                  <div className="h-full rounded-full" style={{width:`${c.bar}%`,background:c.barColor}}></div>
                </div>
                <div className="flex flex-col gap-1">
                  {c.rows.map(([l,r],j) => (
                    <div key={j} className={`flex justify-between items-center rounded-md px-2 py-1 ${c.dark ? 'bg-white/[0.06]' : 'bg-[#f5f5f7]'}`}>
                      <span className={`text-[9px] font-medium ${c.dark ? 'text-white/40' : 'text-[#555]'}`}>{l}</span>
                      <span className={`text-[9px] font-bold ${c.dark ? 'text-[#d4f53c]' : 'text-[#0a0a0a]'}`}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="work" className="bg-white py-16 md:py-[100px] px-4 md:px-[60px]">
        <div className="text-center mb-14 reveal">
          <div className="text-[12px] font-semibold text-[#888] tracking-[0.14em] uppercase mb-3.5 flex items-center justify-center gap-2 before:content-['•'] before:text-[#0a0a0a]">CASE STUDIES</div>
          <h2 className="text-[34px] md:text-[56px] font-extrabold tracking-[-0.035em] text-[#0a0a0a] leading-[1.06] mb-3.5">Selected work</h2>
          <p className="text-[15px] text-[#888] leading-[1.7] max-w-[460px] mx-auto font-normal">End-to-end UX design across research, systems and interfaces.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1100px] mx-auto p-4 rounded-[20px] bg-[#f5f5f7]">
          {caseStudies.map((work, i) => (
            <Link key={work.slug} className={`reveal d${Math.min(i+1,4)} bg-white border border-[#e8e8e8] rounded-[20px] overflow-hidden no-underline text-inherit flex flex-col transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-1`} href={`/work/${work.slug}`}>
              <div className="min-h-[260px] bg-white relative flex items-center justify-center p-8 overflow-hidden">
                <div className="bg-[#111] rounded-[14px] shadow-[0_16px_48px_rgba(0,0,0,0.2)] p-4 w-[200px] relative z-[2]">
                  <div className="text-[9px] font-bold text-white/40 tracking-[0.06em] uppercase mb-2">{work.title}</div>
                  <div className="text-[28px] font-extrabold text-white tracking-[-0.03em] leading-none">{work.year}</div>
                  <div className="text-[9px] text-white/35 mt-0.5">{work.role}</div>
                  <div className="h-[3px] bg-white/10 rounded-full my-2.5"><div className="h-full rounded-full bg-[#d4f53c] w-4/5"></div></div>
                  {work.tags?.slice(0,2).map((t:string) => (
                    <div key={t} className="flex justify-between px-2 py-1 bg-white/5 rounded-md mt-1">
                      <span className="text-[8px] text-white/40">{t}</span>
                      <span className="text-[8px] text-[#d4f53c] font-bold">✓</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-8 pt-7 pb-8 border-t border-[#ebebeb] text-center">
                <div className="text-[22px] font-bold text-[#0a0a0a] tracking-[-0.02em] mb-2.5 leading-[1.2]">{work.title}</div>
                <div className="text-[14px] text-[#888] leading-[1.65] font-normal max-w-[360px] mx-auto">{work.summary}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAMILY & FRIENDS */}
      <section className="bg-white py-16 md:py-[100px] px-4 md:px-[60px] border-t border-[#ebebeb]">
        <div className="text-center mb-14 reveal">
          <div className="text-[12px] font-semibold text-[#888] tracking-[0.14em] uppercase mb-3.5 flex items-center justify-center gap-2 before:content-['•'] before:text-[#0a0a0a]">SIDE PROJECTS</div>
          <h2 className="text-[34px] md:text-[56px] font-extrabold tracking-[-0.035em] text-[#0a0a0a] leading-[1.06] mb-3.5">Family &amp; Friends</h2>
          <p className="text-[15px] text-[#888] leading-[1.7] max-w-[460px] mx-auto font-normal">Vibe coding experiments built for the people around me.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1100px] mx-auto reveal d1">
          <a href="/ai-projects" className="bg-[#f5f5f7] border border-[#e8e8e8] rounded-[20px] p-8 no-underline text-inherit flex flex-col gap-3 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">
            <div className="text-[32px]">⚡</div>
            <div className="text-[18px] font-bold text-[#0a0a0a] tracking-[-0.02em]">AI Projects</div>
            <div className="text-[14px] text-[#888] leading-[1.65]">Dashboards, apps and tools built with AI — real projects for real people.</div>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-white px-4 md:px-[60px] pt-10 pb-[60px]">
        <div className="max-w-[1100px] mx-auto bg-[#0e0e0e] rounded-[24px] px-8 md:px-16 py-[60px] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 relative overflow-hidden min-h-[360px]">
          <div className="absolute w-[400px] h-[400px] bg-[#2196f3] rounded-full blur-[80px] opacity-20 -top-[150px] -left-[100px] pointer-events-none"></div>
          <div className="absolute w-[300px] h-[300px] bg-[#d4f53c] rounded-full blur-[80px] opacity-20 -bottom-[100px] -right-[80px] pointer-events-none"></div>

          <div className="flex flex-col relative z-[1]">
            <div className="text-[11px] font-semibold text-white/35 tracking-[0.14em] uppercase mb-4">GET IN TOUCH</div>
            <h2 className="text-[28px] md:text-[44px] font-extrabold text-white tracking-[-0.03em] leading-[1.1] mb-4">Let&apos;s build<br />something great.</h2>
            <p className="text-[15px] text-white/35 leading-[1.7] font-normal mb-8 max-w-[360px]">Open to full-time roles, freelance projects, and interesting conversations.</p>
            <a href="mailto:rajat.rajat.bhandari.1@gmail.com" className="text-[13px] font-bold text-[#0a0a0a] bg-[#d4f53c] px-6 py-3 rounded-full no-underline tracking-[0.04em] uppercase inline-flex items-center gap-2 self-start hover:opacity-90 transition-opacity [box-shadow:0_4px_20px_rgba(212,245,60,0.35)]">
              GET IN TOUCH
              <span className="w-[22px] h-[22px] rounded-full bg-[#0a0a0a] flex items-center justify-center shrink-0">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="#d4f53c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
          </div>

          <div className="flex flex-col justify-between pt-1 relative z-[1]">
            <div>
              <div className="text-[11px] font-bold text-white/35 tracking-[0.12em] uppercase mb-4">PAGES</div>
              <Link href="/" className="block text-[16px] font-normal text-white/55 no-underline mb-3 hover:text-white transition-colors">Home</Link>
              <Link href="/about" className="block text-[16px] font-normal text-white/55 no-underline mb-3 hover:text-white transition-colors">About</Link>
              <a href="https://docs.google.com/document/d/15LtMI0jpmZnQsqXwM5i7eeDp8LIsGu5tfiwo7n97w8Y/edit?usp=sharing" target="_blank" className="block text-[16px] font-normal text-white/55 no-underline mb-3 hover:text-white transition-colors">Resume</a>
              <a href="#work" className="block text-[16px] font-normal text-white/55 no-underline mb-3 hover:text-white transition-colors">Work</a>
            </div>
            <div className="flex gap-2.5 items-center mt-6 md:mt-0">
              <a href="https://www.linkedin.com/in/rajatbhand/" target="_blank" className="w-11 h-11 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center text-white/40 no-underline text-base hover:bg-white/[0.14] hover:text-white hover:border-white/[0.22] transition-all" title="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="https://www.behance.net/bhandrajat" target="_blank" className="w-11 h-11 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center text-white/40 no-underline text-base hover:bg-white/[0.14] hover:text-white hover:border-white/[0.22] transition-all" title="Behance"><i className="fa-brands fa-behance"></i></a>
              <a href="https://dribbble.com/BhandRajat" target="_blank" className="w-11 h-11 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center text-white/40 no-underline text-base hover:bg-white/[0.14] hover:text-white hover:border-white/[0.22] transition-all" title="Dribbble"><i className="fa-brands fa-dribbble"></i></a>
              <a href="https://www.instagram.com/bhandrajat.film" target="_blank" className="w-11 h-11 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center text-white/40 no-underline text-base hover:bg-white/[0.14] hover:text-white hover:border-white/[0.22] transition-all" title="Instagram"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
