// ─── FONTS ────────────────────────────────────────────────────────────────────
// These must exactly match the font names in the Google Fonts URL in layout.tsx
export const FONT_DISPLAY = "'Bebas Neue', Impact, 'Arial Narrow', sans-serif"
export const FONT_BODY    = "'Syne', 'Segoe UI', system-ui, sans-serif"
export const FONT_MONO    = "'DM Mono', 'Courier New', monospace"

// ─── COLORS ───────────────────────────────────────────────────────────────────
export const COLOR = {
  bg:        '#0a0a0a',
  bg2:       '#111111',
  surface:   '#161616',
  border:    'rgba(255,255,255,0.07)',
  text:      '#f0ede8',
  muted:     '#666',
  accent:    '#ff3c00',
  accent2:   '#ffcc00',
  white:     '#ffffff',
  green:     '#4ade80',
}

// ─── PROJECT VISUAL BACKGROUNDS ───────────────────────────────────────────────
export const VISUAL_BG: Record<string, string> = {
  rely:     '#0f0f1a',
  portal:   '#0f1a0f',
  editorji: '#1a0f0f',
  lab:      '#0f0f0f',
}

// ─── TYPOGRAPHY HELPERS ───────────────────────────────────────────────────────
export const T = {
  display: (size: string | number, extra?: React.CSSProperties): React.CSSProperties => ({
    fontFamily: FONT_DISPLAY,
    fontSize: size,
    lineHeight: 1,
    letterSpacing: '0.02em',
    color: COLOR.white,
    ...extra,
  }),
  body: (size: string | number, extra?: React.CSSProperties): React.CSSProperties => ({
    fontFamily: FONT_BODY,
    fontSize: size,
    ...extra,
  }),
  mono: (size: string | number, extra?: React.CSSProperties): React.CSSProperties => ({
    fontFamily: FONT_MONO,
    fontSize: size,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    ...extra,
  }),
}

// ─── COMMON COMPONENT STYLES ──────────────────────────────────────────────────
export const STYLES = {
  sectionLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    fontFamily: FONT_MONO,
    fontSize: 11,
    letterSpacing: '0.25em',
    color: COLOR.accent,
    textTransform: 'uppercase' as const,
    marginBottom: 64,
  } as React.CSSProperties,

  tag: {
    fontFamily: FONT_MONO,
    fontSize: 10,
    letterSpacing: '0.12em',
    color: COLOR.muted,
    border: `1px solid ${COLOR.border}`,
    padding: '3px 10px',
    textTransform: 'uppercase' as const,
  } as React.CSSProperties,

  tagAccent: {
    fontFamily: FONT_MONO,
    fontSize: 10,
    letterSpacing: '0.12em',
    color: COLOR.accent,
    border: '1px solid rgba(255,60,0,0.3)',
    background: 'rgba(255,60,0,0.05)',
    padding: '3px 10px',
    textTransform: 'uppercase' as const,
  } as React.CSSProperties,

  surface: {
    background: '#161616',
    border: '1px solid rgba(255,255,255,0.07)',
  } as React.CSSProperties,

  accentLine: {
    display: 'inline-block',
    width: 32,
    height: 1,
    background: COLOR.accent,
    flexShrink: 0,
  } as React.CSSProperties,
}

// ─── GOOGLE FONTS URL (used in layout.tsx <link> tag) ─────────────────────────
export const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap'
