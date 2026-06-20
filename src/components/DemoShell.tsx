import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useClock } from '../hooks/useClock';
import type { ScreenId } from '../types';

import Chooser from '../screens/Chooser';
import Room from '../screens/Room';
import Chat from '../screens/Chat';
import Journal from '../screens/Journal';
import Calm from '../screens/Calm';
import VoiceBip from '../screens/VoiceBip';
import Circles from '../screens/Circles';
import Comfort from '../screens/Comfort';
import Points from '../screens/Points';
import Parent from '../screens/Parent';

const NAV_ITEMS: { screen: ScreenId; icon: string; label: string }[] = [
  { screen: 'room', icon: '🏠', label: 'Room' },
  { screen: 'journal', icon: '📓', label: 'Journal' },
  { screen: 'chat', icon: '💜', label: 'Sekret' },
  { screen: 'circles', icon: '🫂', label: 'Circles' },
  { screen: 'comfort', icon: '💫', label: 'Comfort' },
];

const TOP_NAV: { screen: ScreenId; label: string }[] = [
  { screen: 'chooser', label: 'Welcome' },
  { screen: 'room', label: '🏠 Room' },
  { screen: 'chat', label: '💬 Sekret' },
  { screen: 'voice', label: '🎙️ VoiceBip' },
  { screen: 'journal', label: '📓 Journal' },
  { screen: 'calm', label: '🌬️ Calm' },
  { screen: 'circles', label: '🫂 Circles' },
  { screen: 'comfort', label: '💫 Comfort' },
  { screen: 'points', label: '🏅 Points' },
  { screen: 'parent', label: '🌿 Parent' },
];

const HIDE_BOTTOM_NAV: ScreenId[] = ['chooser', 'parent', 'calm', 'voice'];

interface Props {
  onBack: () => void;
  initialScreen: ScreenId;
}

export default function DemoShell({ onBack, initialScreen }: Props) {
  const { screen, setScreen, toastMsg, toastVisible, toastGreen } = useApp();
  const time = useClock();

  useEffect(() => { setScreen(initialScreen); }, [initialScreen, setScreen]);

  const showBottomNav = !HIDE_BOTTOM_NAV.includes(screen);

  function scrollTop(id: ScreenId) {
    const el = document.getElementById('s-' + id);
    if (el) el.scrollTop = 0;
  }

  function go(id: ScreenId) { setScreen(id); scrollTop(id); }

  return (
    <div className="demo-shell">
      <div className="demo-chrome">
        <div className="demo-chrome-top">
          <div className="demo-label">Interactive Preview</div>
          <button className="back-btn-landing" onClick={onBack}>← Back</button>
        </div>

        <div className="demo-nav">
          {TOP_NAV.map(n => (
            <button
              key={n.screen}
              className={`dnav-btn${screen === n.screen ? ' active' : ''}`}
              onClick={() => go(n.screen)}
            >{n.label}</button>
          ))}
        </div>

        <div className="phone-wrapper">
        <div className="phone">
          <div className="phone-notch" />
          <div className="status-bar">
            <span>{time}</span>
            <span>Se'kret Bip</span>
            <span>🔋 84%</span>
          </div>

          <div className="phone-screen">
            <ScreenSlot id="chooser"><Chooser /></ScreenSlot>
            <ScreenSlot id="room"><Room /></ScreenSlot>
            <ScreenSlot id="chat"><Chat /></ScreenSlot>
            <ScreenSlot id="journal"><Journal /></ScreenSlot>
            <ScreenSlot id="calm"><Calm /></ScreenSlot>
            <ScreenSlot id="voice"><VoiceBip /></ScreenSlot>
            <ScreenSlot id="circles"><Circles /></ScreenSlot>
            <ScreenSlot id="comfort"><Comfort /></ScreenSlot>
            <ScreenSlot id="points"><Points /></ScreenSlot>
            <ScreenSlot id="parent"><Parent /></ScreenSlot>
          </div>

          {showBottomNav && (
            <nav className="bottom-nav">
              {NAV_ITEMS.map(n => (
                <button
                  key={n.screen}
                  className={`nav-item${screen === n.screen ? ' active' : ''}`}
                  onClick={() => go(n.screen)}
                >
                  <span className="ni">{n.icon}</span>
                  <span className="nl">{n.label}</span>
                </button>
              ))}
            </nav>
          )}
        </div>
        </div>
      </div>

      <div className={`toast${toastVisible ? ' show' : ''}${toastGreen ? ' green' : ''}`}>
        {toastMsg}
      </div>
    </div>
  );
}

function ScreenSlot({ id, children }: { id: ScreenId; children: React.ReactNode }) {
  const { screen } = useApp();
  return (
    <div id={`s-${id}`} className={`screen${screen === id ? ' active' : ''}`}>
      {children}
    </div>
  );
}
