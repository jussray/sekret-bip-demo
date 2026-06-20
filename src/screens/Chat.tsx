import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useApp } from '../context/AppContext';

interface Message {
  id: string;
  role: 'ai' | 'user';
  text: string;
  time: string;
}

const AI_REPLIES = [
  "i hear you 💜 that sounds really hard. what do you think is underneath all of it?",
  "you're carrying a lot. have you been able to let yourself rest at all?",
  "that makes complete sense. you don't have to figure everything out tonight — can we just sit with it a bit?",
  "thanks for telling me. i know it's not always easy to put it into words 💙",
  "honestly? what you're describing is really common even if it doesn't feel that way. you're not broken.",
  "i love that you said that out loud, even just here. that matters. 💜",
  "what would it feel like to just… not have to be okay for one day?",
];

const INITIAL_MESSAGES: Message[] = [
  { id: '1', role: 'ai', text: "hey Aaliyah 💜 i've been thinking about you today. how are you actually feeling?", time: '9:38 PM' },
  { id: '2', role: 'user', text: "honestly kind of stressed about school stuff and idk just a lot going on", time: '9:39 PM' },
  { id: '3', role: 'ai', text: 'that makes sense 💙 "a lot going on" can feel really heavy when it all piles up. is the stress more like anxiety-butterflies or more like exhausted-heavy?', time: '9:39 PM' },
  { id: '4', role: 'user', text: "both honestly lol. like i have so much to do but also no energy to do any of it", time: '9:40 PM' },
  { id: '5', role: 'ai', text: "ugh that's the worst combo — the pressure with zero fuel 😔 that's actually really common, not a you problem at all. what's the one thing that's sitting heaviest right now?", time: '9:40 PM' },
];

function now() {
  const d = new Date();
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export default function Chat() {
  const { setScreen, showToast } = useApp();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const replyIdx = useRef(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function sendMsg() {
    const text = input.trim();
    if (!text) return;
    setInput('');
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text, time: now() };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply = AI_REPLIES[replyIdx.current % AI_REPLIES.length];
      replyIdx.current++;
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', text: reply, time: now() };
      setMessages(prev => [...prev, aiMsg]);
    }, 1600 + Math.random() * 1000);
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') sendMsg();
  }

  return (
    <div className="chat-screen screen" style={{ height: '100%' }}>
      <div className="chat-header">
        <button className="screen-back-btn" onClick={() => setScreen('room')}>‹</button>
        <span style={{ fontSize: '1.9rem' }}>🌙</span>
        <div style={{ flex: 1 }}>
          <div className="chat-meta-name">Rylane</div>
          <div className="chat-meta-status"><span className="online-dot" /> Online · responds in seconds</div>
        </div>
        <span style={{ fontSize: '1.1rem', cursor: 'pointer' }} onClick={() => showToast('🔒 This chat is end-to-end encrypted')}>🔒</span>
      </div>

      <div className="chat-messages">
        {messages.map(m => (
          <div key={m.id} className={`msg ${m.role}`}>
            <div className="msg-bubble">{m.text}</div>
            <div className={`msg-time${m.role === 'user' ? '' : ''}`}>{m.time}</div>
          </div>
        ))}
        {typing && (
          <div className="typing-bubble">
            <div className="dot" /><div className="dot" /><div className="dot" />
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="chat-input-row">
        <button className="voice-chat-btn" onClick={() => showToast('🎙️ Voice message mode')}>🎙️</button>
        <input
          className="chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Talk to Rylane…"
        />
        <button className="send-btn" onClick={sendMsg}>➤</button>
      </div>
    </div>
  );
}
