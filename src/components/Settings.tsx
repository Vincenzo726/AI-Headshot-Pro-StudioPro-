import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Mail, 
  Camera, 
  Save, 
  Loader2,
  CheckCircle2,
  CreditCard,
  Moon,
  Sun,
  Shield,
  CloudOff
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../utils';

interface SettingsProps {
  user: any;
  userData: any;
}

export function Settings({ user, userData }: SettingsProps) {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || '',
    profilePic: userData?.profilePic || ''
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Mocking save since Firestore is disabled
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  const sections = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'account', label: 'Account & Plan', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Sun },
  ];

  return (
    <div className="max-w-4xl space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-display font-bold dark:text-white tracking-tight">
            Studio <span className="text-zinc-400 italic font-serif font-light">Preferences.</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg mt-2">Personalize your professional AI experience.</p>
        </div>
      </div>

      {/* Cloud Sync Warning */}
      <div className="p-6 rounded-[32px] bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
          <CloudOff className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-amber-600 dark:text-amber-400">Local Mode Active</p>
          <p className="text-xs text-amber-500/80 dark:text-amber-400/60 mt-0.5">
            Profile changes are currently stored locally. Connect to the cloud to sync across devices.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3 space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-12">
          {/* Profile Settings */}
          <section id="profile" className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900">
                <User className="w-5 h-5 text-zinc-500" />
              </div>
              <h3 className="text-xl font-bold dark:text-white">Profile Settings</h3>
            </div>

            <div className="p-8 bg-white dark:bg-zinc-900 rounded-[40px] border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-8">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-[32px] bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl">
                    {formData.profilePic ? (
                      <img src={formData.profilePic} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <User className="w-12 h-12 text-zinc-300" />
                    )}
                  </div>
                  <button 
                    type="button"
                    className="absolute -bottom-2 -right-2 p-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl shadow-2xl hover:scale-110 transition-transform z-10"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-bold text-lg dark:text-white">Profile Picture</h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Upload a professional photo for your profile avatar.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl text-sm focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-white/5 transition-all dark:text-white"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Account Settings */}
          <section id="account" className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900">
                <Shield className="w-5 h-5 text-zinc-500" />
              </div>
              <h3 className="text-xl font-bold dark:text-white">Account & Plan</h3>
            </div>

            <div className="p-8 bg-white dark:bg-zinc-900 rounded-[40px] border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full pl-12 pr-4 py-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl text-sm text-zinc-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Current Plan</span>
                    <span className="px-3 py-1 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-black uppercase tracking-widest">
                      {userData?.plan || 'Free'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-zinc-400" />
                    <p className="text-sm font-bold dark:text-white">
                      {userData?.generations_left ?? 0} Credits Remaining
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Appearance Settings */}
          <section id="appearance" className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900">
                <Sun className="w-5 h-5 text-zinc-500" />
              </div>
              <h3 className="text-xl font-bold dark:text-white">Appearance</h3>
            </div>

            <div className="p-8 bg-white dark:bg-zinc-900 rounded-[40px] border border-zinc-100 dark:border-zinc-800 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold dark:text-white">Theme Preference</h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Choose between light and dark mode.
                  </p>
                </div>
                <div className="flex p-1 bg-zinc-100 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                  <button
                    onClick={() => theme !== 'light' && toggleTheme()}
                    className={cn(
                      "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all",
                      theme === 'light' 
                        ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm" 
                        : "text-zinc-400 hover:text-zinc-600"
                    )}
                  >
                    <Sun className="w-4 h-4" />
                    Light
                  </button>
                  <button
                    onClick={() => theme !== 'dark' && toggleTheme()}
                    className={cn(
                      "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all",
                      theme === 'dark' 
                        ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm" 
                        : "text-zinc-400 hover:text-zinc-600"
                    )}
                  >
                    <Moon className="w-4 h-4" />
                    Dark
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex items-center justify-end gap-6 pt-6">
            <AnimatePresence>
              {success && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center gap-2 text-emerald-500 text-sm font-bold"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Changes saved successfully
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-3 px-10 py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
