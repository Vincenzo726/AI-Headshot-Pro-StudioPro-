import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ImagePlus, 
  History, 
  Settings, 
  LogOut, 
  Sparkles,
  Zap,
  User
} from 'lucide-react';
import { cn } from '../utils';

interface SidebarProps {
  onLogout: () => void;
  userId?: string;
  profilePic?: string;
}

export function Sidebar({ onLogout, userId, profilePic }: SidebarProps) {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: ImagePlus, label: 'Generate', path: '/generate' },
    { icon: History, label: 'History', path: '/history' },
    { icon: Zap, label: 'Upgrade', path: '/upgrade' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-72 border-r border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 flex flex-col h-screen sticky top-0 transition-colors duration-500 z-40">
      <div className="p-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-zinc-900 dark:bg-white rounded-2xl flex items-center justify-center shadow-xl">
          <Sparkles className="w-6 h-6 text-white dark:text-zinc-900" />
        </div>
        <span className="font-display font-bold text-xl tracking-tight dark:text-white">Studio Pro AI</span>
      </div>

      <nav className="flex-1 px-6 py-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-4 px-6 py-4 rounded-[24px] text-sm font-bold transition-all duration-300",
              isActive 
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-2xl shadow-zinc-200 dark:shadow-none scale-[1.02]" 
                : "text-zinc-400 dark:text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-8 border-t border-zinc-50 dark:border-zinc-900 space-y-6">
        <div className="flex items-center gap-4 px-4">
          <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-5 h-5 text-zinc-400" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold dark:text-white truncate">Studio Member</p>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">Active</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-[24px] text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
