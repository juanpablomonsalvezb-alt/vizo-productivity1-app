
import React from 'react';
import { AppView } from '../types';

interface SettingsProps {
  onNavigate: (view: AppView) => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  return (
    <div className="h-full w-full bg-[#111418] overflow-y-auto p-10 lg:p-20">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16">
          <button onClick={() => onNavigate(AppView.DASHBOARD)} className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-gray-400 mb-6">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-5xl font-black mb-4">Opciones de Accesibilidad</h1>
          <p className="text-gray-500 text-lg">Personaliza la apariencia y el comportamiento de Vizo.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <section className="glass-panel p-10 rounded-[2.5rem] border border-white/5">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                 <span className="material-symbols-outlined text-primary">visibility</span>
                 Preferencias Visuales
              </h2>
              <div className="space-y-10">
                 <ToggleOption label="Modo de Alto Contraste" desc="Aumenta el contraste entre el texto y el fondo." />
                 <div className="space-y-4">
                    <div className="flex justify-between">
                       <span className="font-bold">Tamaño de Fuente</span>
                       <span className="text-primary font-black">100%</span>
                    </div>
                    <input type="range" className="w-full accent-primary bg-white/10 rounded-full h-2 appearance-none cursor-pointer" />
                 </div>
                 <ToggleOption label="Reducir Movimiento" desc="Minimiza las animaciones decorativas." />
              </div>
            </section>

            <section className="glass-panel p-10 rounded-[2.5rem] border border-white/5">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                 <span className="material-symbols-outlined text-primary">keyboard</span>
                 Navegación
              </h2>
              <div className="space-y-10">
                 <ToggleOption label="Compatibilidad con Screen Reader" desc="Optimiza la estructura para lectores ARIA." checked />
                 <ToggleOption label="Resaltar Foco" desc="Borde grueso en elementos seleccionados." />
              </div>
            </section>
          </div>

          <div className="space-y-6">
             <h3 className="text-xs font-black uppercase tracking-widest text-gray-600 px-2">VISTA PREVIA EN VIVO</h3>
             <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="h-40 bg-gradient-to-br from-primary/80 to-background-dark flex items-end p-6">
                   <h4 className="text-2xl font-black">Tarjeta de Ejemplo</h4>
                </div>
                <div className="p-8 space-y-4">
                   <p className="text-gray-400 text-sm leading-relaxed">Ajusta las opciones a la izquierda para ver los cambios aquí en tiempo real.</p>
                   <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 flex items-center gap-4">
                      <span className="material-symbols-outlined text-emerald-400 filled">check_circle</span>
                      <div>
                         <p className="text-sm font-bold">Tarea Completada</p>
                         <p className="text-[10px] text-gray-500 uppercase font-black">HACE 5 MINUTOS</p>
                      </div>
                   </div>
                   <div className="flex gap-2 pt-4">
                      <button className="flex-1 py-3 bg-primary rounded-xl font-bold text-sm">Confirmar</button>
                      <button className="flex-1 py-3 bg-white/5 rounded-xl font-bold text-sm text-gray-500">Cancelar</button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToggleOption = ({ label, desc, checked }: any) => (
  <div className="flex items-center justify-between">
    <div className="flex-1 pr-10">
      <p className="font-bold mb-1">{label}</p>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
    <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${checked ? 'bg-primary' : 'bg-gray-700'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${checked ? 'right-1' : 'left-1'}`} />
    </div>
  </div>
);

export default Settings;
