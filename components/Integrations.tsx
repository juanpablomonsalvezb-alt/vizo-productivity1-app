
import React from 'react';
import { AppView } from '../types';

interface IntegrationsProps {
  onNavigate: (view: AppView) => void;
}

const Integrations: React.FC<IntegrationsProps> = ({ onNavigate }) => {
  const integrationList = [
    { name: 'Spotify', desc: 'Música y Podcasts', color: '#1db954', icon: 'music_note', active: true },
    { name: 'Notion', desc: 'Conocimiento y Notas', color: '#ffffff', icon: 'description', active: false },
    { name: 'Slack', desc: 'Comunicación en equipo', color: '#4a154b', icon: 'chat', active: false },
    { name: 'Drive', desc: 'Sincronización de archivos', color: '#4285f4', icon: 'cloud', active: true },
    { name: 'Trello', desc: 'Gestión de proyectos', color: '#0079bf', icon: 'dashboard', active: false },
  ];

  return (
    <div className="h-full w-full bg-[#111418] overflow-y-auto p-10 lg:p-20">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-4">
             <button onClick={() => onNavigate(AppView.DASHBOARD)} className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-gray-400">
                <span className="material-symbols-outlined">arrow_back</span>
             </button>
             <div>
                <h1 className="text-4xl font-black mb-2">Integraciones</h1>
                <p className="text-gray-500">Conecta tus herramientas favoritas para potenciar tu flujo.</p>
             </div>
          </div>
          <button className="px-6 py-3 rounded-2xl bg-primary hover:bg-blue-600 transition-all font-bold">Solicitar Integración</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrationList.map(int => (
            <div key={int.name} className="glass-panel p-8 rounded-[2.5rem] border border-white/5 flex flex-col hover:border-white/20 transition-all group">
               <div className="flex items-start justify-between mb-6">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl"
                    style={{ backgroundColor: int.color, opacity: int.name === 'Notion' ? 0.9 : 1 }}
                  >
                     <span className={`material-symbols-outlined text-4xl ${int.name === 'Notion' ? 'text-black' : 'text-white'}`}>{int.icon}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    int.active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
                  }`}>
                    {int.active ? 'CONECTADO' : 'DESCONECTADO'}
                  </div>
               </div>
               <h3 className="text-xl font-bold mb-2">{int.name}</h3>
               <p className="text-gray-500 text-sm mb-10 flex-1">{int.desc}</p>
               <button className={`w-full py-4 rounded-2xl font-black text-sm transition-all ${
                 int.active ? 'bg-white/5 hover:bg-red-500/10 hover:text-red-400' : 'bg-primary hover:bg-blue-600'
               }`}>
                 {int.active ? 'Desconectar' : 'Conectar'}
               </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Integrations;
