import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Landing from './components/Landing';
import DemoShell from './components/DemoShell';
import type { ScreenId } from './types';

export default function App() {
  const [view, setView] = useState<'landing' | 'demo'>('landing');
  const [startScreen, setStartScreen] = useState<ScreenId>('chooser');

  function launch(screen: ScreenId) {
    setStartScreen(screen);
    setView('demo');
  }

  return (
    <AppProvider>
      {view === 'landing' ? (
        <Landing onLaunch={launch} />
      ) : (
        <DemoShell onBack={() => setView('landing')} initialScreen={startScreen} />
      )}
    </AppProvider>
  );
}
