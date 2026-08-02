import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Award, 
  Flame, 
  Scan, 
  Heart, 
  Settings as SettingsIcon, 
  Sparkles, 
  ChevronRight, 
  Sprout, 
  HeartPulse, 
  Bookmark, 
  Compass, 
  ShieldCheck,
  Edit2,
  MapPin,
  Bell,
  LogOut,
  LogIn,
  BarChart3,
  CheckCircle2,
  Lock,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AuthModal } from '../components/AuthModal';

export const ProfileScreen: React.FC = () => {
  const { 
    userProfile, 
    setUserProfile,
    setScreen, 
    history, 
    favorites, 
    authUser, 
    logoutUser, 
    updateUserDisplayName,
    t 
  } = useApp();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editRole, setEditRole] = useState(userProfile.roleTitle);

  const xpPercentage = Math.min(100, Math.round((userProfile.xp / userProfile.nextLevelXp) * 100));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserDisplayName(editName, editRole);
    setIsEditModalOpen(false);
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sprout': return <Sprout className="w-5 h-5 text-emerald-500" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-teal-500" />;
      case 'Bookmark': return <Bookmark className="w-5 h-5 text-amber-500" />;
      default: return <Compass className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-4 pb-24 space-y-4">
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Top Bar Header */}
      <div className="flex items-center justify-between pt-1">
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <User className="w-5 h-5 text-emerald-600" />
          <span>{t.profile}</span>
        </h1>

        <div className="flex items-center gap-2">
          {authUser ? (
            <button
              onClick={logoutUser}
              className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition cursor-pointer text-xs font-bold flex items-center gap-1"
              title={t.logout}
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3 py-2.5 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-500 transition cursor-pointer text-xs font-bold flex items-center gap-1 shadow-md"
            >
              <LogIn className="w-4 h-4" />
              <span>{t.login}</span>
            </button>
          )}

          <button
            onClick={() => setScreen('settings')}
            className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition shadow-xs cursor-pointer"
            aria-label="Settings"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hero Profile Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white p-5 rounded-3xl shadow-lg border border-emerald-700/30 relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={authUser?.photoURL || userProfile.avatarUrl}
                alt={userProfile.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shadow-md border border-slate-900">
                Lv.{userProfile.level}
              </span>
            </div>

            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                <span>{authUser?.displayName || userProfile.name}</span>
                <UserCheck className="w-4 h-4 text-emerald-400" />
              </h2>
              <p className="text-[11px] text-emerald-300 font-medium">{userProfile.roleTitle}</p>
              <div className="mt-1 flex items-center gap-2 text-[10px] text-emerald-200/80">
                <span className="flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-700/40">
                  <Flame className="w-3 h-3 text-amber-400" /> {userProfile.streakDays} Day Streak
                </span>
                <span className="bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-700/40 text-emerald-300">
                  Firebase Sync Active
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 backdrop-blur-md transition cursor-pointer"
            title="Edit Profile"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        {/* Level XP Progress Bar */}
        <div className="mt-4 pt-3 border-t border-emerald-800/60 relative z-10 space-y-1.5">
          <div className="flex justify-between text-[11px] font-semibold text-emerald-200">
            <span>Botanist Rank XP</span>
            <span>{userProfile.xp} / {userProfile.nextLevelXp} XP ({xpPercentage}%)</span>
          </div>
          <div className="w-full h-2.5 bg-slate-950/80 rounded-full p-0.5 border border-emerald-700/40">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full shadow-[0_0_8px_#10b981]"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Access Tools: Map & Reminders */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setScreen('map')}
          className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 hover:border-emerald-500 transition cursor-pointer text-left shadow-xs"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-white block">{t.map}</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">GPS Map Specimen Pins</span>
          </div>
        </button>

        <button
          onClick={() => setScreen('reminders')}
          className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 hover:border-emerald-500 transition cursor-pointer text-left shadow-xs"
        >
          <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-white block">{t.reminders}</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Water & Care Alarms</span>
          </div>
        </button>
      </div>

      {/* Analytics & Scan Statistics Dashboard */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-emerald-500" />
            <span>Scan Analytics & Performance</span>
          </h3>
          <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
            98.4% Avg Precision
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-lg font-black text-slate-900 dark:text-white block">{history.length}</span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-bold">Total Scans</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-lg font-black text-slate-900 dark:text-white block">{favorites.length}</span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-bold">Favorites</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 block">4.9★</span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-bold">Health Score</span>
          </div>
        </div>

        {/* Visual Weekly Activity Bars */}
        <div className="pt-2">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-2">Weekly Identification Trend</span>
          <div className="flex items-end justify-between h-16 gap-1 px-2 pt-1 border-b border-slate-100 dark:border-slate-800">
            {[
              { day: 'M', h: '40%' },
              { day: 'T', h: '65%' },
              { day: 'W', h: '85%' },
              { day: 'T', h: '50%' },
              { day: 'F', h: '95%' },
              { day: 'S', h: '70%' },
              { day: 'S', h: '60%' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div
                  style={{ height: bar.h }}
                  className="w-full max-w-[18px] bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-md shadow-xs"
                />
                <span className="text-[9px] font-bold text-slate-400">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges Shelf */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Botanical Badges</span>
          </h3>
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
            {userProfile.badges.filter(b => b.unlocked).length}/{userProfile.badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {userProfile.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3 rounded-2xl border text-left transition ${
                badge.unlocked
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60'
                  : 'bg-slate-100/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-xs">
                  {getBadgeIcon(badge.icon)}
                </div>
                {badge.unlocked && (
                  <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-200/60 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded-md">
                    Unlocked
                  </span>
                )}
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">{badge.title}</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <User className="w-4 h-4 text-emerald-500" />
                  <span>Edit Profile Details</span>
                </h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Botanical Specialty / Role Title
                  </label>
                  <input
                    type="text"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs shadow-md transition cursor-pointer mt-2"
                >
                  Save Profile Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
