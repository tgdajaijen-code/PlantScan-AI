import React from 'react';
import { Wifi, WifiOff, Battery, Signal, Smartphone, Monitor } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BottomNav } from './BottomNav';
import { ToastContainer } from './Toast';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  const { settings, updateSettings, currentScreen, isOnline } = useApp();
  const isOfflineMode = !isOnline || settings.offlineMode;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-0 md:p-6 transition-colors duration-300">
      {/* Top Preview Controls Bar ( visible on medium+ screens ) */}
      <div className="hidden md:flex items-center justify-between w-full max-w-md mb-3 px-2 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-emerald-400 tracking-wider">PLANTSCAN AI</span>
          <span className="bg-emerald-950 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-800/40">
            {isOfflineMode ? 'Offline Mode' : 'AI Powered'}
          </span>
        </div>

        <button
          onClick={() => updateSettings({ deviceFrame: !settings.deviceFrame })}
          className="flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 hover:bg-slate-800 text-slate-300 rounded-full border border-slate-700/60 transition cursor-pointer"
        >
          {settings.deviceFrame ? (
            <>
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mobile Frame</span>
            </>
          ) : (
            <>
              <Monitor className="w-3.5 h-3.5 text-emerald-400" />
              <span>Fluid Canvas</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container */}
      <div
        className={`w-full relative overflow-hidden transition-all duration-300 bg-emerald-950/10 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col shadow-2xl ${
          settings.deviceFrame
            ? 'max-w-[420px] h-[880px] max-h-[92vh] rounded-[48px] border-[10px] border-slate-900 shadow-[0_0_50px_rgba(16,185,129,0.15)] ring-1 ring-slate-800'
            : 'max-w-md min-h-screen md:min-h-[850px] md:max-h-[90vh] md:rounded-3xl border-0 md:border border-emerald-900/20'
        }`}
      >
        {/* Status Bar */}
        <div className="w-full bg-slate-900 text-slate-200 px-6 pt-3 pb-2 flex items-center justify-between text-xs select-none z-30 shrink-0">
          <span className="font-semibold text-[13px] tracking-tight">09:41</span>
          
          {/* Speaker / Camera Notch */}
          <div className="w-24 h-4 bg-slate-950 rounded-full flex items-center justify-center gap-2 px-2 shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-900/80" />
          </div>

          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5" />
            {isOfflineMode ? <WifiOff className="w-3.5 h-3.5 text-amber-400" /> : <Wifi className="w-3.5 h-3.5" />}
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Offline Mode Alert Strip */}
        {isOfflineMode && (
          <div className="bg-amber-600/90 text-white text-[11px] font-bold px-3 py-1 text-center flex items-center justify-center gap-1.5 z-20 shrink-0">
            <WifiOff className="w-3.5 h-3.5 text-amber-200" />
            <span>Offline Mode Active • Using Local Botanical Database</span>
          </div>
        )}

        {/* Dynamic Toast Container */}
        <ToastContainer />

        {/* Dynamic Screen Viewport */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col custom-scrollbar">
          {children}
        </div>

        {/* Bottom Navigation */}
        <BottomNav />

        {/* iOS Home Bar Indicator */}
        <div className="w-full bg-white dark:bg-slate-900 py-1 flex justify-center shrink-0 border-t border-slate-200/20 dark:border-slate-800/40">
          <div className="w-32 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
        </div>
      </div>
    </div>
  );
};
