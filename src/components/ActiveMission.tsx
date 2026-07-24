import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Principle, Observation } from '../types';
import { Target, Check, X, Trophy, History } from 'lucide-react';

interface ActiveMissionProps {
  principle?: Principle;
  observations: Observation[];
  onLog: (broken: boolean) => void;
  onComplete: () => void;
  onGoToBacklog: () => void;
}

export function ActiveMission({ principle, observations, onLog, onComplete, onGoToBacklog }: ActiveMissionProps) {
  const [logState, setLogState] = useState<'idle' | 'success'>('idle');
  
  useEffect(() => {
    setLogState('idle');
  }, [principle?.id]);

  if (!principle) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center h-full transition-colors duration-300">
        <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center mb-6 shadow-sm">
          <Target className="w-8 h-8 text-zinc-900 dark:text-white/80" strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-3">
          Nenhum foco definido
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mb-8 leading-relaxed text-sm">
          A evolução exige intencionalidade. Escolha um princípio do seu backlog para iniciar seu ciclo de prática deliberada.
        </p>
        <button 
          onClick={onGoToBacklog}
          className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors rounded-lg shadow-sm"
        >
          Selecionar Princípio
        </button>
      </div>
    );
  }

  const handleLog = (broken: boolean) => {
    onLog(broken);
    setLogState('success');
    setTimeout(() => {
      setLogState('idle');
    }, 1500);
  };

  const principleObs = observations.filter(o => o.principleId === principle.id);
  const total = principleObs.length;
  const kept = principleObs.filter(o => !o.broken).length;
  const rate = total > 0 ? Math.round((kept / total) * 100) : 0;
  
  let streak = 0;
  for (let i = 0; i < principleObs.length; i++) {
    if (!principleObs[i].broken) {
      streak++;
    } else {
      break;
    }
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row w-full h-full transition-colors duration-300">
      {/* Main Loop Area */}
      <section className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12 relative">
        <div className="z-10 text-center max-w-2xl w-full">
          <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-semibold mb-6 md:mb-8 border border-emerald-200 dark:border-emerald-500/20 transition-colors duration-300">
            Missão de Alta Fidelidade Ativa
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.2] mb-4 text-zinc-900 dark:text-white transition-colors duration-300">
            Não quebrar: <br/>
            <span className="text-emerald-600 dark:text-emerald-400 transition-colors duration-300">{principle.text}</span>
          </h1>
          <p className="text-zinc-500 text-sm font-medium mt-6 md:mt-8 uppercase tracking-widest">FINALIZE A PARTIDA E REGISTRE O FEEDBACK</p>
        </div>

        <div className="mt-12 md:mt-16 h-48 md:h-64 w-full flex items-center justify-center z-10">
          <AnimatePresence mode="wait">
            {logState === 'idle' ? (
              <motion.div 
                key="buttons"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
                className="flex gap-6 md:gap-8"
              >
                <button 
                  onClick={() => handleLog(false)}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative w-36 h-36 md:w-48 md:h-48 border-2 border-emerald-200 dark:border-emerald-500/30 bg-zinc-50 dark:bg-[#131317] flex flex-col items-center justify-center space-y-4 hover:border-emerald-400 dark:hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all duration-300 rounded-lg">
                    <div className="w-10 h-10 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                      <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                    </div>
                    <span className="text-sm font-bold text-emerald-700 dark:text-emerald-500 transition-colors duration-300">Mantive</span>
                  </div>
                </button>
                
                <button 
                  onClick={() => handleLog(true)}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-red-500/10 dark:bg-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative w-36 h-36 md:w-48 md:h-48 border-2 border-red-200 dark:border-red-500/30 bg-zinc-50 dark:bg-[#131317] flex flex-col items-center justify-center space-y-4 hover:border-red-400 dark:hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300 rounded-lg">
                    <div className="w-10 h-10 rounded-full border-2 border-red-500 flex items-center justify-center">
                      <X className="w-5 h-5 text-red-600 dark:text-red-500" />
                    </div>
                    <span className="text-sm font-bold text-red-700 dark:text-red-500 transition-colors duration-300">Quebrei</span>
                  </div>
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center justify-center text-center text-zinc-500 dark:text-zinc-400 h-full w-full"
              >
                <div className="w-16 h-16 border-2 border-emerald-200 dark:border-emerald-500/50 bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 transition-colors duration-300">
                  <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400 transition-colors duration-300" />
                </div>
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-500 mb-2 transition-colors duration-300">Registro Confirmado</p>
                <p className="text-sm font-medium text-zinc-500">Aguardando próximo loop</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Stats Panel */}
      <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-black/10 dark:border-white/5 bg-transparent p-6 lg:p-8 flex flex-col z-10 shrink-0 transition-colors duration-300">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white mb-8 lg:mb-10 transition-colors duration-300">Performance Loop</h2>
        
        <div className="space-y-8 lg:space-y-10 flex-1">
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">{rate}<span className="text-zinc-500 dark:text-zinc-400 text-xl transition-colors duration-300">%</span></div>
            <div className="text-sm font-medium text-zinc-500 mt-1">Aderência ao Princípio</div>
            <div className="mt-4 h-1 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden transition-colors duration-300">
              <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${rate}%` }}></div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-10">
            <div>
              <div className="text-2xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">{total}</div>
              <div className="text-sm font-medium text-zinc-500 mt-1">Sessões Registradas</div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">{streak}</div>
              <div className="text-sm font-medium text-zinc-500 mt-1">Streak Atual</div>
            </div>
          </div>

          {total > 0 && (
            <div>
              <div className="text-sm font-medium text-zinc-900 dark:text-white mb-4 transition-colors duration-300">Histórico Recente</div>
              <div className="flex space-x-2">
                {principleObs.slice(0, 10).map((obs, idx) => (
                  <div 
                    key={obs.id} 
                    className={`w-3 h-8 rounded-sm ${obs.broken ? 'bg-red-200 dark:bg-red-500/40 border border-red-300 dark:border-red-500/50' : 'bg-emerald-200 dark:bg-emerald-500/40 border border-emerald-300 dark:border-emerald-500/50'}`}
                    title={new Date(obs.timestamp).toLocaleTimeString()}
                  ></div>
                ))}
                {principleObs.length === 0 && <div className="text-sm font-medium text-zinc-500">Sem histórico</div>}
              </div>
            </div>
          )}

          <div className="pt-8 lg:pt-10 border-t border-black/10 dark:border-white/5 transition-colors duration-300">
            <button 
              onClick={onComplete}
              className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors flex items-center justify-center rounded-lg shadow-sm"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Marcar como Internalizado
            </button>
          </div>
        </div>

        <div className="mt-8 lg:mt-auto pt-6 border-t border-black/10 dark:border-white/5 lg:border-t-0 transition-colors duration-300">
          <div className="p-4 rounded-md bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed text-center lg:text-left transition-colors duration-300">
            Princípio ativo desde: <br/><span className="text-zinc-900 dark:text-white font-bold transition-colors duration-300">{new Date(principle.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
