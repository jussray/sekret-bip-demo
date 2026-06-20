import { useApp } from '../context/AppContext';
import type { ScreenId } from '../types';

const COMPANIONS = [
  { avatar: '🌙', name: 'Rylane', vibe: 'calm · night' },
  { avatar: '☁️', name: 'Cloud', vibe: 'dreamy · soft' },
  { avatar: '⚡', name: 'Zara', vibe: 'bold · hype' },
  { avatar: '🌿', name: 'Sage', vibe: 'wise · grounded' },
  { avatar: '🌊', name: 'Nova', vibe: 'chill · deep' },
];

const MOODS = [
  { emoji: '😄', label: 'Amazing', toast: 'Glad you\'re feeling amazing! 🌟' },
  { emoji: '🙂', label: 'Good', toast: 'That\'s great to hear 🙂' },
  { emoji: '😐', label: 'Meh', toast: 'Meh days happen. Rylane is here 💜' },
  { emoji: '😢', label: 'Sad', toast: 'Sending you a soft hug 💙' },
  { emoji: '😭', label: 'Rough', toast: 'You\'re not alone in this 💜' },
];

const QUICK: { icon: string; title: string; sub: string; screen: ScreenId }[] = [
  { icon: '📓', title: 'Journal', sub: '3 entries this week', screen: 'journal' },
  { icon: '🌬️', title: 'Calm', sub: 'Breathing · grounding', screen: 'calm' },
  { icon: '🫂', title: 'Circles', sub: '247 online now', screen: 'circles' },
  { icon: '🏅', title: 'Points', sub: '2,340 · Level 7', screen: 'points' },
];

export default function Room() {
  const { setScreen, showToast, selectedMood, setSelectedMood, selectedComp, setSelectedComp } = useApp();

  return (
    <div className="room screen" style={{ paddingBottom: '1rem' }}>
      <div className="room-stars" />
      <div className="room-glow" />

      <div className="room-content">
        <div className="room-header">
          <div>
            <div className="room-greeting">Good evening,</div>
            <div className="room-name">Aaliyah ✨</div>
          </div>
          <div className="streak-pill">🔥 14 days</div>
        </div>

        <div className="mood-bar">
          <div className="mood-bar-label">How are you feeling right now?</div>
          <div className="mood-emojis">
            {MOODS.map(m => (
              <button
                key={m.label}
                className={`mood-e${selectedMood === m.label ? ' picked' : ''}`}
                title={m.label}
                onClick={() => { setSelectedMood(m.label); showToast(m.toast); }}
              >{m.emoji}</button>
            ))}
          </div>
        </div>

        <div className="section-label" style={{ padding: '0 1.4rem', marginBottom: '0.5rem' }}>Your Companions</div>
        <div className="companion-row">
          {COMPANIONS.map((c, i) => (
            <div
              key={c.name}
              className={`comp-card${selectedComp === i ? ' selected' : ''}`}
              onClick={() => { setSelectedComp(i); setScreen('chat'); }}
            >
              <div className="comp-avatar-wrap">{c.avatar}</div>
              <div className="comp-name">{c.name}</div>
              <div className="comp-vibe">{c.vibe}</div>
            </div>
          ))}
        </div>

        <div className="quick-actions">
          {QUICK.map(q => (
            <div key={q.title} className="qa-card" onClick={() => setScreen(q.screen)}>
              <div className="qa-icon">{q.icon}</div>
              <div className="qa-title">{q.title}</div>
              <div className="qa-sub">{q.sub}</div>
            </div>
          ))}
        </div>

        <div
          className="sekret-banner"
          style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.15),rgba(236,72,153,0.1))', border: '1px solid rgba(124,58,237,0.25)' }}
          onClick={() => setScreen('chat')}
        >
          <div style={{ fontSize: '1.8rem' }}>💜</div>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--purple-light)' }}>Talk to Rylane</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: 2 }}>Your companion is here · tap to chat</div>
          </div>
          <div style={{ marginLeft: 'auto', color: 'var(--purple-light)' }}>›</div>
        </div>

        <div
          className="sekret-banner"
          style={{ background: 'linear-gradient(135deg,rgba(20,184,166,0.12),rgba(20,184,166,0.06))', border: '1px solid rgba(20,184,166,0.2)' }}
          onClick={() => setScreen('voice')}
        >
          <div style={{ fontSize: '1.8rem' }}>🎙️</div>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#5eead4' }}>Voice Bip</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: 2 }}>Record a voice note with Rylane</div>
          </div>
          <div style={{ marginLeft: 'auto', color: '#5eead4' }}>›</div>
        </div>
      </div>
    </div>
  );
}
