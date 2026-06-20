import type { ScreenId } from '../types';

interface Props {
  onLaunch: (screen: ScreenId) => void;
}

const STATS = [
  { num: '$5.6B', lbl: 'Teen Mental Health TAM' },
  { num: '72%', lbl: 'Teens Feel Unheard' },
  { num: '4.2M', lbl: 'Target Users Y1' },
];

const BADGES = ['🎙️ Voice AI', '🌙 AI Companions', '🫂 Bip Circles', '📊 Mood Tracking', '🌿 Parent Window', '🏅 Rewards', '🔒 Teen-Private'];

const FEATS = [
  { icon: '🎙️', label: 'VoiceBip' },
  { icon: '🌙', label: 'Companions' },
  { icon: '📓', label: 'AI Journal' },
  { icon: '🫂', label: 'Circles' },
  { icon: '🌬️', label: 'Calm' },
  { icon: '🏅', label: 'Rewards' },
  { icon: '🔒', label: 'Private' },
];

export default function Landing({ onLaunch }: Props) {
  return (
    <div className="landing">
      <div className="landing-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="landing-inner">
        <div className="live-badge">
          <span className="live-badge-dot" />
          Live Demo
        </div>

        <div className="logo-pulse">💜</div>
        <h1 className="landing-h1">Se'kret <span>Bip</span></h1>
        <p className="landing-sub">
          The teen mental wellness companion that actually gets you — private AI conversations, voice journaling, peer circles, and a parent window that respects your privacy.
        </p>

        <div className="stats-row">
          {STATS.map(s => (
            <div key={s.lbl} className="stat-item">
              <div className="stat-num">{s.num}</div>
              <div className="stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>

        <div className="badge-row">
          {BADGES.map(b => <span key={b} className="badge">{b}</span>)}
        </div>

        <div className="cta-group">
          <button className="cta-btn cta-primary" onClick={() => onLaunch('room')}>✨ Try Teen Demo</button>
          <button className="cta-btn cta-ghost" onClick={() => onLaunch('parent')}>🌿 Parent View</button>
        </div>

        <div className="feature-strip">
          {FEATS.map(f => (
            <div key={f.label} className="feat">
              <div className="icon">{f.icon}</div>
              <div className="label">{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
