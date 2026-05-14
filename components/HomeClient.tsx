'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { WorkMeta } from '@/lib/content'

interface Props {
  works: WorkMeta[]
  site: typeof import('@/data/site.json')
}

const VISUAL_STYLES: Record<string, string> = {
  rely: 'bg-[#0f0f1a]',
  portal: 'bg-[#0f1a0f]',
  editorji: 'bg-[#1a0f0f]',
  lab: 'bg-[#0f0f0f]',
}

export default function HomeClient({ works, site }: Props) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, rx: 0, ry: 0 })

  useEffect(() => {
    // Cursor
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }
    document.addEventListener('mousemove', onMove)

    let raf: number
    const animateRing = () => {
      mouseRef.current.rx += (mouseRef.current.x - mouseRef.current.rx) * 0.12
      mouseRef.current.ry += (mouseRef.current.y - mouseRef.current.ry) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = mouseRef.current.rx + 'px'
        ringRef.current.style.top = mouseRef.current.ry + 'px'
      }
      raf = requestAnimationFrame(animateRing)
    }
    raf = requestAnimationFrame(animateRing)

    // Cursor hover effect
    const links = document.querySelectorAll('a, button')
    const onEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(2)'
        cursorRef.current.style.background = '#ffcc00'
      }
    }
    const onLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
        cursorRef.current.style.background = '#ff3c00'
      }
    }
    links.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' })
    reveals.forEach(el => observer.observe(el))

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Cursor */}
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-6"
        style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.95) 0%, transparent 100%)' }}>
        <Link href="/"
          className="font-mono text-[13px] tracking-[0.15em] text-[var(--text)] no-underline">
          RB<span className="text-[var(--accent)]">.</span>
        </Link>
        <ul className="flex gap-10 list-none">
          {['Work', 'About', 'Experience', 'Contact'].map(item => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`}
                className="font-mono text-[12px] tracking-[0.12em] text-[var(--muted)] no-underline uppercase hover:text-[var(--text)] transition-colors duration-200">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-end px-12 pb-20 relative overflow-hidden">
        {/* BG lines */}
        {[0, 1, 2].map(i => (
          <div key={i} className="absolute top-0 w-px h-full pointer-events-none"
            style={{
              right: i === 0 ? 0 : i === 1 ? '33.33%' : '66.66%',
              background: 'linear-gradient(to bottom, transparent 0%, #ff3c00 40%, transparent 100%)',
              opacity: i === 0 ? 0.3 : i === 1 ? 0.1 : 0.08,
              animation: `linePulse 4s ease-in-out infinite ${i * 1.5}s`,
            }} />
        ))}

        <div className="animate-fade-up animate-delay-1 flex items-center gap-4 mb-6">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-green-400 uppercase border border-green-400/20 bg-green-400/5 px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: 'blink 2s ease-in-out infinite' }} />
            {site.availability}
          </div>
        </div>

        <h1 className="animate-fade-up animate-delay-2 leading-[0.88] text-white"
          style={{ fontFamily: 'var(--font-display), Bebas Neue, sans-serif', fontSize: 'clamp(100px, 16vw, 240px)', letterSpacing: '-0.01em' }}>
          {site.name.split(' ')[0]}<br />
          <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', color: 'transparent' }}>
            {site.name.split(' ')[1].slice(0, 4)}
          </span>
          <span className="text-[var(--accent)]">{site.name.split(' ')[1].slice(4, 6)}</span>
          {site.name.split(' ')[1].slice(6)}
        </h1>

        <div className="animate-fade-up animate-delay-3 flex justify-between items-end mt-12">
          <p className="max-w-[420px] text-[15px] leading-[1.7] text-[rgba(240,237,232,0.6)] font-[Syne,sans-serif]">
            <strong className="text-[var(--text)]">{site.role}</strong> with {site.stats[0].num} crafting digital products across fintech, insurance, media & real estate.{' '}
            <strong className="text-[var(--text)]">I turn complex problems into clear, elegant experiences.</strong>
          </p>
          <div className="flex gap-12">
            {site.stats.map(s => (
              <div key={s.label} className="text-right">
                <div style={{ fontFamily: 'var(--font-display), Bebas Neue, sans-serif', fontSize: 48, lineHeight: 1, color: 'white' }}>
                  {s.num.replace('+', '')}<span className="text-[var(--accent)]">+</span>
                </div>
                <div className="font-mono text-[10px] tracking-[0.15em] text-[var(--muted)] uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-up animate-delay-4 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted)] uppercase">Scroll</span>
          <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, #ff3c00, transparent)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* Marquee */}
      <div className="border-t border-b overflow-hidden py-[18px]" style={{ borderColor: 'var(--border)' }}>
        <div className="marquee-track gap-0">
          {[...site.marquee, ...site.marquee].map((item, i) => (
            <div key={i} className="flex items-center gap-8 px-8 font-mono text-[11px] tracking-[0.2em] text-[var(--muted)] uppercase whitespace-nowrap">
              <span className="w-1 h-1 rounded-full bg-[var(--accent)] flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Work */}
      <section className="px-12 pt-20 pb-30" id="work">
        <div className="reveal flex items-center gap-4 font-mono text-[11px] tracking-[0.25em] text-[var(--accent)] uppercase mb-16">
          <span className="w-8 h-px bg-[var(--accent)]" />
          Selected Work
        </div>

        <div className="reveal flex justify-between items-end mb-20">
          <h2 style={{ fontFamily: 'var(--font-display), Bebas Neue, sans-serif', fontSize: 'clamp(56px, 8vw, 120px)', lineHeight: 0.9, color: 'white' }}>
            CASE<br />
            <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)', color: 'transparent' }}>STUDIES</span>
          </h2>
          <Link href="/work"
            className="font-mono text-[12px] tracking-[0.12em] text-[var(--muted)] uppercase border px-6 py-3 mb-2 transition-all duration-300 hover:text-[var(--accent)] hover:border-[var(--accent)] no-underline"
            style={{ borderColor: 'var(--border)' }}>
            View All →
          </Link>
        </div>

        <div className="flex flex-col gap-0.5">
          {works.map((work, i) => (
            <Link key={work.slug} href={`/work/${work.slug}`}
              className="group relative flex gap-12 items-center p-12 border no-underline transition-all duration-300 hover:border-[rgba(255,60,0,0.3)]"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)', animationDelay: `${i * 0.1}s` }}>

              {/* Hover bg */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(255,60,0,0.04) 0%, transparent 100%)' }} />

              {/* Info */}
              <div className="flex-1 relative z-10">
                <div className="font-mono text-[11px] tracking-[0.2em] text-[var(--muted)] mb-6">
                  {String(i + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {work.isNew && (
                    <span className="font-mono text-[10px] tracking-[0.12em] uppercase px-3 py-1 text-[var(--accent)] border border-[rgba(255,60,0,0.3)] bg-[rgba(255,60,0,0.05)]">
                      New
                    </span>
                  )}
                  {work.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="font-mono text-[10px] tracking-[0.12em] uppercase px-3 py-1 text-[var(--muted)] border"
                      style={{ borderColor: 'var(--border)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display), Bebas Neue, sans-serif', fontSize: 'clamp(36px, 4vw, 64px)', lineHeight: 1, color: 'white', letterSpacing: '0.02em' }}>
                  {work.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.7] text-[rgba(240,237,232,0.55)] max-w-sm">
                  {work.summary}
                </p>
              </div>

              {/* Visual */}
              <div className={`relative w-[380px] h-[260px] flex-shrink-0 border overflow-hidden flex items-center justify-center ${VISUAL_STYLES[work.visual] || 'bg-[#111]'}`}
                style={{ borderColor: 'var(--border)' }}>
                <div className="absolute inset-0"
                  style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div style={{ fontFamily: 'var(--font-display), Bebas Neue, sans-serif', fontSize: 96, color: 'rgba(255,60,0,0.12)', letterSpacing: '0.1em', position: 'relative', zIndex: 1 }}>
                  {work.title.slice(0, 2).toUpperCase()}
                </div>
                {work.visual === 'rely' && (
                  <div className="absolute w-40 h-40 border border-[rgba(255,60,0,0.2)] rounded-full"
                    style={{ animation: 'pulseRing 3s ease-in-out infinite' }} />
                )}
              </div>

              {/* Arrow */}
              <div className="absolute right-12 top-12 w-10 h-10 border flex items-center justify-center text-lg transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--bg)] group-hover:rotate-45"
                style={{ borderColor: 'var(--border)' }}>
                ↗
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="grid grid-cols-2 gap-30 px-12 py-30 border-t" id="about" style={{ borderColor: 'var(--border)', gap: '7.5rem', paddingTop: '7.5rem', paddingBottom: '7.5rem' }}>
        <div className="sticky top-30" style={{ top: '7.5rem' }}>
          <div className="reveal flex items-center gap-4 font-mono text-[11px] tracking-[0.25em] text-[var(--accent)] uppercase mb-16">
            <span className="w-8 h-px bg-[var(--accent)]" />
            About
          </div>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display), Bebas Neue, sans-serif', fontSize: 'clamp(64px, 8vw, 120px)', lineHeight: 0.9, color: 'white' }}>
            THE<br />DESIGN<br />
            <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.12)', color: 'transparent' }}>MIND</span>
          </h2>
          <p className="reveal font-mono text-[11px] tracking-[0.2em] text-[var(--muted)] uppercase mt-8">
            {site.location}<br />Available globally
          </p>
        </div>

        <div className="pt-4">
          {site.bio.map((p, i) => (
            <p key={i} className={`reveal reveal-delay-${i + 1} text-[17px] leading-[1.75] text-[rgba(240,237,232,0.7)] mb-8`}
              style={{ fontFamily: 'var(--font-body), Syne, sans-serif' }}
              dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #f0ede8; font-weight: 600;">$1</strong>') }} />
          ))}

          <div className="reveal reveal-delay-3 grid grid-cols-2 gap-0.5 mt-12">
            {site.skills.map(skill => (
              <div key={skill} className="flex items-center gap-3 p-5 border transition-colors duration-300 hover:border-[rgba(255,60,0,0.2)]"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                <span className="font-mono text-[12px] tracking-[0.1em] text-[var(--muted)] uppercase">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="px-12 py-30 border-t" id="experience" style={{ borderColor: 'var(--border)', paddingTop: '7.5rem', paddingBottom: '7.5rem' }}>
        <div className="reveal flex items-center gap-4 font-mono text-[11px] tracking-[0.25em] text-[var(--accent)] uppercase mb-16">
          <span className="w-8 h-px bg-[var(--accent)]" />
          Experience
        </div>

        <div className="flex flex-col">
          {site.experience.map((exp, i) => (
            <div key={i} className={`reveal reveal-delay-${Math.min(i, 3)} grid gap-12 py-10 border-b transition-colors duration-300 hover:bg-[rgba(255,255,255,0.01)]`}
              style={{ gridTemplateColumns: '200px 1fr 160px', borderColor: 'var(--border)' }}>
              <div className="font-mono text-[11px] tracking-[0.12em] text-[var(--muted)] uppercase pt-1">{exp.period}</div>
              <div>
                <div className="text-[20px] font-bold tracking-tight text-[var(--text)] mb-1.5" style={{ fontFamily: 'var(--font-body), Syne, sans-serif' }}>{exp.role}</div>
                <div className="font-mono text-[12px] text-[var(--accent)] tracking-[0.1em] uppercase mb-3">{exp.company}</div>
                <div className="text-[14px] text-[rgba(240,237,232,0.5)] leading-relaxed">{exp.description}</div>
              </div>
              <div className="font-mono text-[10px] tracking-[0.15em] text-[var(--muted)] uppercase text-right pt-1.5">{exp.type}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-12 py-40 border-t text-center overflow-hidden" id="contact" style={{ borderColor: 'var(--border)' }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ fontFamily: 'var(--font-display), Bebas Neue, sans-serif', fontSize: 280, color: 'rgba(255,60,0,0.03)', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
          HIRE ME
        </div>

        <div className="reveal flex items-center justify-center gap-4 font-mono text-[11px] tracking-[0.25em] text-[var(--accent)] uppercase mb-8">
          <span className="w-8 h-px bg-[var(--accent)]" />
          Let's work together
          <span className="w-8 h-px bg-[var(--accent)]" />
        </div>

        <h2 className="reveal" style={{ fontFamily: 'var(--font-display), Bebas Neue, sans-serif', fontSize: 'clamp(56px, 10vw, 160px)', lineHeight: 0.9, color: 'white', marginBottom: 48 }}>
          LET'S<br />
          <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)', color: 'transparent' }}>TALK</span>
        </h2>

        <a href={`mailto:${site.email}`}
          className="reveal inline-flex items-center gap-4 font-mono text-[14px] tracking-[0.1em] text-[var(--text)] no-underline border px-10 py-5 transition-all duration-300 hover:text-white hover:border-[var(--accent)] hover:bg-[var(--accent)] relative overflow-hidden"
          style={{ borderColor: 'var(--border)' }}>
          <span>→</span> {site.email}
        </a>

        <div className="reveal flex justify-center gap-8 mt-10">
          {Object.entries(site.social).map(([key, url]) => (
            <a key={key} href={url} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.15em] text-[var(--muted)] uppercase no-underline transition-colors duration-200 hover:text-[var(--accent)]">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="flex justify-between items-center px-12 py-8 border-t" style={{ borderColor: 'var(--border)' }}>
        <p className="font-mono text-[11px] tracking-[0.12em] text-[var(--muted)] uppercase">
          © 2025 <span className="text-[var(--accent)]">{site.name}</span>
        </p>
        <p className="font-mono text-[11px] tracking-[0.12em] text-[var(--muted)] uppercase">{site.location} — Available globally</p>
        <p className="font-mono text-[11px] tracking-[0.12em] text-[var(--muted)] uppercase">Designed with <span className="text-[var(--accent)]">intention</span></p>
      </footer>

      <style jsx global>{`
        @keyframes linePulse { 0%, 100% { opacity: 0.05; transform: scaleY(0.8); } 50% { opacity: 0.3; transform: scaleY(1); } }
        @keyframes pulseRing { 0%, 100% { transform: scale(0.8); opacity: 0.3; } 50% { transform: scale(1.1); opacity: 0.7; } }
        @keyframes scrollPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
    </>
  )
}
