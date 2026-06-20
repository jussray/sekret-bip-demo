import { useState } from 'react';
import { useApp } from '../context/AppContext';

type Tab = 'feed' | 'explore' | 'my';

interface Reaction { emoji: string; label: string; count: number; reacted: boolean; }
interface Post { id: string; anon: string; circle: string; ago: string; text: string; reactions: Reaction[]; }

const POSTS: Post[] = [
  { id: '1', anon: '🌙 Moon·247', circle: 'School Stress', ago: '3m ago', text: 'does anyone else feel like they have to be okay all the time because everyone around them is going through stuff too? like i can\'t add to it', reactions: [{ emoji: '💜', label: 'me too', count: 47, reacted: true }, { emoji: '🫂', label: 'hug', count: 23, reacted: false }, { emoji: '💙', label: 'felt this', count: 31, reacted: false }] },
  { id: '2', anon: '☁️ Cloud·891', circle: 'Late Night Feelings', ago: '12m ago', text: '3am brain is different. like everything i\'ve been avoiding during the day just shows up and says hi. anyone else\'s brain do this?', reactions: [{ emoji: '💜', label: 'me too', count: 89, reacted: false }, { emoji: '🌙', label: 'night owl', count: 44, reacted: false }, { emoji: '💙', label: 'felt this', count: 61, reacted: false }] },
  { id: '3', anon: '⭐ Star·112', circle: 'Wins', ago: '31m ago', text: 'small win but i actually asked for help today instead of pretending i was fine. it was terrifying and also kind of okay after?', reactions: [{ emoji: '🎉', label: 'yes!!', count: 102, reacted: false }, { emoji: '💜', label: 'proud of you', count: 78, reacted: false }, { emoji: '✨', label: 'growth', count: 56, reacted: false }] },
];

const EXPLORE = [
  { icon: '📚', name: 'School Stress', members: '4,821', preview: 'Exams, grades, pressure. Safe space to vent about academic life without judgment.', online: '247' },
  { icon: '🌙', name: 'Late Night Feelings', members: '7,340', preview: "For when it's 2am and your brain won't stop. Post anything. We're up too.", online: '891' },
  { icon: '🌈', name: 'Just Wins', members: '3,102', preview: 'Small wins ONLY. Got out of bed? Posted it. Sent that text? ICONIC.', online: '411' },
];

export default function Circles() {
  const { showToast } = useApp();
  const [tab, setTab] = useState<Tab>('feed');
  const [posts, setPosts] = useState<Post[]>(POSTS);

  function react(postId: string, rIdx: number) {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const reactions = p.reactions.map((r, i) => {
        if (i !== rIdx) return r;
        return { ...r, reacted: !r.reacted, count: r.count + (r.reacted ? -1 : 1) };
      });
      return { ...p, reactions };
    }));
  }

  return (
    <div className="circles-screen screen">
      <div className="circles-header">
        <div className="circles-title">Bip Circles 🫂</div>
        <div className="circles-sub">Anonymous · safe · you belong here</div>
      </div>

      <div className="circle-tabs">
        {(['feed', 'explore', 'my'] as Tab[]).map(t => (
          <button key={t} className={`circle-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t === 'feed' ? 'Feed' : t === 'explore' ? 'Explore' : 'My Circles'}
          </button>
        ))}
      </div>

      {tab === 'feed' && posts.map(p => (
        <div key={p.id} className="circle-post">
          <div className="cp-top">
            <div className="cp-anon">{p.anon} <span className="cp-circle-tag">{p.circle}</span></div>
            <div style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>{p.ago}</div>
          </div>
          <div className="cp-text">{p.text}</div>
          <div className="cp-reactions">
            {p.reactions.map((r, i) => (
              <button key={i} className={`cp-react${r.reacted ? ' reacted' : ''}`} onClick={() => react(p.id, i)}>
                {r.emoji} {r.label} · {r.count}
              </button>
            ))}
          </div>
        </div>
      ))}

      {tab === 'explore' && EXPLORE.map(c => (
        <div key={c.name} className="circle-card">
          <div className="cc-top">
            <div className="cc-icon">{c.icon}</div>
            <div>
              <div className="cc-name">{c.name}</div>
              <div className="cc-members">{c.members} members</div>
            </div>
          </div>
          <div className="cc-preview">"{c.preview}"</div>
          <div className="cc-footer">
            <div className="cc-live-chip"><div className="live-dot" />Live · {c.online} online</div>
            <button className="cc-join-btn" onClick={() => showToast(`💜 Joined ${c.name}!`)}>+ Join</button>
          </div>
        </div>
      ))}

      {tab === 'my' && (
        <div style={{ textAlign: 'center', padding: '2rem 1.4rem', color: 'var(--muted)', fontSize: '0.85rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>🫂</div>
          Join circles that feel like you.<br />Your people are already here.
        </div>
      )}
    </div>
  );
}
