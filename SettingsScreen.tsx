import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Camera, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  RotateCcw, 
  ArrowLeft, 
  Sparkles, 
  Database, 
  WifiOff, 
  ShieldCheck, 
  Info,
  Globe,
  Download,
  Trash2,
  Bell,
  Lock,
  Layers,
  CheckCircle2,
  FileCode,
  SmartphoneNfc
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LanguageCode } from '../types';

export const SettingsScreen: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    plantNetApiKey,
    setPlantNetApiKey,
    resetAllData, 
    exportUserData, 
    deleteAccount, 
    goBack, 
    setScreen,
    t 
  } = useApp();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNativeGuideOpen, setIsNativeGuideOpen] = useState(false);

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-4 pb-24 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={goBack}
          className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-emerald-600" />
            <span>{t.settings}</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Customize scanning performance & preferences
          </p>
        </div>
      </div>

      {/* Language & Regional Settings */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-emerald-500" />
          <span>Language & Regional</span>
        </h3>

        <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-white block">{t.language}</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Select preferred interface language</span>
          </div>

          <select
            value={settings.language}
            onChange={(e) => updateSettings({ language: e.target.value as LanguageCode })}
            className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white cursor-pointer"
          >
            <option value="en">English (EN)</option>
            <option value="fr">Français (FR)</option>
            <option value="es">Español (ES)</option>
            <option value="pt">Português (PT)</option>
            <option value="ar">العربية (AR)</option>
          </select>
        </div>
      </div>

      {/* Appearance & Mobile Frame */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Appearance & Prototype Frame
        </h3>

        {/* Device Frame Toggle */}
        <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Mobile Device Frame</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Show mobile bezel & status bar</span>
            </div>
          </div>
          <button
            onClick={() => updateSettings({ deviceFrame: !settings.deviceFrame })}
            className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer ${
              settings.deviceFrame ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                settings.deviceFrame ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
          <div className="flex items-center gap-2.5">
            {settings.darkMode ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Nature Dark Theme</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Eye-friendly evening mode</span>
            </div>
          </div>
          <button
            onClick={() => updateSettings({ darkMode: !settings.darkMode })}
            className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer ${
              settings.darkMode ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                settings.darkMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Group 2: Scanning & AI Preferences */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Scanner & Intelligence
        </h3>

        {/* HD Scanning */}
        <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
          <div className="flex items-center gap-2.5">
            <Camera className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">HD Vision Processing</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Higher accuracy leaf resolution</span>
            </div>
          </div>
          <button
            onClick={() => updateSettings({ hdScanning: !settings.hdScanning })}
            className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer ${
              settings.hdScanning ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                settings.hdScanning ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Push Notifications */}
        <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
          <div className="flex items-center gap-2.5">
            <Bell className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Care Push Notifications</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Watering & fertilizing alerts</span>
            </div>
          </div>
          <button
            onClick={() => updateSettings({ pushNotifications: !settings.pushNotifications })}
            className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer ${
              settings.pushNotifications ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                settings.pushNotifications ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Privacy Data Collection */}
        <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-teal-600" />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Privacy & Anonymous Analytics</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Opt-in to help train botanical AI</span>
            </div>
          </div>
          <button
            onClick={() => updateSettings({ privacyDataCollection: !settings.privacyDataCollection })}
            className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer ${
              settings.privacyDataCollection ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                settings.privacyDataCollection ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* PlantNet API Key Configuration */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-2 border border-emerald-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">PlantNet API Key</span>
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
              {plantNetApiKey ? 'Key Configured' : 'Env / Free Tier'}
            </span>
          </div>

          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            Enter your custom PlantNet API key to bypass rate limits or access premium botanical endpoints:
          </p>

          <div className="flex items-center gap-2">
            <input
              type="password"
              value={plantNetApiKey}
              onChange={(e) => setPlantNetApiKey(e.target.value)}
              placeholder="e.g. 2b10xxxxx..."
              className="flex-1 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Data Management & Export */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Data Export & Platform Builds
        </h3>

        <button
          onClick={exportUserData}
          className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl flex items-center justify-between text-left transition cursor-pointer border border-slate-200/60 dark:border-slate-700/60"
        >
          <div className="flex items-center gap-2.5">
            <Download className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">{t.exportData}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Download scan history & favorites file</span>
            </div>
          </div>
          <Download className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => setIsNativeGuideOpen(true)}
          className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl flex items-center justify-between text-left transition cursor-pointer border border-slate-200/60 dark:border-slate-700/60"
        >
          <div className="flex items-center gap-2.5">
            <SmartphoneNfc className="w-4 h-4 text-teal-600" />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Android & iOS Native Guide</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Permissions, icons & build setup</span>
            </div>
          </div>
          <Info className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Danger Zone: Reset & Delete */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600">
          Danger Zone
        </h3>

        <button
          onClick={resetAllData}
          className="w-full py-2.5 px-3 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset App State to Initial Default</span>
        </button>

        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="w-full py-2.5 px-3 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
        >
          <Trash2 className="w-4 h-4" />
          <span>{t.deleteAccount}</span>
        </button>
      </div>

      {/* Native Mobile Spec Modal */}
      <AnimatePresence>
        {isNativeGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl space-y-3 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <SmartphoneNfc className="w-4 h-4 text-emerald-500" />
                  <span>Native App Preparation</span>
                </h3>
                <button
                  onClick={() => setIsNativeGuideOpen(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
                >
                  Close
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">Android Permissions:</span>
                  <code className="block text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-slate-900 text-white p-2 rounded-xl">
                    android.permission.CAMERA<br />
                    android.permission.ACCESS_FINE_LOCATION<br />
                    android.permission.READ_EXTERNAL_STORAGE
                  </code>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">iOS Info.plist Keys:</span>
                  <code className="block text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-slate-900 text-white p-2 rounded-xl">
                    NSCameraUsageDescription<br />
                    NSLocationWhenInUseUsageDescription<br />
                    NSPhotoLibraryUsageDescription
                  </code>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">Adaptive App Icons:</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Vector lotus emblem exported at 512x512 PNG format in /public/icon.png.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-2 text-rose-600">
                <Trash2 className="w-5 h-5" />
                <h3 className="text-sm font-bold">Confirm Account Deletion</h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300">
                Are you sure you want to permanently delete your account, history, and saved botanical specimens? This action cannot be undone.
              </p>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-2xl text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteAccount();
                    setIsDeleteModalOpen(false);
                  }}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl text-xs shadow-md"
                >
                  Yes, Delete All Data
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
