'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

interface Project {
  id: string
  title: string
  subtitle: string
  slug: string
  display_order: number
  tags: string[]
  is_new: boolean
  is_published: boolean
  year: string
  role: string
  duration: string
  team: string
  visual: string
  hero_color: string
  summary: string
  outcome: string
  content: string
  cover_image: string
  updated_at: string
}

const EMPTY_PROJECT: Omit<Project, 'id' | 'updated_at'> = {
  title: '', subtitle: '', slug: '', display_order: 99,
  tags: [], is_new: false, is_published: true,
  year: new Date().getFullYear().toString(),
  role: '', duration: '', team: '',
  visual: 'rely', hero_color: '#0f0f1a',
  summary: '', outcome: '', content: '', cover_image: '',
}

type View = 'login' | 'list' | 'edit'

export default function AdminPage() {
  const [view, setView] = useState<View>('login')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [editing, setEditing] = useState<Partial<Project> | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [activeTab, setActiveTab] = useState<'details' | 'content' | 'settings'>('details')
  const [tagInput, setTagInput] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('display_order')
    if (data) setProjects(data)
  }, [])

  useEffect(() => {
    if (view === 'list') fetchProjects()
  }, [view, fetchProjects])

  const handleLogin = () => {
    if (password === 'Rajat@2025') {
      setView('list')
      setLoginError('')
    } else {
      setLoginError('Wrong password')
    }
  }

  const handleNew = () => {
    setEditing({ ...EMPTY_PROJECT })
    setActiveTab('details')
    setView('edit')
  }

  const handleEdit = (p: Project) => {
    setEditing({ ...p })
    setActiveTab('details')
    setView('edit')
  }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    setSaveMsg('')

    const payload = {
      ...editing,
      slug: editing.slug || editing.title!.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      updated_at: new Date().toISOString(),
    }

    let error
    if (editing.id) {
      const res = await supabase.from('projects').update(payload).eq('id', editing.id)
      error = res.error
    } else {
      const res = await supabase.from('projects').insert(payload)
      error = res.error
    }

    setSaving(false)
    if (error) {
      setSaveMsg('❌ Save failed: ' + error.message)
    } else {
      setSaveMsg('✓ Saved successfully')
      setTimeout(() => { setView('list'); setSaveMsg('') }, 1200)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project? This cannot be undone.')) return
    setDeleting(id)
    await supabase.from('projects').delete().eq('id', id)
    setDeleting(null)
    fetchProjects()
  }

  const addTag = () => {
    if (!tagInput.trim() || !editing) return
    setEditing({ ...editing, tags: [...(editing.tags || []), tagInput.trim()] })
    setTagInput('')
  }

  const removeTag = (tag: string) => {
    if (!editing) return
    setEditing({ ...editing, tags: (editing.tags || []).filter(t => t !== tag) })
  }

  // ─── STYLES ────────────────────────────────────────
  const S = {
    page: { minHeight: '100vh', background: '#0a0a0a', color: '#f0ede8', fontFamily: 'Syne, sans-serif' } as React.CSSProperties,
    // Login
    loginWrap: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' } as React.CSSProperties,
    loginBox: { background: '#161616', border: '1px solid rgba(255,255,255,0.07)', padding: '48px', width: 380, display: 'flex', flexDirection: 'column' as const, gap: 24 },
    loginTitle: { fontFamily: 'Bebas Neue, sans-serif', fontSize: 48, color: '#fff', lineHeight: 1 },
    loginSub: { fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.15em', color: '#666', textTransform: 'uppercase' as const },
    input: { background: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#f0ede8', padding: '12px 16px', fontFamily: 'DM Mono, monospace', fontSize: 13, outline: 'none', width: '100%' },
    btnPrimary: { background: '#ff3c00', color: '#fff', border: 'none', padding: '14px 32px', fontFamily: 'DM Mono, monospace', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' as const, cursor: 'pointer', width: '100%' },
    error: { fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#ff3c00', letterSpacing: '0.1em' },
    // Nav
    nav: { background: '#111', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky' as const, top: 0, zIndex: 50 },
    navLogo: { fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, color: '#fff', cursor: 'pointer' },
    navRight: { display: 'flex', gap: 16, alignItems: 'center' },
    btnSecondary: { background: 'transparent', color: '#666', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 20px', fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' as const, cursor: 'pointer' },
    btnAccent: { background: '#ff3c00', color: '#fff', border: 'none', padding: '10px 24px', fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' as const, cursor: 'pointer' },
    // List
    listWrap: { maxWidth: 1100, margin: '0 auto', padding: '48px 40px' },
    listHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 },
    listTitle: { fontFamily: 'Bebas Neue, sans-serif', fontSize: 64, color: '#fff', lineHeight: 1 },
    listSub: { fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.15em', color: '#666', textTransform: 'uppercase' as const, marginTop: 8 },
    projectRow: { background: '#161616', border: '1px solid rgba(255,255,255,0.07)', padding: '28px 32px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center', marginBottom: 2, transition: 'border-color 0.2s', cursor: 'pointer' },
    projectTitle: { fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, color: '#fff', lineHeight: 1, marginBottom: 8 },
    projectMeta: { display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' as const },
    tag: { fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.12em', color: '#666', border: '1px solid rgba(255,255,255,0.07)', padding: '3px 10px', textTransform: 'uppercase' as const },
    tagNew: { fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.12em', color: '#ff3c00', border: '1px solid rgba(255,60,0,0.3)', background: 'rgba(255,60,0,0.05)', padding: '3px 10px', textTransform: 'uppercase' as const },
    tagUnpublished: { fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.12em', color: '#ffcc00', border: '1px solid rgba(255,204,0,0.3)', padding: '3px 10px', textTransform: 'uppercase' as const },
    rowActions: { display: 'flex', gap: 8 },
    btnEdit: { background: 'transparent', color: '#f0ede8', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 20px', fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' as const, cursor: 'pointer' },
    btnDel: { background: 'transparent', color: '#ff3c00', border: '1px solid rgba(255,60,0,0.2)', padding: '8px 16px', fontFamily: 'DM Mono, monospace', fontSize: 11, cursor: 'pointer' },
    // Edit
    editWrap: { maxWidth: 900, margin: '0 auto', padding: '48px 40px' },
    editHeader: { marginBottom: 40 },
    editTitle: { fontFamily: 'Bebas Neue, sans-serif', fontSize: 48, color: '#fff', lineHeight: 1 },
    tabs: { display: 'flex', gap: 2, marginBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.07)' },
    tab: (active: boolean) => ({ background: 'transparent', border: 'none', borderBottom: active ? '2px solid #ff3c00' : '2px solid transparent', color: active ? '#f0ede8' : '#666', padding: '12px 24px', fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' as const, cursor: 'pointer', marginBottom: -1 }),
    formGroup: { marginBottom: 28 },
    label: { display: 'block', fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.15em', color: '#666', textTransform: 'uppercase' as const, marginBottom: 8 },
    fieldInput: { background: '#161616', border: '1px solid rgba(255,255,255,0.08)', color: '#f0ede8', padding: '12px 16px', fontFamily: 'Syne, sans-serif', fontSize: 15, outline: 'none', width: '100%', transition: 'border-color 0.2s' },
    textarea: { background: '#161616', border: '1px solid rgba(255,255,255,0.08)', color: '#f0ede8', padding: '16px', fontFamily: 'DM Mono, monospace', fontSize: 13, outline: 'none', width: '100%', minHeight: 400, resize: 'vertical' as const, lineHeight: 1.7 },
    row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 },
    row3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 },
    toggle: { display: 'flex', alignItems: 'center', gap: 12 },
    saveBar: { position: 'sticky' as const, bottom: 0, background: '#111', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 40 },
    saveMsg: { fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#4ade80', letterSpacing: '0.1em' },
  }

  // ─── LOGIN ─────────────────────────────────────────
  if (view === 'login') return (
    <div style={S.page}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet" />
      <div style={S.loginWrap}>
        <div style={S.loginBox}>
          <div>
            <div style={S.loginTitle}>ADMIN<span style={{ color: '#ff3c00' }}>.</span></div>
            <div style={S.loginSub}>Portfolio CMS</div>
          </div>
          <input style={S.input} type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()} autoFocus />
          {loginError && <div style={S.error}>{loginError}</div>}
          <button style={S.btnPrimary} onClick={handleLogin}>Enter →</button>
        </div>
      </div>
    </div>
  )

  // ─── PROJECT LIST ──────────────────────────────────
  if (view === 'list') return (
    <div style={S.page}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet" />
      <nav style={S.nav}>
        <div style={S.navLogo}>RB<span style={{ color: '#ff3c00' }}>.</span> CMS</div>
        <div style={S.navRight}>
          <a href="/" target="_blank" style={{ ...S.btnSecondary, textDecoration: 'none', display: 'inline-block' }}>View Site ↗</a>
          <button style={S.btnAccent} onClick={handleNew}>+ New Project</button>
        </div>
      </nav>

      <div style={S.listWrap}>
        <div style={S.listHeader}>
          <div>
            <div style={S.listTitle}>PROJECTS</div>
            <div style={S.listSub}>{projects.length} case studies</div>
          </div>
          <button style={S.btnAccent} onClick={handleNew}>+ New Project</button>
        </div>

        {projects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#444', fontFamily: 'DM Mono, monospace', fontSize: 13 }}>
            No projects yet. Click "+ New Project" to add one.
          </div>
        )}

        {projects.map(p => (
          <div key={p.id} style={S.projectRow}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,60,0,0.3)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}>
            <div onClick={() => handleEdit(p)}>
              <div style={S.projectTitle}>{p.title}</div>
              <div style={S.projectMeta}>
                {p.is_new && <span style={S.tagNew}>New</span>}
                {!p.is_published && <span style={S.tagUnpublished}>Draft</span>}
                {p.tags?.slice(0, 3).map(t => <span key={t} style={S.tag}>{t}</span>)}
                <span style={{ ...S.tag, color: '#444' }}>{p.year}</span>
                <span style={{ ...S.tag, color: '#444' }}>#{p.display_order}</span>
              </div>
              {p.summary && (
                <div style={{ marginTop: 10, fontSize: 13, color: 'rgba(240,237,232,0.4)', lineHeight: 1.5, maxWidth: 600 }}>
                  {p.summary.slice(0, 120)}...
                </div>
              )}
            </div>
            <div style={S.rowActions}>
              <button style={S.btnEdit} onClick={() => handleEdit(p)}>Edit</button>
              <button style={S.btnDel} onClick={() => handleDelete(p.id)} disabled={deleting === p.id}>
                {deleting === p.id ? '...' : '✕'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // ─── EDIT FORM ─────────────────────────────────────
  return (
    <div style={S.page}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet" />
      <nav style={S.nav}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button style={S.btnSecondary} onClick={() => setView('list')}>← Back</button>
          <div style={S.navLogo}>
            {editing?.id ? editing.title || 'Edit Project' : 'New Project'}
          </div>
        </div>
        <div style={S.navRight}>
          {saveMsg && <span style={S.saveMsg}>{saveMsg}</span>}
          <button style={S.btnAccent} onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save & Publish →'}
          </button>
        </div>
      </nav>

      <div style={S.editWrap}>
        <div style={S.editHeader}>
          <div style={S.editTitle}>{editing?.id ? 'EDIT PROJECT' : 'NEW PROJECT'}</div>
        </div>

        {/* Tabs */}
        <div style={S.tabs}>
          {(['details', 'content', 'settings'] as const).map(t => (
            <button key={t} style={S.tab(activeTab === t)} onClick={() => setActiveTab(t)}>
              {t === 'details' ? '① Details' : t === 'content' ? '② Content' : '③ Settings'}
            </button>
          ))}
        </div>

        {/* ── TAB: DETAILS ── */}
        {activeTab === 'details' && (
          <div>
            <div style={S.formGroup}>
              <label style={S.label}>Project Title *</label>
              <input style={{ ...S.fieldInput, fontSize: 20, fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
                value={editing?.title || ''} placeholder="e.g. Rely"
                onChange={e => setEditing({ ...editing, title: e.target.value })} />
            </div>

            <div style={S.formGroup}>
              <label style={S.label}>Subtitle / Tagline</label>
              <input style={S.fieldInput} value={editing?.subtitle || ''} placeholder="One line describing the project"
                onChange={e => setEditing({ ...editing, subtitle: e.target.value })} />
            </div>

            <div style={S.formGroup}>
              <label style={S.label}>Summary (shown on homepage card)</label>
              <textarea style={{ ...S.textarea, minHeight: 80, fontFamily: 'Syne, sans-serif' }}
                value={editing?.summary || ''} placeholder="2-3 sentences for the homepage project card"
                onChange={e => setEditing({ ...editing, summary: e.target.value })} />
            </div>

            <div style={S.formGroup}>
              <label style={S.label}>Outcome (shown at top of case study)</label>
              <textarea style={{ ...S.textarea, minHeight: 80, fontFamily: 'Syne, sans-serif' }}
                value={editing?.outcome || ''} placeholder="The key result or design deliverable"
                onChange={e => setEditing({ ...editing, outcome: e.target.value })} />
            </div>

            <div style={{ ...S.row3, marginBottom: 28 }}>
              <div>
                <label style={S.label}>Your Role</label>
                <input style={S.fieldInput} value={editing?.role || ''} placeholder="Lead UX Designer"
                  onChange={e => setEditing({ ...editing, role: e.target.value })} />
              </div>
              <div>
                <label style={S.label}>Year</label>
                <input style={S.fieldInput} value={editing?.year || ''} placeholder="2024"
                  onChange={e => setEditing({ ...editing, year: e.target.value })} />
              </div>
              <div>
                <label style={S.label}>Duration</label>
                <input style={S.fieldInput} value={editing?.duration || ''} placeholder="6 months"
                  onChange={e => setEditing({ ...editing, duration: e.target.value })} />
              </div>
            </div>

            <div style={S.formGroup}>
              <label style={S.label}>Team</label>
              <input style={S.fieldInput} value={editing?.team || ''} placeholder="2 Designers, 3 Engineers, 1 PM"
                onChange={e => setEditing({ ...editing, team: e.target.value })} />
            </div>

            <div style={S.formGroup}>
              <label style={S.label}>Tags</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                {(editing?.tags || []).map(tag => (
                  <span key={tag} style={{ ...S.tag, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
                    onClick={() => removeTag(tag)}>
                    {tag} <span style={{ color: '#ff3c00', fontSize: 10 }}>✕</span>
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input style={{ ...S.fieldInput, flex: 1 }} value={tagInput} placeholder="Add a tag and press Enter"
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addTag()} />
                <button style={{ ...S.btnSecondary, whiteSpace: 'nowrap' }} onClick={addTag}>Add Tag</button>
              </div>
            </div>

            <div style={S.formGroup}>
              <label style={S.label}>Cover Image URL (optional)</label>
              <input style={S.fieldInput} value={editing?.cover_image || ''} placeholder="https://..."
                onChange={e => setEditing({ ...editing, cover_image: e.target.value })} />
              <div style={{ marginTop: 6, fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#444' }}>
                Upload image to supabase.com → Storage → create bucket "images" → upload → copy URL
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: CONTENT ── */}
        {activeTab === 'content' && (
          <div>
            <div style={{ marginBottom: 16, padding: '12px 16px', background: '#161616', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.15em', color: '#666', textTransform: 'uppercase', marginBottom: 6 }}>
                Markdown Guide
              </div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#444', lineHeight: 1.8 }}>
                ## Section Heading &nbsp;|&nbsp; ### Sub Heading &nbsp;|&nbsp; **bold text** &nbsp;|&nbsp; *italic* &nbsp;|&nbsp; - bullet point &nbsp;|&nbsp; &gt; blockquote
              </div>
            </div>
            <textarea style={S.textarea}
              value={editing?.content || ''}
              placeholder={`## The Brief\n\nWrite your case study here using Markdown...\n\n## The Problem\n\nDescribe the problem...\n\n## The Solution\n\nDescribe your approach...\n\n## Outcome\n\nWhat was the result?`}
              onChange={e => setEditing({ ...editing, content: e.target.value })} />
          </div>
        )}

        {/* ── TAB: SETTINGS ── */}
        {activeTab === 'settings' && (
          <div>
            <div style={{ ...S.row2, marginBottom: 28 }}>
              <div>
                <label style={S.label}>URL Slug</label>
                <input style={S.fieldInput} value={editing?.slug || ''} placeholder="auto-generated from title"
                  onChange={e => setEditing({ ...editing, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} />
                <div style={{ marginTop: 6, fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#444' }}>
                  yoursite.com/work/{editing?.slug || 'your-project'}
                </div>
              </div>
              <div>
                <label style={S.label}>Display Order</label>
                <input style={S.fieldInput} type="number" value={editing?.display_order || 1}
                  onChange={e => setEditing({ ...editing, display_order: parseInt(e.target.value) })} />
                <div style={{ marginTop: 6, fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#444' }}>Lower = appears first on homepage</div>
              </div>
            </div>

            <div style={{ ...S.row2, marginBottom: 28 }}>
              <div>
                <label style={S.label}>Visual Style</label>
                <select style={{ ...S.fieldInput, cursor: 'pointer' }}
                  value={editing?.visual || 'rely'}
                  onChange={e => setEditing({ ...editing, visual: e.target.value })}>
                  <option value="rely">Rely (dark blue)</option>
                  <option value="portal">Portal (dark green)</option>
                  <option value="editorji">Editorji (dark red)</option>
                  <option value="lab">Lab (dark grey)</option>
                </select>
              </div>
              <div>
                <label style={S.label}>Hero Color</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input style={{ ...S.fieldInput, flex: 1 }} value={editing?.hero_color || '#0f0f1a'}
                    onChange={e => setEditing({ ...editing, hero_color: e.target.value })} />
                  <input type="color" value={editing?.hero_color || '#0f0f1a'}
                    onChange={e => setEditing({ ...editing, hero_color: e.target.value })}
                    style={{ width: 48, height: 44, border: 'none', background: 'none', cursor: 'pointer', padding: 0 }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <label style={S.toggle}>
                <div style={{ position: 'relative', width: 44, height: 24, background: editing?.is_published ? '#ff3c00' : '#333', borderRadius: 12, cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}
                  onClick={() => setEditing({ ...editing, is_published: !editing?.is_published })}>
                  <div style={{ position: 'absolute', top: 3, left: editing?.is_published ? 23 : 3, width: 18, height: 18, background: '#fff', borderRadius: 9, transition: 'left 0.2s' }} />
                </div>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {editing?.is_published ? 'Published (visible on site)' : 'Draft (hidden from site)'}
                </span>
              </label>

              <label style={S.toggle}>
                <div style={{ position: 'relative', width: 44, height: 24, background: editing?.is_new ? '#ff3c00' : '#333', borderRadius: 12, cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}
                  onClick={() => setEditing({ ...editing, is_new: !editing?.is_new })}>
                  <div style={{ position: 'absolute', top: 3, left: editing?.is_new ? 23 : 3, width: 18, height: 18, background: '#fff', borderRadius: 9, transition: 'left 0.2s' }} />
                </div>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {editing?.is_new ? 'Shows "New" badge' : 'No "New" badge'}
                </span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Sticky save bar */}
      <div style={S.saveBar}>
        <button style={S.btnSecondary} onClick={() => setView('list')}>← Cancel</button>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {saveMsg && <span style={S.saveMsg}>{saveMsg}</span>}
          <button style={S.btnAccent} onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save & Publish →'}
          </button>
        </div>
      </div>
    </div>
  )
}
