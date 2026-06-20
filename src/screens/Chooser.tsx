import { useApp } from '../context/AppContext';

export default function Chooser() {
  const { setScreen } = useApp();
  return (
    <div className="chooser screen active" style={{ paddingTop: '3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '3.5rem 1.5rem 2rem' }}>
      <div className="logo-pulse" style={{ width: 72, height: 72, fontSize: '1.8rem', marginBottom: '1rem' }}>💜</div>
      <div style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.2rem' }}>
        Se'kret <span style={{ background: 'linear-gradient(90deg,#a78bfa,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Bip</span>
      </div>
      <div style={{ fontSize: '0.82rem', color: 'var(--soft)', fontWeight: 300, marginBottom: '0.3rem' }}>Your private companion</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '2.5rem' }}>Who's here right now?</div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        <button className="who-btn who-teen" onClick={() => setScreen('room')}>💜 I'm the teen</button>
        <button className="who-btn who-parent" onClick={() => setScreen('parent')}>🌿 I'm the parent / guardian</button>
      </div>
      <div style={{ marginTop: '2rem', fontSize: '0.72rem', color: '#475569', lineHeight: 1.6 }}>
        🔒 Your stories are yours.<br />We keep them safe — always.
      </div>
      <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
        <div className="trust-card">
          <span style={{ fontSize: '1.1rem' }}>🌙</span>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--soft)' }}>End-to-end encrypted</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>Not even we can read your journals</div>
          </div>
        </div>
        <div className="trust-card">
          <span style={{ fontSize: '1.1rem' }}>🚫</span>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--soft)' }}>No ads. No data selling.</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>Privacy is the product</div>
          </div>
        </div>
      </div>
    </div>
  );
}
