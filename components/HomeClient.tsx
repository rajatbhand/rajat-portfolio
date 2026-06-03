'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function HomeClient({ works, site }: { works: any[], site: any }) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) } })
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Only show published case study projects (not AI projects)
  const caseStudies = works.filter(w => w.slug !== 'ai-projects')

  return (
    <>
      {/* NAV */}
      <nav className="rb-nav">
        <Link href="/" className="rb-logo"><span className="rb-reg">®</span>B</Link>
        <div className="rb-nav-links">
          <a href="#work" className="rb-nav-link">WORK</a>
          <Link href="/about" className="rb-nav-link">ABOUT</Link>
          <a href="https://docs.google.com/document/d/15LtMI0jpmZnQsqXwM5i7eeDp8LIsGu5tfiwo7n97w8Y/edit?usp=sharing" target="_blank" className="rb-nav-link">RESUME</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="rb-hero">
<div className="rb-hero-content">
          <h1 className="rb-hero-h1">Senior UX Designer<br/>based in Bangalore</h1>
          <p className="rb-hero-sub">11+ years designing digital products across fintech,<br/>insurance, media and real estate.</p>
          <div className="rb-hero-btns">
            <a href="#work" className="rb-btn-outline">VIEW WORK</a>
            <a href="mailto:rajat.rajat.bhandari.1@gmail.com" className="rb-btn-yellow">
              GET IN TOUCH
              <span className="rb-btn-arrow">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="#d4f53c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
          </div>
        </div>

        {/* CAROUSEL */}
        <div className="rb-carousel-wrap">
          <div className="rb-carousel-track">
            {[
              { name:'Rely Platform', big:'5', label:'User personas', bar:85, barColor:'#d4f53c', rows:[['Research','Done ✓'],['IA & Flows','Done ✓']], dot:'#22c55e', dark:false },
              { name:'Partner Portal', big:'7', label:'Modules shipped', bar:100, barColor:'#2196f3', rows:[['Dashboard','Live'],['Claims','Live']], dot:'#2196f3', dark:true },
              { name:'Editorji', big:'2M+', label:'Monthly users', bar:72, barColor:'#ef4444', rows:[['iOS App','✓'],['PWA','✓']], dot:'#ef4444', dark:false },
              { name:'Experience', big:'11+', label:'Years designing', bar:90, barColor:'#d4f53c', rows:[['Industries','8+'],['Projects','20+']], dot:'#d4f53c', dark:true },
            ].concat([
              { name:'Rely Platform', big:'5', label:'User personas', bar:85, barColor:'#d4f53c', rows:[['Research','Done ✓']], dot:'#22c55e', dark:false },
              { name:'Partner Portal', big:'7', label:'Modules shipped', bar:100, barColor:'#2196f3', rows:[['Dashboard','Live']], dot:'#2196f3', dark:true },
              { name:'Editorji', big:'2M+', label:'Monthly users', bar:72, barColor:'#ef4444', rows:[['iOS App','✓']], dot:'#ef4444', dark:false },
              { name:'Experience', big:'11+', label:'Years designing', bar:90, barColor:'#d4f53c', rows:[['Industries','8+']], dot:'#d4f53c', dark:true },
            ]).map((c, i) => (
              <div key={i} className={`rb-c-card${c.dark ? ' rb-dark' : ''}`}>
                <div className="rb-c-card-header">
                  <span className="rb-c-card-name">{c.name}</span>
                  <span className="rb-c-dot" style={{background:c.dot}}></span>
                </div>
                <div className="rb-c-card-big">{c.big}</div>
                <div className="rb-c-card-label">{c.label}</div>
                <div className="rb-c-bar-bg"><div className="rb-c-bar-fg" style={{width:`${c.bar}%`,background:c.barColor}}></div></div>
                <div className="rb-c-rows">
                  {c.rows.map(([l,r],j) => (
                    <div key={j} className="rb-c-row"><span className="rb-c-row-l">{l}</span><span className="rb-c-row-r">{r}</span></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="work" className="rb-work">
        <div className="rb-work-heading reveal">
          <div className="rb-work-eyebrow">CASE STUDIES</div>
          <h2 className="rb-work-h2">Selected work</h2>
          <p className="rb-work-sub">End-to-end UX design across research, systems and interfaces.</p>
        </div>
        <div className="rb-work-grid">
          {caseStudies.map((work, i) => (
            <Link key={work.slug} className={`rb-work-card reveal d${Math.min(i+1,4)}`} href={`/work/${work.slug}`}>
              <div className="rb-card-visual">
                <div className="rb-mock">
                  <div className="rb-mock-title">{work.title}</div>
                  <div className="rb-mock-big">{work.year}</div>
                  <div className="rb-mock-label">{work.role}</div>
                  <div className="rb-mock-bar-bg"><div className="rb-mock-bar-fg"></div></div>
                  {work.tags?.slice(0,2).map((t:string) => (
                    <div key={t} className="rb-mock-row"><span className="rb-mock-row-l">{t}</span><span className="rb-mock-row-r">✓</span></div>
                  ))}
                </div>
              </div>
              <div className="rb-card-info">
                <div className="rb-card-title">{work.title}</div>
                <div className="rb-card-desc">{work.summary}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAMILY & FRIENDS */}
      <section className="rb-faf">
        <div className="rb-work-heading reveal">
          <div className="rb-work-eyebrow">SIDE PROJECTS</div>
          <h2 className="rb-work-h2">Family &amp; Friends</h2>
          <p className="rb-work-sub">Vibe coding experiments built for the people around me.</p>
        </div>
        <div className="rb-faf-grid reveal d1">
          <a href="/ai-projects" className="rb-faf-card">
            <div className="rb-faf-card-icon">⚡</div>
            <div className="rb-faf-card-title">AI Projects</div>
            <div className="rb-faf-card-desc">Dashboards, apps and tools built with AI — real projects for real people.</div>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="rb-footer">
        <div className="rb-footer-card">
          <div className="rb-cta-blob rb-cta-blob-1"></div>
          <div className="rb-cta-blob rb-cta-blob-2"></div>
          <div className="rb-footer-cta">
            <div className="rb-footer-eyebrow">GET IN TOUCH</div>
            <h2 className="rb-footer-h2">Let&apos;s build<br/>something great.</h2>
            <p className="rb-footer-sub">Open to full-time roles, freelance projects, and interesting conversations.</p>
            <a href="mailto:rajat.rajat.bhandari.1@gmail.com" className="rb-btn-yellow">
              GET IN TOUCH
              <span className="rb-btn-arrow">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="#d4f53c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
          </div>
          <div className="rb-footer-right">
            <div>
              <div className="rb-footer-col-title">PAGES</div>
              <Link href="/" className="rb-footer-link">Home</Link>
              <Link href="/about" className="rb-footer-link">About</Link>
              <a href="https://docs.google.com/document/d/15LtMI0jpmZnQsqXwM5i7eeDp8LIsGu5tfiwo7n97w8Y/edit?usp=sharing" target="_blank" className="rb-footer-link">Resume</a>
              <a href="#work" className="rb-footer-link">Work</a>
            </div>
            <div className="rb-footer-socials">
              <a href="https://www.linkedin.com/in/rajatbhand/" target="_blank" className="rb-soc-icon" title="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="https://www.behance.net/bhandrajat" target="_blank" className="rb-soc-icon" title="Behance"><i className="fa-brands fa-behance"></i></a>
              <a href="https://dribbble.com/BhandRajat" target="_blank" className="rb-soc-icon" title="Dribbble"><i className="fa-brands fa-dribbble"></i></a>
              <a href="https://www.instagram.com/bhandrajat.film" target="_blank" className="rb-soc-icon" title="Instagram"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
