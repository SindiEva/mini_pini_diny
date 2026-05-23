// ============================================================
// Shared UI primitives for "Спортивный марафон"
// Icons, cards, buttons, progress, placeholders.
// All components scoped to window.SMUI to avoid collisions.
// ============================================================

const { useState, useEffect, useRef } = React;

// ─── Icons (soft, 1.6 stroke, rounded) ──────────────────────────────────
const Icon = ({ name, size = 22, color = 'currentColor', filled = false }) => {
  const svgProps = {
    width: size, height: size,
    style: { display: 'inline-block', flexShrink: 0 },
    viewBox: '0 0 24 24',
  };
  const stroke = { stroke: color, strokeWidth: 1.6, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const fillP = filled ? { fill: color, ...stroke, fillOpacity: 0.18 } : stroke;
  switch (name) {
    case 'home':
      return <svg {...svgProps}><path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-8.5Z" {...fillP}/></svg>;
    case 'dumbbell':
      return <svg {...svgProps}><path d="M5 8v8M3 10v4M19 8v8M21 10v4M8 12h8" {...stroke}/><rect x="6" y="7" width="3" height="10" rx="1" {...fillP}/><rect x="15" y="7" width="3" height="10" rx="1" {...fillP}/></svg>;
    case 'leaf':
      return <svg {...svgProps}><path d="M20 4c0 8-5 13-12 14C7 11 12 6 20 4Z" {...fillP}/><path d="M14 10 7 18" {...stroke}/></svg>;
    case 'chat':
      return <svg {...svgProps}><path d="M4 12a8 8 0 1 1 3.4 6.55L4 20l1.45-3.4A7.97 7.97 0 0 1 4 12Z" {...fillP}/><circle cx="9" cy="12" r="1" fill={color}/><circle cx="12" cy="12" r="1" fill={color}/><circle cx="15" cy="12" r="1" fill={color}/></svg>;
    case 'user':
      return <svg {...svgProps}><circle cx="12" cy="8" r="4" {...fillP}/><path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6" {...stroke}/></svg>;
    case 'flame':
      return <svg {...svgProps}><path d="M12 3c1 3 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 1-5 2 1 3 0 3-4Z" {...fillP}/></svg>;
    case 'sparkle':
      return <svg {...svgProps}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M18.4 5.6l-4.2 4.2M9.8 14.2l-4.2 4.2" {...stroke}/></svg>;
    case 'heart':
      return <svg {...svgProps}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" {...fillP}/></svg>;
    case 'play':
      return <svg {...svgProps}><path d="M7 5v14l12-7L7 5Z" fill={color} stroke={color} strokeWidth="1.6" strokeLinejoin="round"/></svg>;
    case 'clock':
      return <svg {...svgProps}><circle cx="12" cy="12" r="9" {...stroke}/><path d="M12 7v5l3 2" {...stroke}/></svg>;
    case 'chevron':
      return <svg {...svgProps}><path d="m9 6 6 6-6 6" {...stroke}/></svg>;
    case 'chevronLeft':
      return <svg {...svgProps}><path d="m15 6-6 6 6 6" {...stroke}/></svg>;
    case 'chevronDown':
      return <svg {...svgProps}><path d="m6 9 6 6 6-6" {...stroke}/></svg>;
    case 'search':
      return <svg {...svgProps}><circle cx="11" cy="11" r="7" {...stroke}/><path d="m20 20-3.5-3.5" {...stroke}/></svg>;
    case 'filter':
      return <svg {...svgProps}><path d="M4 6h16M7 12h10M10 18h4" {...stroke}/></svg>;
    case 'pdf':
      return <svg {...svgProps}><path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" {...fillP}/><path d="M14 3v5h5" {...stroke}/></svg>;
    case 'check':
      return <svg {...svgProps}><path d="m5 12.5 4.5 4.5L19 7.5" {...stroke}/></svg>;
    case 'plus':
      return <svg {...svgProps}><path d="M12 5v14M5 12h14" {...stroke}/></svg>;
    case 'bell':
      return <svg {...svgProps}><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2H4.5L6 16Z" {...fillP}/><path d="M10 20a2 2 0 0 0 4 0" {...stroke}/></svg>;
    case 'settings':
      return <svg {...svgProps}><circle cx="12" cy="12" r="3" {...stroke}/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9 1.7 1.7 0 0 0 4.3 7.2l-.1-.1A2 2 0 1 1 7 4.3l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" {...stroke}/></svg>;
    case 'crown':
      return <svg {...svgProps}><path d="m3 8 4 4 5-7 5 7 4-4-2 11H5L3 8Z" {...fillP}/></svg>;
    case 'arrowRight':
      return <svg {...svgProps}><path d="M5 12h14m-5-5 5 5-5 5" {...stroke}/></svg>;
    case 'send':
      return <svg {...svgProps}><path d="M5 12 21 4l-8 16-2-7-6-1Z" {...fillP}/></svg>;
    case 'cup':
      return <svg {...svgProps}><path d="M5 4h12v6a6 6 0 0 1-12 0V4Z" {...fillP}/><path d="M17 6h2a2 2 0 0 1 0 4h-2M9 16v3M14 16v3M7 20h9" {...stroke}/></svg>;
    case 'apple':
      return <svg {...svgProps}><path d="M12 7c-3 0-5 2-5 6s2 8 5 8 5-4 5-8-2-6-5-6Z" {...fillP}/><path d="M12 7c0-2 1-3 3-3M12 7c-1-1-1-3 0-4" {...stroke}/></svg>;
    case 'moon':
      return <svg {...svgProps}><path d="M20 14a8 8 0 1 1-10-10 7 7 0 0 0 10 10Z" {...fillP}/></svg>;
    case 'sun':
      return <svg {...svgProps}><circle cx="12" cy="12" r="4" {...fillP}/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4" {...stroke}/></svg>;
    case 'book':
      return <svg {...svgProps}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" {...fillP}/><path d="M4 19a2 2 0 0 1 2-2h13" {...stroke}/></svg>;
    case 'lock':
      return <svg {...svgProps}><rect x="5" y="11" width="14" height="9" rx="2" {...fillP}/><path d="M8 11V8a4 4 0 1 1 8 0v3" {...stroke}/></svg>;
    case 'badge':
      return <svg {...svgProps}><circle cx="12" cy="10" r="6" {...fillP}/><path d="m8 14-2 7 6-3 6 3-2-7" {...stroke}/></svg>;
    case 'water':
      return <svg {...svgProps}><path d="M12 3c4 6 6 9 6 12a6 6 0 1 1-12 0c0-3 2-6 6-12Z" {...fillP}/></svg>;
    case 'mic':
      return <svg {...svgProps}><rect x="9" y="3" width="6" height="12" rx="3" {...fillP}/><path d="M5 11a7 7 0 0 0 14 0M12 18v3" {...stroke}/></svg>;
    case 'image':
      return <svg {...svgProps}><rect x="3" y="4" width="18" height="16" rx="3" {...fillP}/><circle cx="9" cy="10" r="1.5" fill={color}/><path d="m21 17-5-5-9 9" {...stroke}/></svg>;
    default:
      return null;
  }
};

// ─── Pill button ────────────────────────────────────────────────────────
const Pill = ({ children, variant = 'primary', size = 'md', onClick, style = {}, fullWidth, leading, trailing }) => {
  const sz = size === 'sm' ? { h: 36, px: 16, fs: 14 } : size === 'lg' ? { h: 56, px: 28, fs: 16 } : { h: 46, px: 22, fs: 15 };
  const variants = {
    primary: { bg: 'var(--ink)', col: '#FFFCF8', sh: '0 6px 18px rgba(61,51,42,0.18)' },
    accent:  { bg: 'var(--blush)', col: '#3D332A', sh: '0 8px 20px rgba(232,184,156,0.4)' },
    sage:    { bg: 'var(--sage)', col: '#3D332A', sh: '0 8px 20px rgba(191,208,176,0.4)' },
    soft:    { bg: 'var(--surface)', col: 'var(--ink)', sh: '0 1px 2px rgba(67,52,36,0.05)', br: '1px solid var(--line)' },
    ghost:   { bg: 'transparent', col: 'var(--ink-2)', sh: 'none' },
    tonal:   { bg: 'var(--blush-tint)', col: 'var(--ink)', sh: 'none' },
  };
  const v = variants[variant];
  return (
    <button onClick={onClick} className="tap" style={{
      height: sz.h, padding: `0 ${sz.px}px`, borderRadius: 999,
      background: v.bg, color: v.col, boxShadow: v.sh, border: v.br || '0',
      fontSize: sz.fs, fontWeight: 600, letterSpacing: '-0.005em',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      width: fullWidth ? '100%' : 'auto',
      ...style,
    }}>
      {leading}
      {children}
      {trailing}
    </button>
  );
};

// ─── Card ───────────────────────────────────────────────────────────────
const Card = ({ children, style = {}, soft = false, onClick, padding = 18, radius = 24 }) => (
  <div onClick={onClick} className={onClick ? 'tap' : ''} style={{
    background: soft ? 'var(--surface-2)' : 'var(--surface)',
    borderRadius: radius,
    padding,
    boxShadow: 'var(--shadow-1)',
    border: '1px solid rgba(239, 230, 215, 0.6)',
    ...style,
  }}>{children}</div>
);

// ─── Ring progress (SVG) ────────────────────────────────────────────────
const RingProgress = ({ value = 0.6, size = 88, stroke = 8, color = 'var(--blush)', track = 'var(--blush-tint)', children }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ display: 'block', transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value)}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.2,.7,.2,1)' }}/>
      </svg>
      {children && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>{children}</div>}
    </div>
  );
};

// ─── Bar progress ───────────────────────────────────────────────────────
const Bar = ({ value = 0.5, color = 'var(--blush)', track = 'var(--blush-tint)', height = 6 }) => (
  <div style={{ height, background: track, borderRadius: 999, overflow: 'hidden' }}>
    <div style={{ width: `${value * 100}%`, height: '100%', background: color, borderRadius: 999, transition: 'width .8s cubic-bezier(.2,.7,.2,1)' }}/>
  </div>
);

// ─── Image placeholder ──────────────────────────────────────────────────
const ImgPH = ({ tone = 'blush', label, h = 120, radius = 18, style = {}, children, dim = false }) => {
  const tones = {
    blush:    { a: '#F5C8A8', b: '#EAD0BC' },
    sage:     { a: '#C9DABA', b: '#D8DEC8' },
    lavender: { a: '#CFC6DE', b: '#DAD3E5' },
    rose:     { a: '#E2B4B4', b: '#E7C5CA' },
    butter:   { a: '#EFD8A1', b: '#E6D4B5' },
    cream:    { a: '#EDDFC8', b: '#E5D5BC' },
  };
  const t = tones[tone] || tones.blush;
  return (
    <div style={{
      position: 'relative',
      height: h, borderRadius: radius, overflow: 'hidden',
      background: `linear-gradient(135deg, ${t.a} 0%, ${t.b} 100%)`,
      ...style,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(120% 80% at 20% 10%, rgba(255,255,255,0.55), rgba(255,255,255,0) 60%)',
        mixBlendMode: 'screen',
      }}/>
      {label && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end',
          padding: 12, color: 'rgba(61,51,42,0.55)',
          fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 10, letterSpacing: 0.5, textTransform: 'uppercase',
        }}>{label}</div>
      )}
      {dim && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(61,51,42,0.45))' }}/>}
      {children && <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</div>}
    </div>
  );
};

// ─── Avatar (initials, soft gradient) ───────────────────────────────────
const Avatar = ({ name = 'А', size = 36, tone = 'blush', ring = false }) => {
  const tones = {
    blush:    'linear-gradient(135deg, #F4D9C8, #E8B89C)',
    sage:     'linear-gradient(135deg, #DBE5D0, #BFD0B0)',
    lavender: 'linear-gradient(135deg, #DDD6E8, #C8BFD8)',
    rose:     'linear-gradient(135deg, #F5D7D7, #D89C9C)',
    butter:   'linear-gradient(135deg, #FAEBC0, #F0DCA8)',
    cream:    'linear-gradient(135deg, #F5EAD7, #E8D5B0)',
  };
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: tones[tone] || tones.blush,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#5B4A3B', fontWeight: 600, fontSize: size * 0.38,
      boxShadow: ring ? '0 0 0 3px var(--bg), 0 0 0 4.5px var(--blush)' : 'none',
      flexShrink: 0,
    }}>{name.slice(0, 1).toUpperCase()}</div>
  );
};

// ─── Chip ───────────────────────────────────────────────────────────────
const Chip = ({ children, active = false, onClick, leading }) => (
  <button onClick={onClick} className="tap" style={{
    height: 36, padding: '0 14px', borderRadius: 999,
    background: active ? 'var(--ink)' : 'var(--surface)',
    color: active ? '#FFFCF8' : 'var(--ink-2)',
    border: active ? '1px solid var(--ink)' : '1px solid var(--line)',
    fontSize: 13, fontWeight: 600, letterSpacing: '-0.005em',
    display: 'inline-flex', alignItems: 'center', gap: 6,
    whiteSpace: 'nowrap', flexShrink: 0,
  }}>{leading}{children}</button>
);

// ─── Section header (label + see all) ───────────────────────────────────
const SectionHeader = ({ title, hint, action }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 20px', marginTop: 28, marginBottom: 12 }}>
    <div>
      <div className="text-serif" style={{ fontSize: 22, color: 'var(--ink)', lineHeight: 1.1 }}>{title}</div>
      {hint && <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>{hint}</div>}
    </div>
    {action && <button style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 600 }}>{action}</button>}
  </div>
);

// ─── Loading dots ───────────────────────────────────────────────────────
const LoadingDots = ({ color = 'var(--blush)' }) => (
  <div style={{ display: 'inline-flex', gap: 6 }}>
    {[0,1,2].map(i => (
      <span key={i} style={{
        width: 8, height: 8, borderRadius: '50%', background: color,
        animation: `float 1.2s ease-in-out ${i * 0.15}s infinite`,
      }}/>
    ))}
  </div>
);

// ─── Toast ──────────────────────────────────────────────────────────────
const Toast = ({ children, show }) => (
  <div style={{
    position: 'absolute', left: '50%', top: 80,
    transform: `translate(-50%, ${show ? 0 : -20}px)`,
    opacity: show ? 1 : 0, transition: 'all .35s cubic-bezier(.2,.7,.2,1)',
    background: 'rgba(61,51,42,0.92)', backdropFilter: 'blur(8px)',
    color: '#FFFCF8', padding: '12px 18px', borderRadius: 999,
    fontSize: 13, fontWeight: 600, zIndex: 100, pointerEvents: 'none',
    boxShadow: '0 12px 30px rgba(61,51,42,0.25)',
    whiteSpace: 'nowrap',
  }}>{children}</div>
);

// ─── Sheet (bottom modal) ───────────────────────────────────────────────
const Sheet = ({ open, onClose, children, height = '70%' }) => (
  <>
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, background: 'rgba(61,51,42,0.35)',
      opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity .35s ease', zIndex: 80,
    }}/>
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      height,
      background: 'var(--bg)',
      borderTopLeftRadius: 32, borderTopRightRadius: 32,
      transform: `translateY(${open ? 0 : 100}%)`,
      transition: 'transform .42s cubic-bezier(.2,.7,.2,1)',
      zIndex: 81,
      boxShadow: '0 -20px 60px rgba(61,51,42,0.18)',
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 6px' }}>
        <div style={{ width: 38, height: 4, borderRadius: 2, background: 'var(--line-strong)' }}/>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>{children}</div>
    </div>
  </>
);

Object.assign(window, {
  Icon, Pill, Card, RingProgress, Bar, ImgPH, Avatar, Chip, SectionHeader, LoadingDots, Toast, Sheet,
});
