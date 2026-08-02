import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Leaf, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Globe, 
  Code2, 
  HeartPulse, 
  Database, 
  Cpu, 
  BookOpen, 
  ExternalLink 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutScreen: React.FC = () => {
  const { goBack, setScreen } = useApp();

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-4 pb-24 flex flex-col space-y-4">
      {/* Header Bar */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={goBack}
          id="about-back-button"
          className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <span>About PlantScan AI</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Botanical Vision System & Medicinal Guide
          </p>
        </div>
      </div>

      {/* Hero Logo & Version Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden space-y-3">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-lg">
            <Leaf className="w-9 h-9 text-emerald-300 animate-pulse" />
          </div>

          <div>
            <h2 className="text-xl font-black tracking-tight text-white">PlantScan AI</h2>
            <p className="text-xs text-emerald-200">Mobile Botanical Vision Suite</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[10px] bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
                v2.4.0 (Build 2026.08)
              </span>
              <span className="text-[10px] bg-teal-500/30 text-teal-200 border border-teal-400/30 px-2 py-0.5 rounded-full font-bold">
                Material Design 3
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-200 leading-relaxed pt-1">
          PlantScan AI blends deep neural vision models with traditional botanical archives to deliver instant plant identification, medicinal properties, care instructions, and pet toxicity alerts.
        </p>
      </div>

      {/* System Architecture Section */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
          <Cpu className="w-4 h-4 text-emerald-600" /> Platform Architecture
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2.5 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white font-bold">PlantNet API Ready Service Layer</strong>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Built-in abstraction layer supporting direct integration with PlantNet REST API (`my-api.plantnet.org/v2`) and Gemini AI models.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white font-bold">100% Privacy-First Storage</strong>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                All scan logs, personal geotags, custom notes, and favorite plants remain stored locally on your device.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white font-bold">Material 3 Expressive UI</strong>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Smooth reactive frame layout with motion spring animations, responsive light/dark themes, and crisp touch targets.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Links */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setScreen('onboarding')}
          className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 text-left hover:border-emerald-500/50 transition cursor-pointer space-y-1"
        >
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">View Tutorial</h4>
          <p className="text-[10px] text-slate-400">Replay onboarding guide</p>
        </button>

        <button
          onClick={() => setScreen('settings')}
          className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 text-left hover:border-emerald-500/50 transition cursor-pointer space-y-1"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">Settings & Data</h4>
          <p className="text-[10px] text-slate-400">Manage app preferences</p>
        </button>
      </div>

      {/* Disclaimer Card */}
      <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300 text-[11px] space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-xs text-amber-900 dark:text-amber-200">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Botanical Safety Disclaimer</span>
        </div>
        <p className="text-[10px] leading-relaxed">
          Information provided by PlantScan AI is for educational and botanical discovery purposes. Always verify plant species and toxicity parameters with qualified professionals or veterinary authorities before wild harvesting or ingestion.
        </p>
      </div>
    </div>
  );
};
