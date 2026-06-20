import { useApp } from '../context/AppContext';

const WEEK = [
  { d: 'MON', e: '😐' }, { d: 'TUE', e: '🙂' }, { d: 'WED', e: '😢' },
  { d: 'THU', e: '😄' }, { d: 'FRI', e: '🙂' }, { d: 'SAT', e: '😐' }, { d: 'SUN', e: '😊' },
];

const ACTIONS = [
  { icon: '💛', title: 'Send a Bridge', sub: 'Soft check-in message', toast: '💛 Message sent to Aaliyah via Bridge' },
  { icon: '📅', title: 'Mood Calendar', sub: 'Monthly view', toast: '📅 Opening calendar view' },
  { icon: '🚨', title: 'Crisis Resources', sub: 'If you\'re concerned', toast: '🚨 Resources loaded' },
  { icon: '⚙️', title: 'Settings', sub: 'Notifications · alerts', toast: '⚙️ Opening parent settings' },
];

export default function Parent() {
  const { showToast } = useApp();

  return (
    <div className="parent-screen screen">
      <div className="parent-header">
        <div className="parent-greeting">Welcome back,</div>
        <div className="parent-name">Denise 🌿</div>
        <div className="parent-badge">🛡️ Trusted Guardian</div>
      </div>

      <div className="bridge-share">
        <div className="bs-label">💛 New Bridge Share from Aaliyah</div>
        <div className="bs-content">"I've been feeling really stressed about school lately and wanted you to know without it being a big conversation."</div>
        <div className="bs-meta">Shared 2 hours ago · Aaliyah chose to share this</div>
      </div>

      <div className="insight-card">
        <div className="ic-label">Mood This Week</div>
        <div className="mood-week">
          {WEEK.map(w => (
            <div key={w.d} className="mw-day">
              <div className="mw-label">{w.d}</div>
              <div className="mw-e">{w.e}</div>
            </div>
          ))}
        </div>
        <div className="mood-trend">↗ Trending upward · overall improving week</div>
      </div>

      <div className="insight-card">
        <div className="ic-label">Activity Summary</div>
        <div className="ic-content">
          {[
            ['📓 Journal entries', '3 this week'],
            ['🌬️ Calm sessions', '5 this week'],
            ['💜 Companion chats', '12 this week'],
            ['🔥 Current streak', '14 days 🔥'],
          ].map(([lbl, val]) => (
            <div key={lbl as string} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>{lbl}</span>
              <strong style={{ color: lbl === '🔥 Current streak' ? '#fbbf24' : 'var(--text)' }}>{val}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="private-shield">
        <div style={{ fontSize: '1.4rem' }}>🔒</div>
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#86efac' }}>Journal content is private</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: 2 }}>Aaliyah's journal entries, messages, and companion chats are encrypted and visible only to her.</div>
        </div>
      </div>

      <div className="action-row">
        {ACTIONS.map(a => (
          <button key={a.title} className="ar-btn" onClick={() => showToast(a.toast)}>
            <div className="ar-icon">{a.icon}</div>
            <div className="ar-title">{a.title}</div>
            <div className="ar-sub">{a.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
