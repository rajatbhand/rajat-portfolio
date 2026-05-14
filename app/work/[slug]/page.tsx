export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'

const FONT_DISPLAY = "'Bebas Neue', Impact, 'Arial Narrow', sans-serif"
const FONT_BODY    = "'Syne', 'Segoe UI', system-ui, sans-serif"
const FONT_MONO    = "'DM Mono', 'Courier New', monospace"
const COLOR = {
  bg: '#0a0a0a', surface: '#161616', border: 'rgba(255,255,255,0.07)',
  text: '#f0ede8', muted: '#666', accent: '#ff3c00', white: '#ffffff',
}
const VISUAL_BG: Record<string, string> = {
  rely: '#0f0f1a', portal: '#0f1a0f', editorji: '#1a0f0f', lab: '#0f0f0f',
}

async function getProject(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/projects?slug=eq.${slug}&limit=1`
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  const res = await fetch(url, {
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    console.error('Supabase fetch failed:', res.status, await res.text())
    return null
  }

  const data = await res.json()
  console.log('Supabase response:', JSON.stringify(data))
  return data?.[0] || null
}

function renderMarkdown(content: string) {
  if (!content) return ''
  return content
    .split('\n\n')
    .map(block => {
      block = block.trim()
      if (!block) return ''
      if (block.startsWith('## ')) return `<h2>${block.slice(3)}</h2>`
      if (block.startsWith('### ')) return `<h3>${block.slice(4)}</h3>`
      if (block.startsWith('> ')) return `<blockquote><p>${block.slice(2)}</p></blockquote>`
      if (block.match(/^[-*] /m)) {
        const items = block.split('\n').filter(l => l.match(/^[-*] /)).map(l => `<li>${l.slice(2)}</li>`).join('')
        return `<ul>${items}</ul>`
      }
      const formatted = block
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
      return `<p>${formatted}</p>`
    })
    .join('')
}

// ✅ HERE IS THE FIX: We tell Next.js that params is a Promise
export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // ✅ HERE IS THE FIX: We wait for the slug to be ready before moving on
  const { slug } = await params
  
  const work = await getProject(slug)

  if (!work) {
    console.error('No project found for slug:', slug)
    notFound()
  }

  return (
    <div style={{ background: COLOR.bg, color: COLOR.text, minHeight: '100vh', fontFamily: FONT_BODY }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet" />

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', background: 'rgba(10,10,10,0.97)', borderBottom: `1px solid ${COLOR.border}` }}>
        <Link href="/" style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: COLOR.white, textDecoration: 'none' }}>
          RB<span style={{ color: COLOR.accent }}>.</span>
        </Link>
        <Link href="/" style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.12em', color: COLOR.muted, textDecoration: 'none', textTransform: 'uppercase', border: `1px solid ${COLOR.border}`, padding: '8px 20px' }}>
          ← All Work
        </Link>
      </nav>

      {/* Hero */}
      <div style={{ padding: '64px 48px', borderBottom: `1px solid ${COLOR.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.25em', color: COLOR.accent, textTransform: 'uppercase', marginBottom: 32 }}>
          <span style={{ display: 'inline-block', width: 32, height: 1, background: COLOR.accent }} />
          Case Study — {work.year}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end' }}>
          <div>
            {work.is_new && (
              <span style={{ display: 'inline-block', fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: COLOR.accent, border: '1px solid rgba(255,60,0,0.3)', background: 'rgba(255,60,0,0.05)', padding: '3px 12px', marginBottom: 24 }}>New</span>
            )}
            <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(72px, 10vw, 160px)', lineHeight: 0.88, color: COLOR.white, letterSpacing: '0.02em' }}>
              {work.title}
            </h1>
            <p style={{ marginTop: 24, fontSize: 18, lineHeight: 1.6, color: 'rgba(240,237,232,0.6)' }}>{work.subtitle}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {[['Role', work.role], ['Year', work.year], ['Duration', work.duration], ['Team', work.team]].map(([label, value]) => (
              <div key={label} style={{ background: COLOR.surface, border: `1px solid ${COLOR.border}`, padding: '20px 24px' }}>
                <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.15em', color: COLOR.muted, textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: COLOR.text }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 48 }}>
          {work.tags?.map((tag: string) => (
            <span key={tag} style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: COLOR.muted, border: `1px solid ${COLOR.border}`, padding: '4px 12px' }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Visual */}
      <div style={{ height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: VISUAL_BG[work.visual] || '#111' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(100px, 18vw, 200px)', color: 'rgba(255,60,0,0.08)', letterSpacing: '0.1em', position: 'relative', zIndex: 1 }}>{work.title}</div>
      </div>

      {/* Outcome */}
      {work.outcome && (
        <div style={{ padding: '40px 48px', borderBottom: `1px solid ${COLOR.border}`, background: 'rgba(255,60,0,0.03)' }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.2em', color: COLOR.accent, textTransform: 'uppercase', marginBottom: 12 }}>Outcome</div>
          <p style={{ fontFamily: FONT_BODY, fontSize: 18, lineHeight: 1.6, color: COLOR.text, maxWidth: 720, fontWeight: 600 }}>{work.outcome}</p>
        </div>
      )}

      {/* Content */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 48px' }}>
        <style>{`
          .prose h2 { font-family: 'Bebas Neue', Impact, sans-serif; font-size: clamp(32px,4vw,56px); color:#fff; margin:64px 0 24px; letter-spacing:0.02em; line-height:1; }
          .prose h3 { font-family: 'Syne', sans-serif; font-size:18px; font-weight:700; color:#f0ede8; margin:40px 0 12px; }
          .prose p { font-size:16px; line-height:1.8; color:rgba(240,237,232,0.7); margin-bottom:20px; }
          .prose strong { color:#f0ede8; font-weight:600; }
          .prose em { font-style:italic; }
          .prose blockquote { border-left:2px solid #ff3c00; padding:16px 24px; margin:32px 0; background:rgba(255,60,0,0.04); }
          .prose blockquote p { color:#f0ede8; font-style:italic; margin:0; }
          .prose ul { list-style:none; margin:16px 0 24px; padding:0; }
          .prose li { font-size:16px; line-height:1.7; color:rgba(240,237,232,0.65); padding-left:20px; position:relative; margin-bottom:8px; }
          .prose li::before { content:'—'; position:absolute; left:0; color:#ff3c00; }
        `}</style>
        <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(work.content || '') }} />
      </div>

      {/* Footer */}
      <div style={{ padding: '48px', borderTop: `1px solid ${COLOR.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.12em', color: COLOR.muted, textDecoration: 'none', textTransform: 'uppercase' }}>← All Work</Link>
        <Link href="/#contact" style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.12em', color: COLOR.accent, textDecoration: 'none', textTransform: 'uppercase', border: '1px solid rgba(255,60,0,0.3)', padding: '12px 24px' }}>Start a project →</Link>
      </div>
    </div>
  )
}
