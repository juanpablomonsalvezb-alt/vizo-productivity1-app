
import React, { useState } from 'react';
import { Task } from '../types';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Revisar correos', completed: true },
    { id: '2', text: 'Terminar presentación K-Pop', completed: false, dueDate: 'Hoy 15:00' },
    { id: '3', text: 'Preparar Daily Sync', completed: false },
  ]);
  const [inputValue, setInputValue] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: inputValue,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="h-full glass-panel rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-white/10">
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-primary/20 text-primary">
            <span className="material-symbols-outlined text-lg">check_circle</span>
          </div>
          <h3 className="font-bold tracking-tight">Tareas</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-primary/20 text-[10px] font-black text-primary border border-primary/20">
            {tasks.filter(t => !t.completed).length}
          </span>
          <span className="material-symbols-outlined text-gray-500">more_horiz</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {tasks.map(task => (
          <div 
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-white/5"
          >
            <div className={`mt-0.5 w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
              task.completed ? 'bg-primary border-primary' : 'border-gray-600 group-hover:border-primary'
            }`}>
              {task.completed && <span className="material-symbols-outlined text-[14px] text-white font-black">check</span>}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                {task.text}
              </p>
              {task.dueDate && (
                <span className="inline-block mt-1 text-[10px] font-black bg-fuchsia-500/10 text-fuchsia-400 px-2 py-0.5 rounded-lg border border-fuchsia-500/20">
                  {task.dueDate}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-black/20 border-t border-white/5">
        <form onSubmit={addTask} className="relative group">
           <input 
             type="text" 
             value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}
             placeholder="Añadir nueva tarea..."
             className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-4 pr-12 text-sm text-white placeholder-gray-600 focus:ring-1 focus:ring-primary focus:bg-white/10 transition-all outline-none"
           />
           <button type="submit" className="absolute right-2 top-2 p-1 text-gray-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">add_circle</span>
           </button>
        </form>
      </div>
    </div>
  );
};

export default TaskList;
