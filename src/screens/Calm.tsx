import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

type Tab = 'breathe' | 'ground' | 'body';
type Phase = 'idle' | 'inhale' | 'hold-in' | 'exhale' | 'hold-out';

const PHASES: { phase: Phase; label: string; duration: number; sub: string }[] = [
  { phase: 'inhale', label: 'INHALE', duration: 4, sub: 'breathe in slowly' },
  { phase: 'hold-in', label: 'HOLD', duration: 4, sub: 'hold gently' },
  { phase: 'exhale', label: 'EXHALE', duration: 4, sub: 'let it all go' },
  { phase: 'hold-out', label: 'HOLD', duration: 4, sub: 'rest before next breath' },
];

const GROUND = [
  { n: 5, text: 'things you can', bold: 'SEE' },
  { n: 4, text: 'things you can', bold: 'TOUCH' },
  { n: 3, text: 'things you can', bold: 'HEAR' },
  { n: 2, text: 'things you can', bold: 'SMELL' },
  { n: 1, text: 'thing you can', bold: 'TASTE' },
];

const BODY = [
  'Unclench your jaw. Let it drop slightly.',
  'Roll your shoulders back. Breathe into them.',
  'Unclench your hands. Feel the release.',
  'Soften your belly. You don\'t have to hold it in.',
  'Feel your feet on the ground. You\'re here. 💜',
];

export default function Calm() {
  const { setScreen, showToast } = useApp();
  const [tab, setTab] = useState<Tab>('breathe');
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [sec, setSec] = useState(0);
  const [round, setRound] = useState(0);
  const [running, setRunning] = useState(false);
  const [label, setLabel] = useState('Tap to Begin');
  const [sublabel, setSublabel] = useState('4 counts in · hold · 4 out · hold');
  const [counter, setCounter] = useState<string>('4');
  const [orbPhase, setOrbPhase] = useState<'inhale' | 'exhale' | ''>('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSec(s => {
        const phase = PHASES[phaseIdx];
        const remaining = phase.duration - s;
        setCounter(String(remaining));
        if (s === 0) {
          setLabel(phase.label);
          setSublabel(phase.sub);
          if (phase.phase === 'inhale') setOrbPhase('inhale');
          else if (phase.phase === 'exhale') setOrbPhase('exhale');
        }
        if (s + 1 >= phase.duration) {
          const nextIdx = (phaseIdx + 1) % PHASES.length;
          if (nextIdx === 0) {
            const nextRound = round + 1;
            if (nextRound >= 4) {
              clearInterval(intervalRef.current!);
              setRunning(false);
              setLabel('Complete ✓');
              setSublabel('Great session! 4 rounds done.');
              setCounter('✓');
              setOrbPhase('');
              showToast('🌬️ Breathing complete · +25 pts');
              return 0;
            }
            setRound(nextRound);
          }
          setPhaseIdx(nextIdx);
          return 0;
        }
        return s + 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [running, phaseIdx, round, showToast]);

  function start() {
    if (running) return;
    setRunning(true); setPhaseIdx(0); setSec(0); setRound(0); setCounter('4');
  }

  return (
    <div className="calm-screen screen" style={{ height: '100%' }}>
      <div className="calm-header">
        <button className="screen-back-btn" onClick={() => setScreen('room')}>‹</button>
        <span style={{ fontWeight: 700, color: 'var(--text)' }}>Calm Space 🌬️</span>
      </div>

      <div className="calm-tabs">
        {(['breathe', 'ground', 'body'] as Tab[]).map(t => (
          <button key={t} className={`calm-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t === 'breathe' ? 'Breathe' : t === 'ground' ? 'Ground' : 'Body Reset'}
          </button>
        ))}
      </div>

      {tab === 'breathe' && (
        <div className="calm-content">
          <div style={{ fontSize: '0.82rem', color: 'var(--muted)', maxWidth: 240 }}>Box breathing calms your nervous system in under 2 minutes.</div>
          <div className={`breath-orb${orbPhase ? ' ' + orbPhase : ''}`} onClick={start}>
            <div className="breath-inner">🌬️</div>
          </div>
          <div className="breath-counter">{counter}</div>
          <div className="breath-label">{label}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--soft)' }}>{sublabel}</div>
          <div style={{ width: '100%', display: 'flex', gap: '0.6rem' }}>
            {[{ icon: '🧘', lbl: 'Guided' }, { icon: '🎵', lbl: 'Sounds' }, { icon: '📊', lbl: 'History' }].map(x => (
              <div key={x.lbl} style={{ flex: 1, background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.15)', borderRadius: 14, padding: '0.8rem', textAlign: 'center', cursor: 'pointer' }}
                onClick={() => showToast(`🌬️ ${x.lbl} coming soon`)}>
                <div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>{x.icon}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--soft)', fontWeight: 600 }}>{x.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'ground' && (
        <div className="calm-content">
          <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>5-4-3-2-1 Grounding · anchor yourself right now</div>
          <div className="grounding-cards">
            {GROUND.map(g => (
              <div key={g.n} className="gc">
                <div className="gc-num">{g.n}</div>
                <div>Name {g.n} {g.text} <strong style={{ color: 'var(--text)' }}>{g.bold}</strong> around you</div>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.15)', borderRadius: 14, padding: '1rem', fontSize: '0.82rem', color: 'var(--soft)', lineHeight: 1.55, textAlign: 'center' }}>
            You are here. You are safe. This feeling will pass. 💙
          </div>
        </div>
      )}

      {tab === 'body' && (
        <div className="calm-content">
          <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Body scan · release tension you're holding</div>
          <div className="grounding-cards">
            {BODY.map((b, i) => (
              <div key={i} className="gc">
                <div className="gc-num">{i + 1}</div>
                <div>{b}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
