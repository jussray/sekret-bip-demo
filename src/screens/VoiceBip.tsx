import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

export default function VoiceBip() {
  const { setScreen, showToast } = useApp();
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState('Tap the orb to start recording');
  const [orbText, setOrbText] = useState('🎙️');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function toggle() {
    if (!recording) {
      setRecording(true);
      setStatus('Recording… speak freely');
      setSeconds(0);
      timerRef.current = setInterval(() => {
        setSeconds(s => {
          if (s + 1 >= 60) { stop(); return 60; }
          return s + 1;
        });
      }, 1000);
    } else stop();
  }

  function stop() {
    if (timerRef.current) clearInterval(timerRef.current);
    setRecording(false);
    setOrbText('✓');
    setStatus('Recording saved · Rylane is listening');
    showToast('🎙️ Voice note captured');
    setTimeout(() => { setOrbText('🎙️'); setStatus('Tap to record again'); }, 3000);
  }

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const timeStr = `${m}:${s.toString().padStart(2, '0')}`;

  function saveBip() {
    showToast('💜 Voice Bip saved · +40 pts');
    setTimeout(() => setScreen('room'), 800);
  }

  return (
    <div className="voice-screen screen" style={{ height: '100%' }}>
      <div className="voice-header">
        <button className="screen-back-btn" onClick={() => setScreen('room')}>‹</button>
        <span style={{ fontSize: '1.6rem' }}>🌙</span>
        <div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>Voice Bip with Rylane</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span className="online-dot" /> Listening · private
          </div>
        </div>
      </div>

      <div className="voice-content">
        <div style={{ fontSize: '0.82rem', color: 'var(--muted)', maxWidth: 220 }}>
          Speak your thoughts out loud — Rylane will respond with a voice note back
        </div>
        <button className={`voice-orb${recording ? ' listening' : ''}`} onClick={toggle}>
          {orbText}
        </button>
        {recording && <div className="voice-timer">{timeStr}</div>}
        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--purple-light)' }}>Rylane</div>
        <div style={{ fontSize: '0.82rem', color: 'var(--soft)' }}>{status}</div>
        <div className="voice-transcript">
          <div className="vt-label">Last Session · Earlier today</div>
          Rylane said: "I'm so glad you shared that. It takes courage to say those things out loud. I want you to know — what you feel is valid, completely. Let's sit with that for a second..."
        </div>
        <div className="voice-actions">
          <button className="va-btn" onClick={() => setScreen('room')}>✕ Cancel</button>
          <button className="va-btn primary" onClick={saveBip}>Save Bip 💜</button>
        </div>
      </div>
    </div>
  );
}
