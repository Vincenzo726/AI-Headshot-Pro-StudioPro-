import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, Zap, Crown, ArrowRight } from 'lucide-react';
import { cn } from '../utils';

interface UpgradeProps {
  user: any;
  userData: any;
}

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out Studio Pro',
    features: [
      '3 generations total',
      'Standard quality',
      'Watermarked downloads',
      'Basic styles'
    ],
    buttonText: 'Current Plan',
    highlight: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'Best for professionals and job seekers',
    features: [
      'Unlimited generations',
      'HD quality export',
      'No watermarks',
      'All premium styles',
      'Priority support'
    ],
    buttonText: 'Upgrade to Pro',
    highlight: true,
    icon: Zap
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$49',
    period: '/month',
    description: 'For teams and power users',
    features: [
      'Everything in Pro',
      'Custom background removal',
      'Batch processing',
      'API access',
      'Dedicated account manager'
    ],
    buttonText: 'Go Premium',
    highlight: false,
    icon: Crown
  }
];

export function Upgrade({ user, userData }: UpgradeProps) {
  const handleUpgrade = (planId: string) => {
    if (planId === userData?.plan) return;
    alert(`Upgrade to ${planId.toUpperCase()} initiated! (Payment integration coming soon)`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white text-[10px] font-black uppercase tracking-widest mb-6"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          Pricing Plans
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-6xl font-bold tracking-tight mb-6 dark:text-white"
        >
          Elevate your professional <br /> 
          <span className="text-zinc-400 italic font-serif font-light">presence today.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-500 dark:text-zinc-400 text-xl max-w-2xl mx-auto"
        >
          Choose the plan that fits your career goals. Upgrade or downgrade at any time.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLANS.map((plan, index) => {
          const isCurrent = userData?.plan === plan.id;
          const Icon = plan.icon;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 3) }}
              className={cn(
                "relative flex flex-col p-10 rounded-[48px] border transition-all duration-500",
                plan.highlight 
                  ? "bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_40px_80px_-15px_rgba(255,255,255,0.1)] scale-105 z-10" 
                  : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700"
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                  Most Popular
                </div>
              )}

              <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={cn(
                    "font-display text-2xl font-bold",
                    plan.highlight ? "text-white dark:text-zinc-900" : "dark:text-white"
                  )}>
                    {plan.name}
                  </h3>
                  {Icon && <Icon className={cn(
                    "w-8 h-8",
                    plan.highlight ? "text-amber-400" : "text-zinc-400"
                  )} />}
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className={cn(
                    "text-5xl font-bold tracking-tight",
                    plan.highlight ? "text-white dark:text-zinc-900" : "dark:text-white"
                  )}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={cn(
                      "text-sm font-medium",
                      plan.highlight ? "text-zinc-400" : "text-zinc-500 dark:text-zinc-400"
                    )}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={cn(
                  "text-sm leading-relaxed",
                  plan.highlight ? "text-zinc-400" : "text-zinc-500 dark:text-zinc-400"
                )}>
                  {plan.description}
                </p>
              </div>

              <div className="flex-1 space-y-5 mb-10">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-4">
                    <div className={cn(
                      "mt-1 p-1 rounded-full",
                      plan.highlight ? "bg-zinc-800 dark:bg-zinc-100" : "bg-zinc-100 dark:bg-zinc-800"
                    )}>
                      <Check className={cn(
                        "w-3 h-3",
                        plan.highlight ? "text-white dark:text-zinc-900" : "text-zinc-900 dark:text-white"
                      )} />
                    </div>
                    <span className={cn(
                      "text-sm font-medium",
                      plan.highlight ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-600 dark:text-zinc-300"
                    )}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={isCurrent}
                className={cn(
                  "w-full py-5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-3",
                  isCurrent
                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                    : plan.highlight
                      ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                      : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                )}
              >
                {isCurrent ? "Current Plan" : plan.buttonText}
                {!isCurrent && <ArrowRight className="w-4 h-4" />}
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-24 p-12 rounded-[48px] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
        <div className="atmosphere absolute inset-0 opacity-20" />
        <div className="relative z-10">
          <h2 className="font-display text-4xl font-bold mb-4 tracking-tight">Need a custom solution?</h2>
          <p className="text-zinc-400 dark:text-zinc-500 text-lg max-w-md leading-relaxed">
            We offer enterprise-grade features and custom licensing for large organizations and agencies.
          </p>
        </div>
        <button className="relative z-10 px-10 py-5 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl">
          Contact Sales
        </button>
      </div>
    </div>
  );
}
