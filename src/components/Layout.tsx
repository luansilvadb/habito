import { ReactNode, useState, useEffect } from 'react';
import { Home, Target, Search, Moon, Sun, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  currentTab: 'mission' | 'backlog';
  onTabChange: (tab: 'mission' | 'backlog') => void;
}

export function Layout({ children, currentTab, onTabChange }: LayoutProps) {
  const [time, setTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    // Set initial class
    document.documentElement.classList.add('dark');
    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDay = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { weekday: 'long' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleTabChange = (tab: 'mission' | 'backlog') => {
    onTabChange(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="h-screen bg-zinc-100 dark:bg-gradient-to-br dark:from-[#141414] dark:via-[#0c0c0e] dark:to-[#09090B] text-zinc-900 dark:text-zinc-100 flex overflow-hidden font-sans transition-colors duration-300">
      
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Navigation Sidebar */}
      <aside className={`fixed md:relative w-64 bg-zinc-100 dark:bg-[#0c0c0e] md:bg-transparent md:dark:bg-transparent h-full flex flex-col shrink-0 z-30 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* Close Button Mobile */}
        <button 
          className="md:hidden absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-md"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={20} />
        </button>

        {/* Top Clock */}
        <div className="px-6 pt-12 md:pt-10 pb-8 text-center flex flex-col items-center">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2 leading-none transition-colors duration-300">
            {formatTime(time)}
          </h1>
          <div className="text-zinc-500 font-bold text-lg mb-1">
            {formatDay(time)}
          </div>
          <div className="text-zinc-500 dark:text-zinc-400 font-medium text-sm transition-colors duration-300">
            {formatDate(time)}
          </div>
        </div>
        
        {/* Primary Navigation */}
        <div className="px-3 space-y-0.5">
           <NavItem 
            icon={<Home size={16} />} 
            label="Foco Ativo" 
            active={currentTab === 'mission'}
            onClick={() => handleTabChange('mission')}
           />
           <NavItem 
            icon={<Target size={16} />} 
            label="Backlog" 
            active={currentTab === 'backlog'}
            onClick={() => handleTabChange('backlog')}
           />
        </div>

        {/* Bottom Status / Actions */}
        <div className="mt-auto px-3 pb-6 space-y-0.5">
          <button 
            onClick={toggleDarkMode}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-md transition-colors"
          >
            <div className="flex items-center gap-3">
              {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
              <span>Modo {isDarkMode ? 'Escuro' : 'Claro'}</span>
            </div>
            <div className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors duration-300 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`}>
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-white ml-auto' : 'bg-black mr-auto'}`}></div>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative bg-white dark:bg-black/20 md:rounded-tl-3xl border-t-0 md:border-t md:border-l border-black/10 dark:border-white/5 md:mt-4 transition-colors duration-300">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none transition-opacity duration-300" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center p-4 border-b border-black/10 dark:border-white/5 relative z-20">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors"
          >
            <Menu size={24} />
          </button>
          <span className="ml-2 font-semibold text-zinc-900 dark:text-white">
            {currentTab === 'mission' ? 'Foco Ativo' : 'Backlog'}
          </span>
        </div>

        <div className="relative z-10 flex-1 w-full flex flex-col overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        active 
          ? 'bg-zinc-200 dark:bg-[#1F1F1F] text-zinc-900 dark:text-zinc-100' 
          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/5'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
