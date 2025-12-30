
import React from 'react';
import { AppView } from '../types';

interface HistoryProps {
  onNavigate: (view: AppView) => void;
}

const History: React.FC<HistoryProps> = ({ onNavigate }) => {
  const events = [
    { type: 'task', title: 'Tarea Completada', desc: 'Actualización de Diseño UI', time: '14:35', date: 'Hoy' },
    { type: 'session', title: 'Sesión Finalizada', desc: 'Deep Work - Coding (50 min)', time: '11:50', date: 'Hoy' },
    { type: 'settings', title: 'Ajustes Modificados', desc: 'Se actualizó la configuración de notificaciones', time: '09:15', date: 'Hoy' },
    { type: 'session', title: 'Sesión Iniciada', desc: 'Revisión de Correos', time: '16:30', date: 'Ayer' },
  ];

  return (
    <div className="h-full w-full bg-[#111418] overflow-y-auto p-10 lg:p-20">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-end justify-between mb-16 px-4">
           <div>
              <button onClick={() => onNavigate(AppView.DASHBOARD)} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-4 font-bold text-sm">
                 <span className="material-symbols-outlined text-sm">arrow_back</span>
                 Volver
              </button>
              <h1 className="text-5xl font-black mb-2">Historial de Actividad</h1>
              <p className="text-gray-500 text-lg">Registro completo de tus sesiones y logros.</p>
           </div>
           <button className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center gap-3 font-bold transition-all">
              <span className="material-symbols-outlined">download</span>
              Exportar CSV
           </button>
        </header>

        <div className="space-y-8">
           <div class="sticky top-0 bg-[#111418] py-4 border-b border-white/5 flex items-center gap-3">
              <h2 className="text-xl font-bold">Hoy</h2>
              <span className="text-gray-600 font-medium">Jueves, 24 de Octubre</span>
           </div>
           <div className="space-y-1">
             {events.filter(e => e.date === 'Hoy').map((ev, i) => (
               <HistoryItem key={i} {...ev} />
             ))}
           </div>

           <div class="sticky top-0 bg-[#111418] py-4 border-b border-white/5 flex items-center gap-3 pt-10">
              <h2 className="text-xl font-bold">Ayer</h2>
              <span className="text-gray-600 font-medium">Miércoles, 23 de Octubre</span>
           </div>
           <div className="space-y-1">
             {events.filter(e => e.date === 'Ayer').map((ev, i) => (
               <HistoryItem key={i} {...ev} />
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

const HistoryItem = ({ type, title, desc, time }: any) => {
  const icon = type === 'task' ? 'check_circle' : type === 'session' ? 'timer' : 'settings';
  const color = type === 'task' ? 'text-emerald-400' : type === 'session' ? 'text-primary' : 'text-fuchsia-400';
  
  return (
    <div className="group flex items-center gap-6 p-5 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5 cursor-default">
       <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/5 ${color} group-hover:scale-110 transition-transform`}>
          <span className="material-symbols-outlined text-2xl">{icon}</span>
       </div>
       <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
             <h4 className="font-bold text-gray-200">{title}</h4>
             <span className="w-1 h-1 rounded-full bg-gray-700"></span>
             <span className="text-sm text-gray-500">{time}</span>
          </div>
          <p className="text-sm text-gray-500">{desc}</p>
       </div>
       <button className="opacity-0 group-hover:opacity-100 p-2 text-gray-600 hover:text-white transition-all">
          <span className="material-symbols-outlined text-lg">more_vert</span>
       </button>
    </div>
  );
};

export default History;
