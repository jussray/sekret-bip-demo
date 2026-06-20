import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import type { ScreenId, JournalEntry } from '../types';

interface AppContextValue {
  screen: ScreenId;
  setScreen: (id: ScreenId) => void;
  toastMsg: string;
  toastVisible: boolean;
  toastGreen: boolean;
  showToast: (msg: string, green?: boolean) => void;
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: JournalEntry) => void;
  selectedMood: string;
  setSelectedMood: (m: string) => void;
  selectedComp: number;
  setSelectedComp: (i: number) => void;
}

const Ctx = createContext<AppContextValue>(null!);

const INITIAL_ENTRIES: JournalEntry[] = [
  {
    id: '1',
    date: 'Thu, Jun 19 · 10:42 PM',
    mood: '😄',
    moodColor: 'rgba(34,197,94,0.15)',
    text: 'Had the best day in a while. Maya actually texted first and we ended up talking for like 3 hours. I forgot what that felt like — being heard without having to explain everything from the beginning...',
    tags: ['connection', 'friendship', 'grateful'],
  },
  {
    id: '2',
    date: 'Wed, Jun 18 · 11:15 PM',
    mood: '😢',
    moodColor: 'rgba(239,68,68,0.15)',
    text: 'I don\'t know why I cried for like 20 mins tonight. Nothing happened. I just felt this wave and I couldn\'t stop it. Rylane helped me breathe through it but I still feel kind of hollow...',
    tags: ['overwhelmed', 'breakthrough'],
  },
  {
    id: '3',
    date: 'Tue, Jun 17 · 9:30 PM',
    mood: '🙂',
    moodColor: 'rgba(167,139,250,0.15)',
    text: 'Mom and I actually had a real conversation today. She asked how I was feeling — not about grades, just... me. I didn\'t know what to say at first but then it came out...',
    tags: ['family', 'progress'],
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreenState] = useState<ScreenId>('chooser');
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastGreen, setToastGreen] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(INITIAL_ENTRIES);
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedComp, setSelectedComp] = useState(0);

  const setScreen = useCallback((id: ScreenId) => setScreenState(id), []);

  const showToast = useCallback((msg: string, green = false) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMsg(msg);
    setToastGreen(green);
    setToastVisible(true);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2500);
  }, []);

  const addJournalEntry = useCallback((entry: JournalEntry) => {
    setJournalEntries(prev => [entry, ...prev]);
  }, []);

  return (
    <Ctx.Provider value={{ screen, setScreen, toastMsg, toastVisible, toastGreen, showToast, journalEntries, addJournalEntry, selectedMood, setSelectedMood, selectedComp, setSelectedComp }}>
      {children}
    </Ctx.Provider>
  );
}

export const useApp = () => useContext(Ctx);
