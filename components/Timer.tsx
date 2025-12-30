
import React, { useState, useEffect, useRef } from 'react';
import { ThemeVibe } from '../types';

interface TimerProps {
  currentTheme: ThemeVibe;
}

const Timer: React.FC<TimerProps> = ({ currentTheme }) => {
  const [seconds, setSeconds] = useState(1500); // 25:00
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  
  // Using any for the timer reference to avoid "Cannot find namespace 'NodeJS'" errors in browser environments.
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isActive && seconds > 0) {
      timerRef.current = setInterval(() => {
        setSeconds(s => s - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      // Play sound notification here
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, seconds]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(mode === 'focus' ? 1500 : 300);
  };

  const progress = (seconds / (mode === 'focus' ? 1500 : 300)) * 100;
  const strokeDashoffset = 1280 - (1280 * progress) / 100;

  const timerColor = currentTheme === ThemeVibe.KPOP ? '#d946ef' : 
                     currentTheme === ThemeVibe.LOFI ? '#f97316' : '#136dec';

  return (
    <div className="relative group animate-fade-in">
      <div className="relative w-[420px] h-[420px] flex items-center justify-center">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
        
        {/* Progress Ring */}
        <svg className="w-full h-full transform -rotate-90">
          <circle 
            cx="50%" cy="50%" r="46%" 
            fill="transparent" 
            stroke="rgba(255,255,255,0.05)" 
            strokeWidth="8"
          />
          <circle 
            cx="50%" cy="50%" r="46%" 
            fill="transparent" 
            stroke={timerColor}
            strokeWidth="8"
            strokeDasharray="1280"
            style={{ 
               strokeDashoffset, 
               transition: 'stroke-dashoffset 1s linear',
               filter: `drop-shadow(0 0 15px ${timerColor}60)`
            }}
            strokeLinecap="round"
          />
        </svg>

        {/* Display Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
           <div className="flex items-center gap-2 mb-4 animate-pulse">
              <span className="material-symbols-outlined text-primary filled">spa</span>
              <span className="text-sm font-black uppercase tracking-[0.3em] text-white/40">
                {mode === 'focus' ? 'Focus' : 'Break'}
              </span>
           </div>
           
           <h3 className="text-9xl font-black tracking-tighter tabular-nums drop-shadow-2xl">
             {formatTime(seconds)}
           </h3>

           <div className="mt-8 px-5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
             <span className="text-xs font-bold text-gray-400">Respira y relájate</span>
           </div>
        </div>

        {/* Play Controls Overlay */}
        <div className="absolute -bottom-6 flex items-center gap-6 glass-panel px-8 py-4 rounded-3xl border border-white/10 shadow-2xl">
           <button 
            onClick={resetTimer}
            className="p-2 text-gray-500 hover:text-white transition-all hover:bg-white/5 rounded-xl"
           >
             <span className="material-symbols-outlined text-2xl">restart_alt</span>
           </button>
           
           <button 
            onClick={toggleTimer}
            className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.4)]"
           >
             <span className="material-symbols-outlined text-4xl filled">
               {isActive ? 'pause' : 'play_arrow'}
             </span>
           </button>

           <button className="p-2 text-gray-500 hover:text-white transition-all hover:bg-white/5 rounded-xl">
             <span className="material-symbols-outlined text-2xl">skip_next</span>
           </button>
        </div>
      </div>
      
      {/* Mini Objective Input */}
      <div className="mt-20 w-[420px] glass-panel rounded-2xl p-4 flex items-center gap-4 border border-white/10 shadow-xl focus-within:ring-2 focus-within:ring-primary/40 transition-all">
         <span className="material-symbols-outlined text-gray-500">edit_note</span>
         <input 
           type="text" 
           placeholder="¿Qué harás en este descanso?" 
           className="bg-transparent border-none focus:ring-0 w-full text-white placeholder-gray-600 text-sm font-medium"
         />
         <button className="p-1 text-gray-500 hover:text-white transition-colors">
            <span className="material-symbols-outlined">arrow_forward</span>
         </button>
      </div>
    </div>
  );
};

export default Timer;
