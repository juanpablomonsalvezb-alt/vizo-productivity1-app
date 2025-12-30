
import React, { useState, useEffect } from 'react';
import { AppView, ThemeVibe } from './types';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Integrations from './components/Integrations';
import Settings from './components/Settings';
import History from './components/History';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [theme, setTheme] = useState<ThemeVibe>(ThemeVibe.PROFESSIONAL);

  // Persistence (mock)
  useEffect(() => {
    const savedTheme = localStorage.getItem('vizo-theme');
    if (savedTheme) setTheme(savedTheme as ThemeVibe);
  }, []);

  const handleThemeChange = (newTheme: ThemeVibe) => {
    setTheme(newTheme);
    localStorage.setItem('vizo-theme', newTheme);
  };

  const renderContent = () => {
    switch (view) {
      case AppView.LANDING:
        return <LandingPage onStart={() => setView(AppView.DASHBOARD)} />;
      case AppView.DASHBOARD:
        return <Dashboard 
                  currentTheme={theme} 
                  onThemeChange={handleThemeChange} 
                  onNavigate={setView} 
                />;
      case AppView.INTEGRATIONS:
        return <Integrations onNavigate={setView} />;
      case AppView.SETTINGS:
        return <Settings onNavigate={setView} />;
      case AppView.HISTORY:
        return <History onNavigate={setView} />;
      default:
        return <Dashboard currentTheme={theme} onThemeChange={handleThemeChange} onNavigate={setView} />;
    }
  };

  return (
    <div className={`h-screen w-screen overflow-hidden transition-colors duration-500 ${
      theme === ThemeVibe.KPOP ? 'theme-kpop' : 
      theme === ThemeVibe.LOFI ? 'theme-lofi' : ''
    }`}>
      {renderContent()}
    </div>
  );
};

export default App;
