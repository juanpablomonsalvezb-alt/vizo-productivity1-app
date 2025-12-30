
import React, { useState } from 'react';
import { ThemeVibe } from '../types';

interface MusicPlayerProps {
  currentTheme: ThemeVibe;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentTheme }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const playerColor = currentTheme === ThemeVibe.KPOP ? '#d946ef' : '#136dec';

  return (
    <div className="glass-panel p-4 rounded-[2rem] flex items-center gap-5 border border-white/10 shadow-2xl backdrop-blur-3xl animate-slide-up group">
      <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform">
        <img 
          src="https://picsum.photos/200/200?blur=2" 
          className="absolute inset-0 w-full h-full object-cover opacity-80" 
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-1">
          {[1,2,3,4,5].map(i => (
             <div 
               key={i}
               className={`w-0.5 bg-white rounded-full ${isPlaying ? 'animate-[bounce_1s_infinite]' : 'h-2'}`}
               style={{ animationDelay: `${i * 0.1}s`, height: isPlaying ? '12px' : '4px' }}
             />
          ))}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-black truncate text-white leading-tight">Lo-Fi Beats to Study</h4>
        <div className="flex items-center gap-2 mt-1">
           <span className="text-[9px] font-black bg-red-500/80 text-white px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
           <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest truncate">CHILLHOP RADIO</span>
        </div>
      </div>

      <div className="flex items-center gap-1 pr-2">
        <button className="p-2 text-gray-500 hover:text-white transition-colors">
          <span className="material-symbols-outlined text-xl">skip_previous</span>
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/10"
        >
          <span className="material-symbols-outlined text-2xl filled text-white">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>
        <button className="p-2 text-gray-500 hover:text-white transition-colors">
          <span className="material-symbols-outlined text-xl">skip_next</span>
        </button>
      </div>

      <div className="h-8 w-px bg-white/5 mx-1"></div>

      <div className="group/vol flex items-center px-2">
         <span className="material-symbols-outlined text-gray-500 group-hover/vol:text-white cursor-pointer transition-colors">volume_up</span>
         <div className="w-0 group-hover/vol:w-20 overflow-hidden transition-all duration-300 ml-2">
            <div className="w-16 h-1 bg-white/10 rounded-full">
               <div className="w-2/3 h-full bg-primary rounded-full"></div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
