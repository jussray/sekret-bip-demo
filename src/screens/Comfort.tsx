import { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { ComfortQuote } from '../types';

const QUOTES: ComfortQuote[] = [
  { q: "You are not too much. You are not too sensitive. You are human, and you feel things deeply — that's a gift, not a flaw.", src: '💜 Rylane' },
  { q: "Rest is not a reward. It's a right. You don't have to earn it.", src: '🌙 Cloud' },
  { q: "The version of you that's struggling right now is still worthy of love — from others, and from yourself.", src: '💜 Rylane' },
  { q: "You survived every hard day so far. That's a 100% track record.", src: '⚡ Zara' },
  { q: "It's okay to not be okay. But you don't have to be there alone.", src: '🌿 Sage' },
  { q: "Small steps still count as movement. Even standing still when the world is spinning — that's strength.", src: '🌊 Nova' },
];

const REMINDERS = [
  { emoji: '🌙', text: "You don't have to earn rest. You're allowed to just exist." },
  { emoji: '💙', text: "The fact that you're still here and still trying matters more than you know." },
  { emoji: '✨', text: "Bad days are data, not destiny. Tomorrow is still unwritten." },
  { emoji: '🌿', text: "Healing isn't linear. Every small step forward counts." },
];

export default function Comfort() {
  const { setScreen, showToast } = useApp();
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  function next() {
    setFade(false);
    setTimeout(() => { setIdx(i => (i + 1) % QUOTES.length); setFade(true); }, 200);
  }

  const q = QUOTES[idx];

  return (
    <div className="comfort-screen screen">
      <div className="comfort-header">
        <button className="screen-back-btn" onClick={() => setScreen('room')}>‹</button>
        <span style={{ fontWeight: 700 }}>Comfort Space 💫</span>
      </div>

      <div className="comfort-quote-card" style={{ opacity: fade ? 1 : 0 }}>
        <div className="cq-text">"{q.q}"</div>
        <div className="cq-source">{q.src}</div>
      </div>

      <button className="comfort-refresh" onClick={next}>✦ Another one</button>

      <div className="comfort-section">
        <div className="section-label" style={{ marginBottom: '0.7rem' }}>Soft reminders</div>
        {REMINDERS.map((r, i) => (
          <div key={i} className="comfort-msg" onClick={() => showToast('💜 Held that close')}>
            <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{r.emoji}</span>
            <div>{r.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
