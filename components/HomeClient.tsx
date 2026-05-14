'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { COLOR, FONT_DISPLAY, FONT_BODY, FONT_MONO, VISUAL_BG, STYLES } from '@/lib/theme'

interface WorkMeta {
  id: string; title: string; subtitle: string; slug: string
  display_order: number; tags: string[]; is_new: boolean
  year: string; visual: string; summary: string
}
interface Props { works: WorkMeta[]; site: any }

export default function HomeClient({ works, site }: Props) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)
  const mouse     = useRef({ x: 0, y: 0, rx: 0, ry: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top  = e.clientY + 'px'
      }
    }
    document.addEventListener('mousemove', onMove)

    let raf: number
    const tick = () => {
      mouse.current.rx += (mouse.current.x - mouse.current.rx) * 0.12
      mouse.current.ry += (mouse.current.y - mouse.current.ry) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = mouse.current.rx + 'px'
        ringRef.current.style.top  = mouse.current.ry + 'px'
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const hoverIn  = () => { if (cursorRef.current) { cursorRef.current.style.transform = 'translate(-50%,-50%) scale(2)'; cursorRef.current.style.background = COLOR.accent2 } }
    const hoverOut = () => { if (cursorRef.current) { cursorRef.current.style.transform = 'translate(-50%,-50%) scale(1)'; cursorRef.current.style.background = COLOR.accent } }
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', hoverIn)
      el.addEventListener('mouseleave', hoverOut)
    })

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))

    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); obs.disconnect() }
  }, [])

  return (
    <>
      {/* Cursor */}
      <div ref={cursorRef} style={{ position:'fixed', width:12, height:12, background:COLOR.accent, borderRadius:'50%', pointerEvents:'none', zIndex:9999, transform:'translate(-50%,-50%)', transition:'width 0.3s, height 0.3s, background 0.3s' }} />
      <div ref={ringRef}   style={{ position:'fixed', width:36, height:36, border:'1px solid rgba(255,60,0,0.4)', borderRadius:'50%', pointerEvents:'none', zIndex:9998, transform:'translate(-50%,-50%)' }} />

      {/* NAV */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'24px 48px', background:'linear-gradient(to bottom, rgba(10,10,10,0.97) 0%, transparent 100%)' }}>
        <Link href="/" style={{ fontFamily:FONT_MONO, fontSize:13, letterSpacing:'0.15em', color:COLOR.text, textDecoration:'none' }}>
          RB<span style={{ color:COLOR.accent }}>.</span>
        </Link>
        <div style={{ display:'flex', gap:40 }}>
          {['Work','About','Experience','Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
              style={{ fontFamily:FONT_MONO, fontSize:12, letterSpacing:'0.12em', color:COLOR.muted, textDecoration:'none', textTransform:'uppercase', transition:'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = COLOR.text)}
              onMouseLeave={e => (e.currentTarget.style.color = COLOR.muted)}>
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'0 48px 80px', position:'relative', overflow:'hidden' }}>
        {[{r:'0px',d:'0s',o:0.25},{r:'33.33%',d:'1.5s',o:0.08},{r:'66.66%',d:'3s',o:0.06}].map((l,i) => (
          <div key={i} style={{ position:'absolute', top:0, right:l.r, width:1, height:'100%', background:'linear-gradient(to bottom, transparent 0%, #ff3c00 40%, transparent 100%)', opacity:l.o, animation:`linePulse 4s ease-in-out ${l.d} infinite`, pointerEvents:'none' }} />
        ))}

        <div className="animate-fade-up animate-delay-1" style={{ marginBottom:24 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontFamily:FONT_MONO, fontSize:10, letterSpacing:'0.15em', color:COLOR.green, textTransform:'uppercase', border:'1px solid rgba(74,222,128,0.25)', background:'rgba(74,222,128,0.05)', padding:'6px 14px' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:COLOR.green, display:'inline-block', animation:'blink 2s ease-in-out infinite' }} />
            {site.availability}
          </span>
        </div>

        <h1 className="animate-fade-up animate-delay-2" style={{ fontFamily:FONT_DISPLAY, fontSize:'clamp(96px, 15vw, 220px)', lineHeight:0.88, letterSpacing:'-0.01em', color:COLOR.white }}>
          {site.name.split(' ')[0]}<br />
          <span style={{ WebkitTextStroke:'1px rgba(255,255,255,0.18)', color:'transparent' }}>BHAN</span>
          <span style={{ color:COLOR.accent }}>DA</span>RI
        </h1>

        <div className="animate-fade-up animate-delay-3" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop:48 }}>
          <p style={{ maxWidth:420, fontFamily:FONT_BODY, fontSize:15, lineHeight:1.7, color:'rgba(240,237,232,0.6)' }}>
            <strong style={{ color:COLOR.text }}>{site.role}</strong> with {site.stats[0].num} crafting digital products across fintech, insurance, media & real estate.{' '}
            <strong style={{ color:COLOR.text }}>I turn complex problems into clear, elegant experiences.</strong>
          </p>
          <div style={{ display:'flex', gap:48 }}>
            {site.stats.map((s: any) => (
              <div key={s.label} style={{ textAlign:'right' }}>
                <div style={{ fontFamily:FONT_DISPLAY, fontSize:52, lineHeight:1, color:COLOR.white }}>
                  {s.num.replace('+','')}<span style={{ color:COLOR.accent }}>+</span>
                </div>
                <div style={{ fontFamily:FONT_MONO, fontSize:10, letterSpacing:'0.15em', color:COLOR.muted, textTransform:'uppercase', marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-up animate-delay-4" style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          <span style={{ fontFamily:FONT_MONO, fontSize:10, letterSpacing:'0.2em', color:COLOR.muted, textTransform:'uppercase' }}>Scroll</span>
          <div style={{ width:1, height:48, background:'linear-gradient(to bottom, #ff3c00, transparent)', animation:'scrollPulse 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ borderTop:`1px solid ${COLOR.border}`, borderBottom:`1px solid ${COLOR.border}`, padding:'18px 0', overflow:'hidden' }}>
        <div className="marquee-track">
          {[...site.marquee, ...site.marquee].map((item: string, i: number) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:32, padding:'0 32px', fontFamily:FONT_MONO, fontSize:11, letterSpacing:'0.2em', color:COLOR.muted, textTransform:'uppercase', whiteSpace:'nowrap' }}>
              <span style={{ width:4, height:4, borderRadius:'50%', background:COLOR.accent, flexShrink:0, display:'inline-block' }} />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* WORK */}
      <section style={{ padding:'80px 48px 120px' }} id="work">
        <div className="reveal" style={STYLES.sectionLabel}>
          <span style={STYLES.accentLine} />Selected Work
        </div>
        <div className="reveal" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:80 }}>
          <h2 style={{ fontFamily:FONT_DISPLAY, fontSize:'clamp(56px, 8vw, 120px)', lineHeight:0.9, color:COLOR.white }}>
            CASE<br /><span style={{ WebkitTextStroke:'1px rgba(255,255,255,0.15)', color:'transparent' }}>STUDIES</span>
          </h2>
          <Link href="/work" style={{ fontFamily:FONT_MONO, fontSize:12, letterSpacing:'0.12em', color:COLOR.muted, border:`1px solid ${COLOR.border}`, padding:'12px 24px', textDecoration:'none', textTransform:'uppercase', transition:'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.color=COLOR.accent; e.currentTarget.style.borderColor=COLOR.accent }}
            onMouseLeave={e => { e.currentTarget.style.color=COLOR.muted; e.currentTarget.style.borderColor=COLOR.border }}>
            View All →
          </Link>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
          {works.map((work, i) => (
            <Link key={work.slug} href={`/work/${work.slug}`}
              className={`reveal reveal-delay-${Math.min(i,3)}`}
              style={{ display:'grid', gridTemplateColumns:'1fr 400px', gap:48, alignItems:'center', padding:48, background:COLOR.surface, border:`1px solid ${COLOR.border}`, textDecoration:'none', color:'inherit', position:'relative', overflow:'hidden', transition:'border-color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor='rgba(255,60,0,0.35)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor=COLOR.border)}>
              <div style={{ position:'relative', zIndex:1 }}>
                <div style={{ fontFamily:FONT_MONO, fontSize:11, letterSpacing:'0.2em', color:COLOR.muted, marginBottom:20 }}>
                  {String(i+1).padStart(2,'0')} / {String(works.length).padStart(2,'0')}
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:20 }}>
                  {work.is_new && <span style={STYLES.tagAccent}>New</span>}
                  {work.tags.slice(0,3).map(t => <span key={t} style={STYLES.tag}>{t}</span>)}
                </div>
                <h3 style={{ fontFamily:FONT_DISPLAY, fontSize:'clamp(40px, 4vw, 72px)', lineHeight:1, color:COLOR.white, letterSpacing:'0.02em', marginBottom:16 }}>
                  {work.title}
                </h3>
                <p style={{ fontFamily:FONT_BODY, fontSize:14, lineHeight:1.7, color:'rgba(240,237,232,0.55)', maxWidth:380 }}>
                  {work.summary}
                </p>
              </div>
              <div style={{ height:280, background:VISUAL_BG[work.visual] || COLOR.bg2, border:`1px solid ${COLOR.border}`, position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize:'40px 40px' }} />
                {work.visual === 'rely' && <div style={{ position:'absolute', width:160, height:160, border:'1px solid rgba(255,60,0,0.2)', borderRadius:'50%', animation:'pulseRing 3s ease-in-out infinite' }} />}
                <div style={{ fontFamily:FONT_DISPLAY, fontSize:96, color:'rgba(255,60,0,0.1)', letterSpacing:'0.1em', position:'relative', zIndex:1 }}>
                  {work.title.slice(0,2).toUpperCase()}
                </div>
              </div>
              <div style={{ position:'absolute', right:48, top:48, width:40, height:40, border:`1px solid ${COLOR.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, color:COLOR.text, transition:'all 0.3s' }}>↗</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'7.5rem', padding:'7.5rem 48px', borderTop:`1px solid ${COLOR.border}` }} id="about">
        <div style={{ position:'sticky', top:'7.5rem', alignSelf:'start' }}>
          <div className="reveal" style={STYLES.sectionLabel}><span style={STYLES.accentLine}/>About</div>
          <h2 className="reveal" style={{ fontFamily:FONT_DISPLAY, fontSize:'clamp(64px, 8vw, 120px)', lineHeight:0.9, color:COLOR.white }}>
            THE<br />DESIGN<br /><span style={{ WebkitTextStroke:'1px rgba(255,255,255,0.12)', color:'transparent' }}>MIND</span>
          </h2>
          <p className="reveal" style={{ fontFamily:FONT_MONO, fontSize:11, letterSpacing:'0.2em', color:COLOR.muted, textTransform:'uppercase', marginTop:32 }}>
            {site.location}<br />Available globally
          </p>
        </div>
        <div style={{ paddingTop:4 }}>
          {site.bio.map((p: string, i: number) => (
            <p key={i} className={`reveal reveal-delay-${i+1}`} style={{ fontFamily:FONT_BODY, fontSize:17, lineHeight:1.75, color:'rgba(240,237,232,0.68)', marginBottom:32 }}>{p}</p>
          ))}
          <div className="reveal reveal-delay-3" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, marginTop:48 }}>
            {site.skills.map((skill: string) => (
              <div key={skill} style={{ display:'flex', alignItems:'center', gap:12, padding:'20px 24px', background:COLOR.surface, border:`1px solid ${COLOR.border}`, transition:'border-color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor='rgba(255,60,0,0.2)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor=COLOR.border)}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:COLOR.accent, flexShrink:0, display:'inline-block' }} />
                <span style={{ fontFamily:FONT_MONO, fontSize:12, letterSpacing:'0.1em', color:COLOR.muted, textTransform:'uppercase' }}>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section style={{ padding:'7.5rem 48px', borderTop:`1px solid ${COLOR.border}` }} id="experience">
        <div className="reveal" style={STYLES.sectionLabel}><span style={STYLES.accentLine}/>Experience</div>
        {site.experience.map((exp: any, i: number) => (
          <div key={i} className={`reveal reveal-delay-${Math.min(i,3)}`}
            style={{ display:'grid', gridTemplateColumns:'200px 1fr 160px', gap:48, padding:'40px 0', borderBottom:`1px solid ${COLOR.border}`, transition:'background 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.background='rgba(255,255,255,0.01)')}
            onMouseLeave={e => (e.currentTarget.style.background='transparent')}>
            <div style={{ fontFamily:FONT_MONO, fontSize:11, letterSpacing:'0.12em', color:COLOR.muted, textTransform:'uppercase', paddingTop:4 }}>{exp.period}</div>
            <div>
              <div style={{ fontFamily:FONT_BODY, fontSize:20, fontWeight:700, color:COLOR.text, marginBottom:6 }}>{exp.role}</div>
              <div style={{ fontFamily:FONT_MONO, fontSize:12, color:COLOR.accent, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:12 }}>{exp.company}</div>
              <div style={{ fontFamily:FONT_BODY, fontSize:14, color:'rgba(240,237,232,0.5)', lineHeight:1.6 }}>{exp.description}</div>
            </div>
            <div style={{ fontFamily:FONT_MONO, fontSize:10, letterSpacing:'0.15em', color:COLOR.muted, textTransform:'uppercase', textAlign:'right', paddingTop:6 }}>{exp.type}</div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ padding:'160px 48px', borderTop:`1px solid ${COLOR.border}`, textAlign:'center', position:'relative', overflow:'hidden' }} id="contact">
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', pointerEvents:'none' }}>
          <span style={{ fontFamily:FONT_DISPLAY, fontSize:'min(280px, 20vw)', color:'rgba(255,60,0,0.03)', letterSpacing:'0.1em', whiteSpace:'nowrap' }}>HIRE ME</span>
        </div>
        <div className="reveal" style={{ ...STYLES.sectionLabel, justifyContent:'center' }}><span style={STYLES.accentLine}/>Let's work together<span style={STYLES.accentLine}/></div>
        <h2 className="reveal" style={{ fontFamily:FONT_DISPLAY, fontSize:'clamp(56px, 10vw, 160px)', lineHeight:0.9, color:COLOR.white, marginBottom:48 }}>
          LET'S<br /><span style={{ WebkitTextStroke:'1px rgba(255,255,255,0.15)', color:'transparent' }}>TALK</span>
        </h2>
        <a href={`mailto:${site.email}`} className="reveal"
          style={{ display:'inline-flex', alignItems:'center', gap:16, fontFamily:FONT_MONO, fontSize:14, letterSpacing:'0.1em', color:COLOR.text, textDecoration:'none', border:`1px solid ${COLOR.border}`, padding:'20px 40px', transition:'all 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.background=COLOR.accent; e.currentTarget.style.borderColor=COLOR.accent; e.currentTarget.style.color='#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor=COLOR.border; e.currentTarget.style.color=COLOR.text }}>
          <span>→</span> {site.email}
        </a>
        <div className="reveal" style={{ display:'flex', justifyContent:'center', gap:32, marginTop:40 }}>
          {Object.entries(site.social).map(([key, url]) => (
            <a key={key} href={url as string} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:FONT_MONO, fontSize:11, letterSpacing:'0.15em', color:COLOR.muted, textDecoration:'none', textTransform:'uppercase', transition:'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color=COLOR.accent)}
              onMouseLeave={e => (e.currentTarget.style.color=COLOR.muted)}>
              {key.charAt(0).toUpperCase()+key.slice(1)}
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'32px 48px', borderTop:`1px solid ${COLOR.border}` }}>
        <p style={{ fontFamily:FONT_MONO, fontSize:11, letterSpacing:'0.12em', color:COLOR.muted, textTransform:'uppercase' }}>© 2025 <span style={{ color:COLOR.accent }}>{site.name}</span></p>
        <p style={{ fontFamily:FONT_MONO, fontSize:11, letterSpacing:'0.12em', color:COLOR.muted, textTransform:'uppercase' }}>{site.location} — Available globally</p>
        <p style={{ fontFamily:FONT_MONO, fontSize:11, letterSpacing:'0.12em', color:COLOR.muted, textTransform:'uppercase' }}>Designed with <span style={{ color:COLOR.accent }}>intention</span></p>
      </footer>
    </>
  )
}
