const BADGES = [
  { icon: '🔥', name: '14-Day Streak', earned: true },
  { icon: '📓', name: 'Journal 10x', earned: true },
  { icon: '🌬️', name: 'Breath Master', earned: true },
  { icon: '🫂', name: 'Circle Member', earned: true },
  { icon: '🎙️', name: 'First Voice Bip', earned: true },
  { icon: '💜', name: '7 Days with Rylane', earned: true },
  { icon: '🌙', name: 'Night Owl', earned: false },
  { icon: '⭐', name: '30-Day Streak', earned: false },
];

const HISTORY = [
  { icon: '📓', title: 'Journal entry saved', time: 'Today · 10:42 PM', pts: '+50' },
  { icon: '🌬️', title: 'Breathing session', time: 'Today · 9:15 PM', pts: '+25' },
  { icon: '💜', title: 'Chat with Rylane', time: 'Today · 8:30 PM', pts: '+30' },
  { icon: '🔥', title: '14-day streak bonus', time: 'Yesterday', pts: '+200' },
];

const DAYS = Array.from({ length: 30 }, (_, i) => i + 1);

export default function Points() {
  return (
    <div className="points-screen screen">
      <div className="journal-header">
        <div>
          <div className="journal-title">Your Points</div>
          <div className="journal-subtitle">Keep showing up 💜</div>
        </div>
      </div>

      <div className="points-hero">
        <div className="ph-value">2,340</div>
        <div className="ph-label">Bip Points</div>
        <div className="ph-level">⭐ Level 7 · Rising Star</div>
        <div className="ph-progress"><div className="ph-bar" /></div>
        <div style={{ fontSize: '0.68rem', color: 'var(--muted)', marginTop: '0.5rem' }}>660 pts to Level 8 · Constellation</div>
      </div>

      <div style={{ padding: '0 1.4rem', marginBottom: '0.6rem' }}>
        <div className="section-label">Your Badges</div>
      </div>
      <div className="badges-grid">
        {BADGES.map(b => (
          <div key={b.name} className={`badge-card${b.earned ? ' earned' : ' locked'}`}>
            <div className="bc-icon">{b.icon}</div>
            <div className="bc-name">{b.name}</div>
          </div>
        ))}
      </div>

      <div className="streak-section">
        <div className="section-label">This Month · Streak Calendar</div>
        <div className="streak-grid">
          {DAYS.map(d => (
            <div key={d} className={`sg-day${d === 19 ? ' today' : d < 19 ? ' done' : ''}`}>{d}</div>
          ))}
        </div>
      </div>

      <div className="points-history">
        <div className="section-label" style={{ marginBottom: '0.5rem' }}>Recent Activity</div>
        {HISTORY.map((h, i) => (
          <div key={i} className="ph-item">
            <div className="phi-left">
              <div className="phi-icon">{h.icon}</div>
              <div>
                <div className="phi-title">{h.title}</div>
                <div className="phi-time">{h.time}</div>
              </div>
            </div>
            <div className="phi-pts">{h.pts}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
