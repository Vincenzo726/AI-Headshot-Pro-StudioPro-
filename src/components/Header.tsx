import React from 'react';
import { 
  Bell, 
  Search, 
  Moon, 
  Sun,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  user: any;
  userData: any;
}

export function Header({ user, userData }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-24 px-10 border-b border-zinc-100 dark:border-zinc-900 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl flex items-center justify-between sticky top-0 z-30 transition-colors duration-500">
      <div className="flex-1 max-w-xl relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" />
        <input 
          type="text" 
          placeholder="Search generations, styles..." 
          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-white/5 focus:border-zinc-900 dark:focus:border-white transition-all dark:text-white"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/10 rounded-full border border-amber-100 dark:border-amber-900/20">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{userData?.generations_left ?? 0} Credits Left</span>
        </div>

        <div className="h-8 w-px bg-zinc-100 dark:bg-zinc-800" />

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all shadow-sm"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all shadow-sm relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900" />
          </button>
        </div>

        <div className="h-8 w-px bg-zinc-100 dark:bg-zinc-800" />

        <button className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all group">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-white flex items-center justify-center shadow-lg">
            <span className="text-xs font-bold text-white dark:text-zinc-900">
              {userData?.fullName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold dark:text-white truncate max-w-[120px]">
              {userData?.fullName || user.email?.split('@')[0]}
            </p>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none mt-0.5">Pro Member</p>
          </div>
          <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
        </button>
      </div>
    </header>
  );
}
