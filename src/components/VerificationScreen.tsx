import React from 'react';
import { motion } from 'motion/react';
import { Mail, Camera, ArrowLeft } from 'lucide-react';

interface VerificationScreenProps {
  email: string;
  onBack: () => void;
}

export default function VerificationScreen({ email, onBack }: VerificationScreenProps) {
  return (
    <div className="min-h-screen studio-grid flex items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-zinc-900 rounded-[32px] p-10 shadow-2xl border border-zinc-100 dark:border-zinc-800 transition-colors text-center">
          <div className="bg-zinc-900 dark:bg-white p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8 shadow-xl">
            <Mail className="w-10 h-10 text-white dark:text-zinc-900" />
          </div>
          
          <h2 className="font-display text-3xl font-bold tracking-tight mb-4 dark:text-white">Verify your email</h2>
          
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-10 font-medium">
            We have sent you a verification email to <span className="font-bold text-zinc-900 dark:text-white">{email}</span>. 
            Please verify it and log in.
          </p>

          <button
            onClick={onBack}
            className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-4 rounded-2xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
          
          <p className="mt-8 text-xs text-zinc-400 dark:text-zinc-500">
            Didn't receive the email? Check your spam folder.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
