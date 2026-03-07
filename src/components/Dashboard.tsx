import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Clock, 
  CreditCard, 
  ArrowRight,
  Image as ImageIcon,
  Plus,
  Zap,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardProps {
  user: any;
  userData: any;
}

export function Dashboard({ user, userData }: DashboardProps) {
  const stats = [
    { 
      label: 'Credits', 
      value: userData?.generations_left ?? 0, 
      icon: Sparkles,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-900/10'
    },
    { 
      label: 'Plan', 
      value: userData?.plan?.charAt(0).toUpperCase() + userData?.plan?.slice(1) || 'Free', 
      icon: Zap,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/10'
    },
    { 
      label: 'Quality', 
      value: 'Ultra HD', 
      icon: Star,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/10'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-5xl font-display font-bold dark:text-white tracking-tight">
            Hello, <span className="text-zinc-400 italic font-serif font-light">{userData?.fullName || user.email?.split('@')[0]}</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg mt-2">
            Your personal AI studio is ready. What will we create today?
          </p>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 lg:col-span-2 row-span-2 relative group overflow-hidden rounded-[40px] bg-zinc-900 dark:bg-white p-10 flex flex-col justify-between min-h-[400px]"
        >
          <div className="relative z-10">
            <div className="inline-flex p-3 rounded-2xl bg-white/10 dark:bg-zinc-900/10 backdrop-blur-sm mb-6">
              <Sparkles className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-4xl font-display font-bold text-white dark:text-zinc-900 mb-4 leading-tight">
              Transform your <br />
              professional image.
            </h3>
            <p className="text-zinc-400 dark:text-zinc-500 text-lg max-w-xs">
              Generate high-end headshots for LinkedIn and resumes in seconds.
            </p>
          </div>

          <div className="relative z-10">
            <Link 
              to="/generate"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-2xl font-bold text-sm hover:scale-105 transition-all shadow-2xl active:scale-95"
            >
              <Plus className="w-5 h-5" />
              New Generation
            </Link>
          </div>

          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-10 right-10 w-64 h-64 bg-amber-500 rounded-full blur-[100px]" />
          </div>
        </motion.div>

        {/* Stats Cards */}
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 rounded-[40px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-bold dark:text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}

        {/* Upgrade Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-2 lg:col-span-1 p-8 rounded-[40px] bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 flex flex-col justify-between group cursor-pointer"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold dark:text-white mb-2">Go Unlimited</h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Unlock 4K exports and priority generation.</p>
          </div>
          <Link to="/upgrade" className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 group-hover:gap-4 transition-all mt-6">
            View Plans <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* History Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="md:col-span-2 lg:col-span-2 p-8 rounded-[40px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <Clock className="w-5 h-5 text-zinc-500" />
              </div>
              <h4 className="font-bold dark:text-white">Recent Work</h4>
            </div>
            <Link to="/history" className="text-xs font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">View All</Link>
          </div>

          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 aspect-[3/4] rounded-2xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative group">
                <img src={`https://picsum.photos/seed/gen${i}/300/400`} alt="Recent" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
            <div className="flex-1 aspect-[3/4] rounded-2xl border-2 border-dashed border-zinc-100 dark:border-zinc-800 flex items-center justify-center">
              <Plus className="w-6 h-6 text-zinc-200" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
