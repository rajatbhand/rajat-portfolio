'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface WorkMeta {
  id: string
  title: string
  slug: string
  tags: string[]
  is_new: boolean
  summary: string
  visual: string
}

interface Props {
  works: WorkMeta[]
  site: any
}

export default function HomeClient({ works, site }: Props) {
  useEffect(() => {
    // Scroll reveal
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #ffffff; color: #0a0a0a; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        .nav-logo { font-size: 28px; font-weight: 800; color: #fff; text-decoration: none; letter-spacing: -0.04em; display: flex; align-items: center; gap: 0; line-height: 1; }
        .nav-logo .reg { font-size: 22px; font-weight: 800; color: rgba(255,255,255,0.9); position: relative; top: 0px; margin-right: 0px; letter-spacing: -0.02em; }
        .nav-link { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.8); text-decoration: none; padding: 8px 16px; border-radius: 8px; letter-spacing: 0.04em; text-transform: uppercase; transition: background 0.15s, color 0.15s; }
        .nav-link:hover { background: rgba(255,255,255,0.12); color: #fff; }
        .hero { min-height: 100vh; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px 60px 60px; background: linear-gradient(180deg, #2196f3 0%, #42a5f5 25%, #64b5f6 50%, #90caf9 70%, #bbdefb 85%, #e3f2fd 95%, #f5f9ff 100%); }
        .cloud-layer { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .cloud { position: absolute; background: rgba(255,255,255,0.85); border-radius: 50%; }
        .c1 { width:500px;height:160px; top:18%;left:-60px; filter:blur(2px); }
        .c1::before { content:''; position:absolute; width:260px;height:200px; background:inherit; border-radius:50%; top:-80px;left:60px; }
        .c1::after { content:''; position:absolute; width:200px;height:160px; background:inherit; border-radius:50%; top:-60px;left:180px; }
        .c2 { width:420px;height:130px; top:22%;right:-40px; filter:blur(2px); }
        .c2::before { content:''; position:absolute; width:220px;height:180px; background:inherit; border-radius:50%; top:-70px;left:80px; }
        .c2::after { content:''; position:absolute; width:160px;height:140px; background:inherit; border-radius:50%; top:-50px;right:40px; }
        .c3 { width:340px;height:100px; top:62%;left:5%; filter:blur(3px); opacity:0.65; }
        .c3::before { content:''; position:absolute; width:180px;height:150px; background:inherit; border-radius:50%; top:-60px;left:50px; }
        .c4 { width:280px;height:90px; top:65%;right:8%; filter:blur(2px); opacity:0.7; }
        .c4::before { content:''; position:absolute; width:150px;height:130px; background:inherit; border-radius:50%; top:-55px;left:40px; }
        .hero-content { position: relative; z-index: 10; text-align: center; max-width: 680px; margin-bottom: 56px; }
        .hero-h1 { font-size: clamp(44px, 6vw, 76px); font-weight: 800; line-height: 1.06; letter-spacing: -0.03em; color: #ffffff; text-shadow: 0 2px 20px rgba(0,0,0,0.12); margin-bottom: 20px; }
        .hero-sub { font-size: 16px; font-weight: 400; line-height: 1.65; color: rgba(255,255,255,0.82); margin-bottom: 36px; text-shadow: 0 1px 8px rgba(0,0,0,0.1); }
        .hero-btns { display: flex; gap: 12px; align-items: center; justify-content: center; }
        .btn-outline-white { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.9); background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.3); backdrop-filter: blur(8px); padding: 12px 24px; border-radius: 100px; text-decoration: none; letter-spacing: 0.04em; text-transform: uppercase; transition: background 0.2s; }
        .btn-outline-white:hover { background: rgba(255,255,255,0.2); }
        .btn-yellow { font-size: 13px; font-weight: 700; color: #0a0a0a; background: #d4f53c; padding: 12px 24px; border-radius: 100px; text-decoration: none; letter-spacing: 0.04em; text-transform: uppercase; display: flex; align-items: center; gap: 8px; transition: opacity 0.2s; box-shadow: 0 4px 20px rgba(212,245,60,0.35); }
        .btn-yellow:hover { opacity: 0.9; }
        .btn-yellow-arrow { width: 22px; height: 22px; border-radius: 50%; background: #0a0a0a; display: flex; align-items: center; justify-content: center; }
        .carousel-wrap { position: relative; z-index: 10; width: 100vw; overflow: hidden; margin-left: -60px; padding: 8px 0 24px; }
        .carousel-track { display: flex; gap: 16px; animation: carouselScroll 28s linear infinite; width: max-content; padding: 8px 60px; }
        .carousel-track:hover { animation-play-state: paused; }
        @keyframes carouselScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .c-card { flex-shrink: 0; width: 260px; height: 180px; background: rgba(255,255,255,0.92); backdrop-filter: blur(20px); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.7); box-shadow: 0 16px 48px rgba(0,0,0,0.18); cursor: pointer; transition: transform 0.3s, box-shadow 0.3s; }
        .c-card:hover { transform: translateY(-6px); box-shadow: 0 24px 64px rgba(0,0,0,0.22); }
        .c-card-inner { width: 100%; height: 100%; padding: 16px; display: flex; flex-direction: column; }
        .c-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .c-card-name { font-size: 11px; font-weight: 700; color: #0a0a0a; letter-spacing: 0.02em; }
        .c-dot { width: 8px; height: 8px; border-radius: 50%; }
        .c-card-big { font-size: 30px; font-weight: 800; color: #0a0a0a; letter-spacing: -0.03em; line-height: 1; }
        .c-card-label { font-size: 10px; color: #888; margin-top: 3px; font-weight: 500; }
        .c-bar-bg { height: 3px; background: #e5e5e5; border-radius: 2px; margin: 10px 0; }
        .c-bar-fg { height: 100%; border-radius: 2px; background: #d4f53c; }
        .c-rows { display: flex; flex-direction: column; gap: 4px; }
        .c-row { display: flex; justify-content: space-between; align-items: center; background: #f5f5f7; border-radius: 6px; padding: 4px 8px; }
        .c-row-l { font-size: 9px; color: #555; font-weight: 500; }
        .c-row-r { font-size: 9px; color: #0a0a0a; font-weight: 700; }
        .c-card.dark .c-card-inner { background: #0a0a0a; }
        .c-card.dark .c-card-name { color: rgba(255,255,255,0.5); }
        .c-card.dark .c-card-big { color: #fff; }
        .c-card.dark .c-card-label { color: rgba(255,255,255,0.35); }
        .c-card.dark .c-bar-bg { background: rgba(255,255,255,0.1); }
        .c-card.dark .c-row { background: rgba(255,255,255,0.06); }
        .c-card.dark .c-row-l { color: rgba(255,255,255,0.4); }
        .c-card.dark .c-row-r { color: #d4f53c; }
        #work { background: #f5f5f7; padding: 100px 60px; }
        .work-heading { text-align: center; margin-bottom: 56px; }
        .work-eyebrow { font-size: 12px; font-weight: 600; color: #888; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 14px; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .work-eyebrow::before { content: '•'; color: #0a0a0a; }
        .work-h2 { font-size: clamp(34px, 4.5vw, 56px); font-weight: 800; letter-spacing: -0.035em; color: #0a0a0a; line-height: 1.06; margin-bottom: 14px; }
        .work-sub { font-size: 15px; color: #888; line-height: 1.7; max-width: 460px; margin: 0 auto; font-weight: 400; }
        .work-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; max-width: 1100px; margin: 0 auto; }
        .work-card { background: #ffffff; border: 1px solid #e8e8e8; border-radius: 20px; overflow: hidden; text-decoration: none; color: inherit; display: flex; flex-direction: column; transition: box-shadow 0.3s, transform 0.3s; cursor: pointer; }
        .work-card:hover { box-shadow: 0 20px 60px rgba(0,0,0,0.1); transform: translateY(-4px); }
        .work-card-visual { min-height: 260px; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 32px; background: #ffffff; }
        .wc-mock { background: #111; border-radius: 14px; box-shadow: 0 16px 48px rgba(0,0,0,0.2); padding: 16px; width: 200px; position: relative; z-index: 2; }
        .wc-mock-back { background: #1a1a1a; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); padding: 14px; width: 170px; position: absolute; z-index: 1; }
        .wc-mock-title { font-size: 9px; font-weight: 700; color: rgba(255,255,255,0.4); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 8px; }
        .wc-mock-big { font-size: 28px; font-weight: 800; color: #fff; letter-spacing: -0.03em; line-height: 1; }
        .wc-mock-label { font-size: 9px; color: rgba(255,255,255,0.35); margin-top: 3px; }
        .wc-mock-bar-bg { height: 3px; background: rgba(255,255,255,0.1); border-radius: 2px; margin: 10px 0; }
        .wc-mock-bar-fg { height: 100%; border-radius: 2px; background: #d4f53c; }
        .wc-mock-row { display: flex; justify-content: space-between; padding: 4px 8px; background: rgba(255,255,255,0.05); border-radius: 6px; margin-top: 4px; }
        .wc-mock-row-l { font-size: 8px; color: rgba(255,255,255,0.4); }
        .wc-mock-row-r { font-size: 8px; color: #d4f53c; font-weight: 700; }
        .work-card-info { padding: 22px 26px 26px; border-top: 1px solid #f0f0f0; }
        .work-card-title { font-size: 19px; font-weight: 700; color: #0a0a0a; letter-spacing: -0.02em; margin-bottom: 8px; line-height: 1.2; }
        .work-card-desc { font-size: 14px; color: #888; line-height: 1.65; font-weight: 400; }
        footer { background: #fff; padding: 40px 60px 60px; }
        .footer-card { max-width: 1100px; margin: 0 auto; background: #0e0e0e; border-radius: 24px; padding: 60px 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; position: relative; overflow: hidden; min-height: 380px; }
        .cta-blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.2; }
        .cta-blob-1 { width:400px;height:400px; background:#2196f3; top:-150px;left:-100px; }
        .cta-blob-2 { width:300px;height:300px; background:#d4f53c; bottom:-100px;right:-80px; }
        .footer-cta { display: flex; flex-direction: column; justify-content: space-between; position: relative; z-index: 1; }
        .footer-eyebrow { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.35); letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 16px; }
        .footer-h2 { font-size: clamp(28px, 3.5vw, 44px); font-weight: 800; color: #fff; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 16px; }
        .footer-sub { font-size: 15px; color: rgba(255,255,255,0.35); line-height: 1.7; font-weight: 400; margin-bottom: 32px; max-width: 360px; }
        .btn-cta-yellow { font-size: 13px; font-weight: 700; color: #0a0a0a; background: #d4f53c; padding: 13px 28px; border-radius: 100px; text-decoration: none; letter-spacing: 0.04em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 8px; transition: opacity 0.2s; width: fit-content; }
        .btn-cta-yellow:hover { opacity: 0.88; }
        .footer-right-col { display: flex; flex-direction: column; justify-content: space-between; padding-top: 4px; position: relative; z-index: 1; }
        .footer-col-title { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.35); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 16px; }
        .footer-link { display: block; font-size: 16px; font-weight: 400; color: rgba(255,255,255,0.55); text-decoration: none; margin-bottom: 12px; transition: color 0.2s; }
        .footer-link:hover { color: #fff; }
        .footer-socials-row { display: flex; gap: 10px; align-items: center; }
        .footer-social-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.4); text-decoration: none; font-size: 16px; transition: background 0.2s, color 0.2s, border-color 0.2s; }
        .footer-social-icon:hover { background: rgba(255,255,255,0.14); color: #fff; border-color: rgba(255,255,255,0.22); }
        .reveal { opacity:0; transform:translateY(20px); transition:opacity 0.65s ease,transform 0.65s ease; }
        .reveal.in { opacity:1; transform:translateY(0); }
        .d1{transition-delay:.08s}.d2{transition-delay:.16s}.d3{transition-delay:.24s}.d4{transition-delay:.32s}
      `}</style>

      {/* NAV */}
      <nav style={{ position:'absolute', top:0, left:0, right:0, zIndex:100, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 60px', height:72 }}>
        <Link href="/" className="nav-logo">
          <span className="reg">®</span>B
        </Link>
        <div style={{ display:'flex', alignItems:'center', gap:4 }}>
          <a href="#work" className="nav-link">WORK</a>
          <Link href="/about" className="nav-link">ABOUT</Link>
          <a href="https://docs.google.com/document/d/15LtMI0jpmZnQsqXwM5i7eeDp8LIsGu5tfiwo7n97w8Y/edit?usp=sharing" target="_blank" className="nav-link">RESUME</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="cloud-layer">
          <div className="cloud c1"></div>
          <div className="cloud c2"></div>
          <div className="cloud c3"></div>
          <div className="cloud c4"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-h1">Senior UX Designer<br/>based in Bangalore</h1>
          <p className="hero-sub">11+ years designing digital products across fintech,<br/>insurance, media and real estate.</p>
          <div className="hero-btns">
            <a href="#work" className="btn-outline-white">VIEW WORK</a>
            <a href="mailto:rajat.rajat.bhandari.1@gmail.com" className="btn-yellow">
              GET IN TOUCH
              <div className="btn-yellow-arrow">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="#d4f53c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </a>
          </div>
        </div>

        {/* CAROUSEL */}
        <div className="carousel-wrap">
          <div className="carousel-track">
            {/* Set 1 */}
            <div className="c-card"><div className="c-card-inner"><div className="c-card-header"><div className="c-card-name">Rely Platform</div><div className="c-dot" style={{background:'#22c55e'}}></div></div><div className="c-card-big">5</div><div className="c-card-label">User personas</div><div className="c-bar-bg"><div className="c-bar-fg" style={{width:'85%'}}></div></div><div className="c-rows"><div className="c-row"><span className="c-row-l">Research</span><span className="c-row-r">Done ✓</span></div><div className="c-row"><span className="c-row-l">IA & Flows</span><span className="c-row-r">Done ✓</span></div></div></div></div>
            <div className="c-card dark"><div className="c-card-inner"><div className="c-card-header"><div className="c-card-name">Partner Portal</div><div className="c-dot" style={{background:'#2196f3'}}></div></div><div className="c-card-big">7</div><div className="c-card-label">Modules shipped</div><div className="c-bar-bg"><div className="c-bar-fg" style={{width:'100%',background:'#2196f3'}}></div></div><div className="c-rows"><div className="c-row"><span className="c-row-l">Dashboard</span><span className="c-row-r">Live</span></div><div className="c-row"><span className="c-row-l">Claims</span><span className="c-row-r">Live</span></div></div></div></div>
            <div className="c-card"><div className="c-card-inner"><div className="c-card-header"><div className="c-card-name">Editorji</div><div className="c-dot" style={{background:'#ef4444'}}></div></div><div className="c-card-big">2M+</div><div className="c-card-label">Monthly users</div><div className="c-bar-bg"><div className="c-bar-fg" style={{width:'72%',background:'#ef4444'}}></div></div><div className="c-rows"><div className="c-row"><span className="c-row-l">iOS App</span><span className="c-row-r">✓</span></div><div className="c-row"><span className="c-row-l">PWA</span><span className="c-row-r">✓</span></div></div></div></div>
            <div className="c-card dark"><div className="c-card-inner"><div className="c-card-header"><div className="c-card-name">Experience</div><div className="c-dot" style={{background:'#d4f53c'}}></div></div><div className="c-card-big">11+</div><div className="c-card-label">Years designing</div><div className="c-bar-bg"><div className="c-bar-fg" style={{width:'90%'}}></div></div><div className="c-rows"><div className="c-row"><span className="c-row-l">Industries</span><span className="c-row-r">8+</span></div><div className="c-row"><span className="c-row-l">Projects</span><span className="c-row-r">20+</span></div></div></div></div>
            <div className="c-card"><div className="c-card-inner"><div className="c-card-header"><div className="c-card-name">AI Projects</div><div className="c-dot" style={{background:'#a855f7'}}></div></div><div className="c-card-big">∞</div><div className="c-card-label">Experiments</div><div className="c-bar-bg"><div className="c-bar-fg" style={{width:'60%',background:'#a855f7'}}></div></div><div className="c-rows"><div className="c-row"><span className="c-row-l">Finance App</span><span className="c-row-r">Live</span></div><div className="c-row"><span className="c-row-l">Portfolio</span><span className="c-row-r">Live</span></div></div></div></div>
            {/* Set 2 — duplicate for infinite loop */}
            <div className="c-card"><div className="c-card-inner"><div className="c-card-header"><div className="c-card-name">Rely Platform</div><div className="c-dot" style={{background:'#22c55e'}}></div></div><div className="c-card-big">5</div><div className="c-card-label">User personas</div><div className="c-bar-bg"><div className="c-bar-fg" style={{width:'85%'}}></div></div><div className="c-rows"><div className="c-row"><span className="c-row-l">Research</span><span className="c-row-r">Done ✓</span></div></div></div></div>
            <div className="c-card dark"><div className="c-card-inner"><div className="c-card-header"><div className="c-card-name">Partner Portal</div><div className="c-dot" style={{background:'#2196f3'}}></div></div><div className="c-card-big">7</div><div className="c-card-label">Modules shipped</div><div className="c-bar-bg"><div className="c-bar-fg" style={{width:'100%',background:'#2196f3'}}></div></div><div className="c-rows"><div className="c-row"><span className="c-row-l">Dashboard</span><span className="c-row-r">Live</span></div></div></div></div>
            <div className="c-card"><div className="c-card-inner"><div className="c-card-header"><div className="c-card-name">Editorji</div><div className="c-dot" style={{background:'#ef4444'}}></div></div><div className="c-card-big">2M+</div><div className="c-card-label">Monthly users</div><div className="c-bar-bg"><div className="c-bar-fg" style={{width:'72%',background:'#ef4444'}}></div></div><div className="c-rows"><div className="c-row"><span className="c-row-l">iOS App</span><span className="c-row-r">✓</span></div></div></div></div>
            <div className="c-card dark"><div className="c-card-inner"><div className="c-card-header"><div className="c-card-name">Experience</div><div className="c-dot" style={{background:'#d4f53c'}}></div></div><div className="c-card-big">11+</div><div className="c-card-label">Years designing</div><div className="c-bar-bg"><div className="c-bar-fg" style={{width:'90%'}}></div></div><div className="c-rows"><div className="c-row"><span className="c-row-l">Industries</span><span className="c-row-r">8+</span></div></div></div></div>
            <div className="c-card"><div className="c-card-inner"><div className="c-card-header"><div className="c-card-name">AI Projects</div><div className="c-dot" style={{background:'#a855f7'}}></div></div><div className="c-card-big">∞</div><div className="c-card-label">Experiments</div><div className="c-bar-bg"><div className="c-bar-fg" style={{width:'60%',background:'#a855f7'}}></div></div><div className="c-rows"><div className="c-row"><span className="c-row-l">Finance App</span><span className="c-row-r">Live</span></div></div></div></div>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work">
        <div className="work-heading reveal">
          <div className="work-eyebrow">CASE STUDIES</div>
          <h2 className="work-h2">Selected work</h2>
          <p className="work-sub">End-to-end UX design across research, systems and interfaces.</p>
        </div>
        <div className="work-grid">

          <Link className="work-card reveal d1" href="/work/rely">
            <div className="work-card-visual">
              <div style={{position:'absolute', left:'calc(50% - 140px)', top:30, transform:'rotate(6deg)', zIndex:1}} className="wc-mock-back">
                <div className="wc-mock-title">IA Map</div>
                <div style={{fontSize:11, color:'rgba(255,255,255,0.5)', lineHeight:1.5}}>Information<br/>Architecture</div>
              </div>
              <div className="wc-mock">
                <div className="wc-mock-title">Rely Platform</div>
                <div className="wc-mock-big">5</div>
                <div className="wc-mock-label">User personas</div>
                <div className="wc-mock-bar-bg"><div className="wc-mock-bar-fg" style={{width:'85%'}}></div></div>
                <div className="wc-mock-row"><span className="wc-mock-row-l">Research</span><span className="wc-mock-row-r">Done ✓</span></div>
                <div className="wc-mock-row"><span className="wc-mock-row-l">IA & Flows</span><span className="wc-mock-row-r">Done ✓</span></div>
              </div>
            </div>
            <div className="work-card-info">
              <div className="work-card-title">Rely — Rental Platform</div>
              <div className="work-card-desc">A one-stop solution for renters and landlords to search, connect and apply for long-term rentals in the Bay Area.</div>
            </div>
          </Link>

          <Link className="work-card reveal d2" href="/work/partner-portal">
            <div className="work-card-visual">
              <div style={{position:'absolute', left:'calc(50% - 170px)', top:25, transform:'rotate(-5deg)', zIndex:1}} className="wc-mock-back">
                <div className="wc-mock-title">Commission</div>
                <div className="wc-mock-big" style={{fontSize:22}}>₹42k</div>
                <div className="wc-mock-label">This month</div>
              </div>
              <div className="wc-mock">
                <div className="wc-mock-title">Partner Portal</div>
                <div className="wc-mock-big">7</div>
                <div className="wc-mock-label">Modules shipped</div>
                <div className="wc-mock-bar-bg"><div className="wc-mock-bar-fg" style={{width:'100%', background:'#22c55e'}}></div></div>
                <div className="wc-mock-row"><span className="wc-mock-row-l">Dashboard</span><span className="wc-mock-row-r">✓</span></div>
                <div className="wc-mock-row"><span className="wc-mock-row-l">Claims</span><span className="wc-mock-row-r">✓</span></div>
              </div>
            </div>
            <div className="work-card-info">
              <div className="work-card-title">Partner Portal</div>
              <div className="work-card-desc">A unified web platform for insurance agents and bank branches managing proposals, renewals, claims and commissions.</div>
            </div>
          </Link>

          <Link className="work-card reveal d3" href="/work/editorji">
            <div className="work-card-visual">
              <div style={{position:'absolute', right:'calc(50% - 150px)', top:30, transform:'rotate(4deg)', zIndex:1}} className="wc-mock-back">
                <div className="wc-mock-title">PWA</div>
                <div style={{fontSize:11, color:'rgba(255,255,255,0.5)', lineHeight:1.5}}>Mobile First<br/>Experience</div>
              </div>
              <div className="wc-mock">
                <div className="wc-mock-title">Editorji</div>
                <div className="wc-mock-big">2M+</div>
                <div className="wc-mock-label">Monthly users</div>
                <div className="wc-mock-bar-bg"><div className="wc-mock-bar-fg" style={{width:'72%', background:'#ef4444'}}></div></div>
                <div className="wc-mock-row"><span className="wc-mock-row-l">iOS App</span><span className="wc-mock-row-r">✓</span></div>
                <div className="wc-mock-row"><span className="wc-mock-row-l">PWA</span><span className="wc-mock-row-r">✓</span></div>
              </div>
            </div>
            <div className="work-card-info">
              <div className="work-card-title">Editorji</div>
              <div className="work-card-desc">A news aggregation platform with personalised feeds, available as a mobile app and progressive web app.</div>
            </div>
          </Link>

          <Link className="work-card reveal d4" href="/ai-projects">
            <div className="work-card-visual">
              <div style={{position:'absolute', left:'calc(50% - 160px)', top:25, transform:'rotate(-4deg)', zIndex:1}} className="wc-mock-back">
                <div className="wc-mock-title">Vibe Coding</div>
                <div style={{fontSize:11, color:'rgba(255,255,255,0.5)', lineHeight:1.5}}>Built with AI</div>
              </div>
              <div className="wc-mock">
                <div className="wc-mock-title">AI Projects</div>
                <div className="wc-mock-big">∞</div>
                <div className="wc-mock-label">Experiments</div>
                <div className="wc-mock-bar-bg"><div className="wc-mock-bar-fg" style={{width:'60%', background:'#a855f7'}}></div></div>
                <div className="wc-mock-row"><span className="wc-mock-row-l">Finance App</span><span className="wc-mock-row-r">Live</span></div>
                <div className="wc-mock-row"><span className="wc-mock-row-l">Portfolio CMS</span><span className="wc-mock-row-r">Live</span></div>
              </div>
            </div>
            <div className="work-card-info">
              <div className="work-card-title">AI Projects</div>
              <div className="work-card-desc">Side projects built with AI tools — dashboards, apps and experiments at the intersection of design and code.</div>
            </div>
          </Link>

        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact">
        <div className="footer-card">
          <div className="cta-blob cta-blob-1"></div>
          <div className="cta-blob cta-blob-2"></div>
          <div className="footer-cta">
            <div className="footer-eyebrow">GET IN TOUCH</div>
            <h2 className="footer-h2">Let&apos;s build<br/>something great.</h2>
            <p className="footer-sub">Open to full-time roles, freelance projects, and interesting conversations.</p>
            <a href="mailto:rajat.rajat.bhandari.1@gmail.com" className="btn-cta-yellow">
              GET IN TOUCH
              <div className="btn-yellow-arrow">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="#d4f53c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </a>
          </div>
          <div className="footer-right-col">
            <div className="footer-pages">
              <div className="footer-col-title">PAGES</div>
              <Link href="/" className="footer-link">Home</Link>
              <Link href="/about" className="footer-link">About</Link>
              <a href="https://docs.google.com/document/d/15LtMI0jpmZnQsqXwM5i7eeDp8LIsGu5tfiwo7n97w8Y/edit?usp=sharing" target="_blank" className="footer-link">Resume</a>
              <a href="#work" className="footer-link">Work</a>
            </div>
            <div className="footer-socials-row">
              <a href="https://www.linkedin.com/in/rajatbhand/" target="_blank" className="footer-social-icon" title="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="https://www.behance.net/bhandrajat" target="_blank" className="footer-social-icon" title="Behance"><i className="fa-brands fa-behance"></i></a>
              <a href="https://dribbble.com/BhandRajat" target="_blank" className="footer-social-icon" title="Dribbble"><i className="fa-brands fa-dribbble"></i></a>
              <a href="https://www.instagram.com/bhandrajat.film" target="_blank" className="footer-social-icon" title="Instagram"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
