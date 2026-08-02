import React from 'react';
import { 
  Home, 
  History, 
  Scan, 
  Heart, 
  User, 
  Settings 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenType } from '../types';

export const BottomNav: React.FC = () => {
  const { currentScreen, setScreen, favorites } = useApp();

  // Hide bottom nav on splash, camera, and loading screen for immersive experience
  if (['splash', 'camera', 'analysis'].includes(currentScreen)) {
    return null;
  }

  const navItems: { id: ScreenType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'history', label: 'History', icon: <History className="w-5 h-5" /> },
    { id: 'camera', label: 'Scan', icon: <Scan className="w-6 h-6 text-white" /> },
    { id: 'favorites', label: 'Saved', icon: <Heart className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-emerald-900/10 dark:border-emerald-500/10 px-3 py-2 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id || (item.id === 'profile' && currentScreen === 'settings');
          const isScanButton = item.id === 'camera';

          if (isScanButton) {
            return (
              <button
                key={item.id}
                onClick={() => setScreen('camera')}
                id="bottom-nav-scan-button"
                className="relative -top-5 flex flex-col items-center group cursor-pointer"
                aria-label="Scan Plant"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-600/40 border-4 border-emerald-50 dark:border-slate-900 transition-transform transform group-hover:scale-105 group-active:scale-95">
                  <Scan className="w-7 h-7 text-white animate-pulse" />
                </div>
                <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 mt-0.5">
                  SCAN
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              id={`bottom-nav-${item.id}`}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all cursor-pointer relative ${
                isActive
                  ? 'text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600'
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-950/60 rounded-2xl -z-10" />
              )}
              <div className="relative">
                {item.icon}
                {item.id === 'favorites' && favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
