
import React, { useState, useEffect } from 'react';
import { ThemeVibe, AppView, Task } from '../types';
import Sidebar from './Sidebar';
import Timer from './Timer';
import TaskList from './TaskList';
import MusicPlayer from './MusicPlayer';
import StatsWidget from './StatsWidget';
import TranslatorPanel from './TranslatorPanel';

interface DashboardProps {
  currentTheme: ThemeVibe;
  onThemeChange: (theme: ThemeVibe) => void;
  onNavigate: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ currentTheme, onThemeChange, onNavigate }) => {
  const [activeRightPanel, setActiveRightPanel] = useState<'tasks' | 'translator' | 'none'>('tasks');
  const [bgVideo, setBgVideo] = useState('https://assets.mixkit.co/videos/preview/mixkit-rain-falling-on-the-window-of-a-room-4348-large.mp4');

  useEffect(() => {
    switch (currentTheme) {
      case ThemeVibe.KPOP:
        setBgVideo('https://assets.mixkit.co/videos/preview/mixkit-pink-and-blue-ink-swirling-in-water-32863-large.mp4');
        break;
      case ThemeVibe.LOFI:
        setBgVideo('https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-slow-motion-2729-large.mp4');
        break;
      default:
        setBgVideo('https://assets.mixkit.co/videos/preview/mixkit-rain-falling-on-the-window-of-a-room-4348-large.mp4');
    }
  }, [currentTheme]);

  return (
    <div className="h-full w-full flex relative overflow-hidden bg-black">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <video 
          key={bgVideo}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-40 transition-opacity duration-1000"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className={`absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60 mix-blend-multiply ${
          currentTheme === ThemeVibe.KPOP ? 'bg-fuchsia-900/10' : ''
        }`}></div>
      </div>

      <Sidebar 
        currentTheme={currentTheme} 
        onThemeChange={onThemeChange} 
        onNavigate={onNavigate}
        onToggleTranslator={() => setActiveRightPanel(p => p === 'translator' ? 'none' : 'translator')}
      />

      <main className="flex-1 flex flex-col relative z-10">
        {/* Top Header Controls */}
        <header className="flex justify-end p-8 gap-4">
           <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-3">
              <span className="material-symbols-outlined text-primary filled animate-pulse">cloud_done</span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Sync Active</span>
           </div>
           <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-4">
              <div className="flex items-center gap-2">
                 <span className="text-lg font-bold">22°C</span>
                 <span className="text-xs text-gray-400">Madrid</span>
              </div>
              <button className="text-white/60 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-xl">notifications</span>
              </button>
           </div>
        </header>

        {/* Central Timer Area */}
        <div className="flex-1 flex flex-col items-center justify-center">
           <Timer currentTheme={currentTheme} />
        </div>

        {/* Bottom Widgets Row */}
        <div className="p-10 flex items-end justify-between">
           <div className="w-80">
              <StatsWidget />
           </div>
           <div className="w-96">
              <MusicPlayer currentTheme={currentTheme} />
           </div>
        </div>
      </main>

      {/* Floating Right Panels */}
      <div className={`fixed top-28 right-8 bottom-24 w-80 transition-all duration-500 ease-in-out z-30 transform ${
        activeRightPanel !== 'none' ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0 pointer-events-none'
      }`}>
        {activeRightPanel === 'tasks' && <TaskList />}
        {activeRightPanel === 'translator' && <TranslatorPanel onClose={() => setActiveRightPanel('tasks')} />}
      </div>
    </div>
  );
};

export default Dashboard;
