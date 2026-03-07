import React from 'react';
import { motion } from 'motion/react';
import { 
  History as HistoryIcon, 
  Download, 
  Trash2, 
  RefreshCw, 
  Search,
  Filter,
  CloudOff,
  Sparkles
} from 'lucide-react';
import { format } from 'date-fns';

export function History() {
  // Mock data for history since Firestore is disabled
  const mockGenerations = [
    {
      id: '1',
      image_url: 'https://picsum.photos/seed/gen1/400/500',
      style_name: 'Corporate Grey',
      prompt_used: 'Professional corporate headshot, neutral grey studio background',
      created_at: new Date(Date.now() - 3600000),
      generation_time: 18500
    },
    {
      id: '2',
      image_url: 'https://picsum.photos/seed/gen2/400/500',
      style_name: 'Modern Tech Office',
      prompt_used: 'Professional headshot in a modern tech office, blurred office background',
      created_at: new Date(Date.now() - 86400000),
      generation_time: 22100
    },
    {
      id: '3',
      image_url: 'https://picsum.photos/seed/gen3/400/500',
      style_name: 'Executive Dark',
      prompt_used: 'Executive headshot, dark textured background, dramatic rim lighting',
      created_at: new Date(Date.now() - 172800000),
      generation_time: 19800
    }
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-display font-bold dark:text-white tracking-tight">
            Your <span className="text-zinc-400 italic font-serif font-light">Gallery.</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg mt-2">
            Review and download your past professional transformations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" />
            <input 
              type="text" 
              placeholder="Search gallery..." 
              className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-white/5 focus:border-zinc-900 dark:focus:border-white transition-all dark:text-white"
            />
          </div>
          <button className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all shadow-sm">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Cloud Sync Warning */}
      <div className="p-6 rounded-[32px] bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
          <CloudOff className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-amber-600 dark:text-amber-400">Cloud Sync Disabled</p>
          <p className="text-xs text-amber-500/80 dark:text-amber-400/60 mt-0.5">
            History is currently in preview mode. Connect your studio to the cloud to save generations permanently.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {mockGenerations.map((gen, idx) => (
          <motion.div
            key={gen.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative aspect-[4/5] rounded-[40px] overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-2xl transition-all"
          >
            <img 
              src={gen.image_url} 
              alt={gen.style_name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                    {format(gen.created_at, 'MMM d, yyyy')}
                  </p>
                  <h4 className="text-white font-bold text-xl">{gen.style_name}</h4>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-white text-zinc-900 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-zinc-100 transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                  <button className="w-12 h-12 bg-white/10 backdrop-blur-md text-white rounded-2xl flex items-center justify-center hover:bg-white/20 transition-colors">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="absolute top-6 right-6 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <p className="text-[10px] font-bold text-white uppercase tracking-widest">Sample</p>
            </div>
          </motion.div>
        ))}

        {/* Empty State / Add New */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="aspect-[4/5] rounded-[40px] border-2 border-dashed border-zinc-100 dark:border-zinc-800 flex flex-col items-center justify-center text-zinc-300 dark:text-zinc-700 hover:border-zinc-900 dark:hover:border-white transition-all group cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Sparkles className="w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="font-bold text-sm">Create New</p>
        </motion.div>
      </div>
    </div>
  );
}
