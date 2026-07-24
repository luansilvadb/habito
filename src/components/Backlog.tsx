import React, { useState } from 'react';
import { Principle, PrincipleState } from '../types';
import { Plus, Play, Archive, CheckCircle2 } from 'lucide-react';

interface BacklogProps {
  principles: Principle[];
  onAdd: (text: string) => void;
  onActivate: (id: string) => void;
  onArchive: (id: string) => void;
}

export function Backlog({ principles, onAdd, onActivate, onArchive }: BacklogProps) {
  const [newText, setNewText] = useState('');
  const [activeTab, setActiveTab] = useState<PrincipleState>('BACKLOG');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newText.trim()) {
      onAdd(newText);
      setNewText('');
    }
  };

  const filteredPrinciples = principles.filter(p => p.state === activeTab);

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full z-10 transition-colors duration-300">
      <div className="p-6 md:p-8 border-b border-black/10 dark:border-white/5 shrink-0 bg-transparent transition-colors duration-300">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 transition-colors duration-300">Gestão de Princípios</h2>
        
        <form onSubmit={handleAdd} className="flex gap-3">
          <input 
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value.toUpperCase())}
            placeholder="EX: NÃO USAR FLASH AGRESSIVO SEM VISÃO..."
            className="flex-1 bg-white dark:bg-[#131317] border border-black/10 dark:border-white/5 rounded-lg px-4 py-3 text-sm font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 transition-colors duration-300 uppercase"
          />
          <button 
            type="submit"
            disabled={!newText.trim()}
            className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 disabled:opacity-50 transition-colors flex items-center justify-center shrink-0 rounded-lg shadow-sm"
          >
            <Plus className="w-4 h-4 md:hidden" />
            <span className="hidden md:block">Novo</span>
          </button>
        </form>
      </div>

      <div className="flex border-b border-black/10 dark:border-white/5 px-4 md:px-8 pt-4 md:pt-6 gap-2 md:gap-8 shrink-0 overflow-x-auto no-scrollbar bg-transparent transition-colors duration-300">
        <TabButton 
          active={activeTab === 'BACKLOG'} 
          onClick={() => setActiveTab('BACKLOG')}
          count={principles.filter(p => p.state === 'BACKLOG').length}
        >
          Fila Ativa
        </TabButton>
        <TabButton 
          active={activeTab === 'INTERNALIZADO'} 
          onClick={() => setActiveTab('INTERNALIZADO')}
          count={principles.filter(p => p.state === 'INTERNALIZADO').length}
        >
          Internalizados
        </TabButton>
        <TabButton 
          active={activeTab === 'ARQUIVADO'} 
          onClick={() => setActiveTab('ARQUIVADO')}
          count={principles.filter(p => p.state === 'ARQUIVADO').length}
        >
          Arquivados
        </TabButton>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        {filteredPrinciples.length === 0 ? (
          <div className="text-center text-zinc-500 dark:text-zinc-600 py-16 border border-dashed border-black/10 dark:border-white/5 rounded text-sm font-medium transition-colors duration-300">
            Nenhum princípio nesta visão.
          </div>
        ) : (
          <div className="flex flex-col gap-4 pb-8">
            {filteredPrinciples.map(p => (
              <div key={p.id} className="p-5 rounded border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between group hover:border-black/20 dark:hover:border-white/10 transition-colors duration-300">
                <div className="flex-1 pr-6">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed transition-colors duration-300">{p.text}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 transition-colors duration-300">
                    Adicionado em {new Date(p.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex items-center gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shrink-0">
                  {p.state !== 'ATIVO' && p.state !== 'INTERNALIZADO' && (
                    <button 
                      onClick={() => onActivate(p.id)}
                      className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors flex items-center gap-2 rounded-lg shadow-sm"
                      title="Ativar Missão"
                    >
                      <Play className="w-3 h-3" />
                      <span className="hidden md:block">Focar</span>
                    </button>
                  )}
                  {p.state !== 'ARQUIVADO' && p.state !== 'INTERNALIZADO' && (
                    <button 
                      onClick={() => onArchive(p.id)}
                      className="p-2 border border-black/10 dark:border-white/5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 rounded transition-colors"
                      title="Arquivar"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                  )}
                  {p.state === 'INTERNALIZADO' && (
                     <div className="p-2 text-emerald-600 dark:text-emerald-500 transition-colors duration-300">
                       <CheckCircle2 className="w-5 h-5" />
                     </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ children, active, count, onClick }: { children: React.ReactNode, active: boolean, count: number, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex-1 md:flex-none justify-center md:justify-start pb-4 text-sm font-medium flex items-center gap-2 md:gap-3 border-b-2 transition-colors whitespace-nowrap ${
        active 
          ? 'border-emerald-500 dark:border-emerald-400 text-zinc-900 dark:text-zinc-100' 
          : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
      }`}
    >
      {children}
      <span className={`text-xs px-2 py-0.5 rounded-full transition-colors duration-300 ${active ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-500' : 'bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-500'}`}>
        {count}
      </span>
    </button>
  );
}
