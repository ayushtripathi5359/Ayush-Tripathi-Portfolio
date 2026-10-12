const TEXT = 'REACT · NEXT.JS · REACT NATIVE · TYPESCRIPT · NODE.JS · MONGODB · FASTAPI · '

export default function FooterMarquee() {
  return (
    <div style={{ background: '#080808', overflow: 'hidden', padding: '1.5rem 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ display: 'flex', width: 'max-content', animation: 'marqueeScroll 22s linear infinite' }}>
        {[TEXT, TEXT, TEXT].map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(48px, 8vw, 80px)',
              color: 'rgba(255,255,255,0.05)',
              whiteSpace: 'nowrap',
              letterSpacing: '0.05em',
              paddingRight: '0.1em',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
