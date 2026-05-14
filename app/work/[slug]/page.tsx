import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getProject(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/projects?slug=eq.${slug}&is_published=eq.true&limit=1`,
    {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
      cache: 'no-store'
    }
  )
  const data = await res.json()
  return data?.[0] || null
}

function renderMarkdown(content: string) {
  return content
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hbupl])/gm, '')
    .replace(/<p><\/p>/g, '')
}

const VISUAL_COLORS: Record<string, string> = {
  rely: '#0f0f1a', portal: '#0f1a0f', editorji: '#1a0f0f', lab: '#0f0f0f',
}

export default async function WorkPage({ params }: { params: { slug: string } }) {
  const work = await getProject(params.slug)
  if (!work) notFound()

  return (
    <div style={{ background: '#0a0a0a', color: '#f0ede8', minHeight: '100vh', fontFamily: 'var(--font-body), Syne, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet" />

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 48px', background: 'linear-gradient(to bottom, rgba(10,10,10,0.98) 0%, transparent 100%)' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-display), Bebas Neue, sans-serif', fontSize: 24, color: '#fff', textDecoration: 'none' }}>
          RB<span style={{ color: '#ff3c00' }}>.</span>
        </Link>
        <Link href="/#work" style={{ fontFamily: 'var(--font-mono), DM Mono, monospace', fontSize: 11, letterSpacing: '0.12em', color: '#666', textDecoration: 'none', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 20px', transition: 'color 0.2s' }}>
          ← All Work
        </Link>
      </nav>

      {/* Hero */}
      <div style={{ padding: '48px 48px 64px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontFamily: 'var(--font-mono), DM Mono, monospace', fontSize: 11, letterSpacing: '0.25em', color: '#ff3c00', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <span style={{ display: 'inline-block', width: 32, height: 1, background: '#ff3c00' }} />
          Case Study — {work.year}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'end' }}>
          <div>
            {work.is_new && (
              <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono), DM Mono, monospace', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ff3c00', border: '1px solid rgba(255,60,0,0.3)', background: 'rgba(255,60,0,0.05)', padding: '3px 10px', marginBottom: 24 }}>New</span>
            )}
            <h1 style={{ fontFamily: 'var(--font-display), Bebas Neue, sans-serif', fontSize: 'clamp(72px, 10vw, 160px)', lineHeight: 0.88, color: '#fff', letterSpacing: '0.02em' }}>
              {work.title}
            </h1>
            <p style={{ marginTop: 24, fontSize: 18, lineHeight: 1.6, color: 'rgba(240,237,232,0.6)' }}>{work.subtitle}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {[['Role', work.role], ['Year', work.year], ['Duration', work.duration], ['Team', work.team]].map(([label, value]) => (
              <div key={label} style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.07)', padding: '20px 24px' }}>
                <div style={{ fontFamily: 'var(--font-mono), DM Mono, monospace', fontSize: 10, letterSpacing: '0.15em', color: '#666', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
                <div style={{ fontSize: 14 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 48 }}>
          {work.tags?.map((tag: string) => (
            <span key={tag} style={{ fontFamily: 'var(--font-mono), DM Mono, monospace', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#666', border: '1px solid rgba(255,255,255,0.07)', padding: '4px 12px' }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Visual */}
      <div style={{ height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: VISUAL_COLORS[work.visual] || '#111' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        {work.cover_image
          ? <img src={work.cover_image} alt={work.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
          : <div style={{ fontFamily: 'var(--font-display), Bebas Neue, sans-serif', fontSize: 'clamp(120px, 20vw, 200px)', color: 'rgba(255,60,0,0.08)', letterSpacing: '0.1em', position: 'relative', zIndex: 1 }}>{work.title}</div>
        }
      </div>

      {/* Outcome banner */}
      <div style={{ padding: '40px 48px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,60,0,0.03)' }}>
        <div style={{ fontFamily: 'var(--font-mono), DM Mono, monospace', fontSize: 10, letterSpacing: '0.2em', color: '#ff3c00', textTransform: 'uppercase', marginBottom: 12 }}>Outcome</div>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: '#f0ede8', maxWidth: '720px', fontWeight: 600 }}>{work.outcome}</p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 48px' }}>
        <div className="prose-dark"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(work.content || '') }} />
      </div>

      {/* Footer nav */}
      <div style={{ padding: '48px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/#work" style={{ fontFamily: 'var(--font-mono), DM Mono, monospace', fontSize: 12, letterSpacing: '0.12em', color: '#666', textDecoration: 'none', textTransform: 'uppercase' }}>← All Work</Link>
        <Link href="/#contact" style={{ fontFamily: 'var(--font-mono), DM Mono, monospace', fontSize: 12, letterSpacing: '0.12em', color: '#ff3c00', textDecoration: 'none', textTransform: 'uppercase', border: '1px solid rgba(255,60,0,0.3)', padding: '12px 24px' }}>Start a project →</Link>
      </div>

      <style>{`
        .prose-dark h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(32px, 4vw, 56px); color: #fff; margin: 64px 0 24px; letter-spacing: 0.02em; line-height: 1; }
        .prose-dark h3 { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; color: #f0ede8; margin: 40px 0 12px; }
        .prose-dark p { font-size: 16px; line-height: 1.8; color: rgba(240,237,232,0.7); margin-bottom: 20px; }
        .prose-dark strong { color: #f0ede8; font-weight: 600; }
        .prose-dark em { font-style: italic; color: rgba(240,237,232,0.8); }
        .prose-dark blockquote { border-left: 2px solid #ff3c00; padding: 16px 24px; margin: 32px 0; background: rgba(255,60,0,0.04); }
        .prose-dark blockquote p { color: #f0ede8; font-style: italic; margin: 0; }
        .prose-dark ul { list-style: none; margin: 16px 0 24px; padding: 0; }
        .prose-dark li { font-size: 16px; line-height: 1.7; color: rgba(240,237,232,0.65); padding-left: 20px; position: relative; margin-bottom: 8px; }
        .prose-dark li::before { content: '—'; position: absolute; left: 0; color: #ff3c00; font-size: 12px; }
      `}</style>
    </div>
  )
}
