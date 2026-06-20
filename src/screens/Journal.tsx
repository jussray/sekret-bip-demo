import { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { JournalEntry } from '../types';

const WEEK = [
  { emoji: '😐', day: 'MON' }, { emoji: '🙂', day: 'TUE' }, { emoji: '😢', day: 'WED' },
  { emoji: '😄', day: 'THU' }, { emoji: '🙂', day: 'FRI' }, { emoji: '😐', day: 'SAT' },
  { emoji: '😊', day: 'TODAY', today: true },
];

const MOODS = ['😄', '🙂', '😐', '😢', '😭'];

export default function Journal() {
  const { journalEntries, addJournalEntry, showToast } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState('');
  const [mood, setMood] = useState('🙂');

  function save() {
    if (!text.trim()) { showToast('Write something first 💜'); return; }
    const now = new Date();
    const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) +
      ' · ' + now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const entry: JournalEntry = {
      id: Date.now().toString(), date, mood,
      moodColor: 'rgba(167,139,250,0.15)',
      text: text.slice(0, 200), tags: [],
    };
    addJournalEntry(entry);
    setText(''); setMood('🙂');
    setModalOpen(false);
    showToast('Entry saved 💜 +50 pts');
  }

  return (
    <div className="journal-screen screen" style={{ position: 'relative' }}>
      <div className="journal-header">
        <div>
          <div className="journal-title">My Journal</div>
          <div className="journal-subtitle">Private · encrypted · yours</div>
        </div>
        <button className="new-entry-btn" onClick={() => setModalOpen(true)}>+ New</button>
      </div>

      <div className="mood-timeline" style={{ padding: '0 1.4rem 0.8rem' }}>
        <div className="section-label" style={{ marginBottom: '0.6rem' }}>This Week</div>
        <div className="mt-dots">
          {WEEK.map(w => (
            <div key={w.day} className="mt-day">
              <div className={`mt-dot${w.today ? ' today' : ''}`}>{w.emoji}</div>
              <div className="mt-dlabel" style={w.today ? { color: 'var(--purple-light)' } : {}}>{w.day}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="write-prompt" onClick={() => setModalOpen(true)}>
        <div className="wp-label">✨ Today's Prompt</div>
        <div className="wp-text">"What's one thing you're carrying right now that you haven't told anyone?"</div>
      </div>

      <div className="journal-entries">
        {journalEntries.map(e => (
          <div key={e.id} className="je-card">
            <div className="je-top">
              <div className="je-date">{e.date}</div>
              <div className="je-mood-chip" style={{ background: e.moodColor, color: e.moodColor.includes('34,197') ? '#86efac' : e.moodColor.includes('239,68') ? '#fca5a5' : 'var(--purple-light)' }}>
                {e.mood}
              </div>
            </div>
            <div className="je-text">{e.text}</div>
            {e.tags.length > 0 && (
              <div className="je-tags">
                {e.tags.map(t => <span key={t} className="je-tag">{t}</span>)}
              </div>
            )}
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="write-overlay">
          <div className="write-modal">
            <div className="wm-handle" />
            <div className="wm-title">New Entry</div>
            <div className="wm-prompt-text">"What's one thing you're carrying right now?"</div>
            <div className="wm-mood-row">
              {MOODS.map(m => (
                <button key={m} className={`wm-mood${mood === m ? ' selected' : ''}`} onClick={() => setMood(m)}>{m}</button>
              ))}
            </div>
            <div className="wm-char-count">{text.length} / 200</div>
            <textarea
              className="wm-textarea"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Write anything — this is just for you…"
              maxLength={200}
            />
            <div className="wm-actions">
              <button className="wm-btn wm-cancel" onClick={() => { setModalOpen(false); setText(''); }}>Cancel</button>
              <button className="wm-btn wm-save" onClick={save}>Save Entry 💜</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
