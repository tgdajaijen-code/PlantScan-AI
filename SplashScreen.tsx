import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Scan, Sparkles, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SplashScreen: React.FC = () => {
  const { setScreen } = useApp();

  return (
    <div className="flex-1 bg-gradient-to-b from-emerald-950 via-teal-950 to-slate-950 text-white flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-60 h-60 bg-emerald-600/20 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header branding */}
      <div className="flex items-center justify-between pt-2 z-10">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-emerald-200">Material Design 3</span>
        </div>

        <button
          onClick={() => setScreen('home')}
          className="text-xs font-semibold text-emerald-300 hover:text-white transition px-3 py-1.5 rounded-full hover:bg-white/10 cursor-pointer"
        >
          Skip to Home
        </button>
      </div>

      {/* Hero Animated Logo Section */}
      <div className="flex flex-col items-center justify-center my-auto py-8 text-center z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mb-8"
        >
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-emerald-500/30 to-teal-500/30 blur-xl animate-pulse" />

          {/* Core Logo Badge */}
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-400 p-1 shadow-2xl shadow-emerald-500/40 relative flex items-center justify-center">
            <div className="w-full h-full bg-slate-950/80 rounded-[22px] backdrop-blur-md flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent" />
              <Leaf className="w-12 h-12 text-emerald-400 relative z-10" />
              <Scan className="w-16 h-16 text-emerald-300/40 absolute stroke-1 animate-pulse" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-display">
            PlantScan <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">AI</span>
          </h1>
          <p className="text-sm text-emerald-200/80 max-w-xs mx-auto font-light leading-relaxed">
            Your instant botanical guide for plant identification, toxicity alerts, and medicinal wisdom.
          </p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-6 max-w-xs"
        >
          <span className="flex items-center gap-1.5 text-[11px] bg-emerald-900/60 text-emerald-200 px-3 py-1.5 rounded-full border border-emerald-700/40">
            <Scan className="w-3.5 h-3.5 text-emerald-400" /> 99%+ Accuracy
          </span>
          <span className="flex items-center gap-1.5 text-[11px] bg-emerald-900/60 text-emerald-200 px-3 py-1.5 rounded-full border border-emerald-700/40">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Toxicity Check
          </span>
          <span className="flex items-center gap-1.5 text-[11px] bg-emerald-900/60 text-emerald-200 px-3 py-1.5 rounded-full border border-emerald-700/40">
            <HeartPulse className="w-3.5 h-3.5 text-teal-400" /> Medicinal Uses
          </span>
        </motion.div>
      </div>

      {/* Bottom CTA Actions */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="z-10 space-y-3 pb-2"
      >
        <button
          onClick={() => setScreen('camera')}
          className="w-full py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 transition transform active:scale-98 cursor-pointer"
        >
          <span>Start Instant Scan</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={() => setScreen('home')}
          className="w-full py-3 bg-slate-900/80 hover:bg-slate-900 text-emerald-300 font-medium rounded-2xl flex items-center justify-center gap-2 border border-emerald-800/40 transition cursor-pointer text-sm"
        >
          <span>Explore Plant Catalog</span>
        </button>
      </motion.div>
    </div>
  );
};
